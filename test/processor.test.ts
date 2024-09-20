import { readFile } from 'node:fs/promises'
import { describe, expect, it, vi } from 'vitest'
import { GET_FAVICON_URL_BASE } from '@/constants'
import { gitHubOrgIconPostprocessor } from '@/postprocessors'
import { processInput } from '~/utils'
import type { MagicLinkPostprocessor } from '@/types'


const TEST_TITLE = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
}
const OUTPUT_PATH = './output/postprocessor/'


const INPUT = await readFile(new URL('fixtures/input-postprocessor.md', import.meta.url), 'utf8')


describe('[processor]', () => {
  describe('[default]', () => {
    describe('[github-org-icon]', () => {
      it('should return "icon: false" if "icon" is false', () => {
        const parsed = {
          text: 'foo',
          link: 'https://test.com',
          type: 'link',
          icon: false,
        } as const

        gitHubOrgIconPostprocessor.postprocess(parsed)

        expect(parsed).toStrictEqual(expect.objectContaining({ icon: false }))
      })


      it(`should return as is if it's not a GitHub link`, () => {
        const parsed = {
          text: 'foo',
          link: 'https://test.com',
          type: 'link',
          icon: `${GET_FAVICON_URL_BASE}github.com`,
        } as const

        gitHubOrgIconPostprocessor.postprocess(parsed)

        expect(parsed).toStrictEqual({
          text: 'foo',
          link: 'https://test.com',
          type: 'link',
          icon: `${GET_FAVICON_URL_BASE}github.com`,
        })
      })


      it('should return as is if it is a special GitHub route', () => {
        const parsed = {
          text: 'foo',
          link: 'https://github.com/sponsors',
          type: 'link',
          icon: `${GET_FAVICON_URL_BASE}github.com`,
        } as const

        gitHubOrgIconPostprocessor.postprocess(parsed)

        expect(parsed).toStrictEqual({
          text: 'foo',
          link: 'https://github.com/sponsors',
          type: 'link',
          icon: `${GET_FAVICON_URL_BASE}github.com`,
        })
      })


      it('should return as is if "icon" is not a favicon', () => {
        const parsed = {
          text: 'foo',
          link: 'https://github.com/vitest-dev/vitest',
          type: 'link',
          icon: 'https://example.com/foo.png',
        } as const

        gitHubOrgIconPostprocessor.postprocess(parsed)

        expect(parsed).toStrictEqual({
          text: 'foo',
          link: 'https://github.com/vitest-dev/vitest',
          type: 'link',
          icon: 'https://example.com/foo.png',
        })
      })


      it(`should return the GitHub org icon URL if it's a repo`, () => {
        const parsed = {
          text: 'foo',
          link: 'https://github.com/vitest-dev/vitest',
          type: 'link',
          icon: `${GET_FAVICON_URL_BASE}github.com/vitest-dev/vitest`,
        } as const

        gitHubOrgIconPostprocessor.postprocess(parsed)

        expect(parsed).toStrictEqual({
          text: 'foo',
          link: 'https://github.com/vitest-dev/vitest',
          type: 'link',
          icon: 'https://github.com/vitest-dev.png',
        })
      })
    })
  })


  describe('[custom]', () => {
    it(`[${TEST_TITLE.SINGLE}]: manipulate the parsed object with provided postprocessor`, async () => {
      const spyFn = vi.fn()

      const postprocessor: MagicLinkPostprocessor = {
        name: 'custom',
        postprocess(parsed) {
          spyFn('custom')

          parsed.text = 'foo'
          parsed.link = 'https://test.com'
          parsed.type = 'custom'
          parsed.icon = 'foo'
        },
      }

      const result = await processInput(INPUT, {
        linksMap: { foo: 'https://test.com' },
        postprocessors: [postprocessor],
      })

      expect(spyFn).toHaveBeenNthCalledWith(1, 'custom')

      await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.SINGLE}.md`)
    })


    it(`[${TEST_TITLE.MULTIPLE}]: manipulate the parsed object with provided postprocessors in order`, async () => {
      const spyFn = vi.fn()

      const postprocessor1: MagicLinkPostprocessor = {
        name: 'custom1',
        postprocess(parsed) {
          spyFn('custom-1')
          parsed.text = 'foo'
        },
      }

      const postprocessor2: MagicLinkPostprocessor = {
        name: 'custom2',
        postprocess(parsed) {
          spyFn('custom-2')
          parsed.link = 'https://bar.com'
        },
      }

      const result = await processInput(INPUT, {
        linksMap: { foo: 'https://test.com' },
        postprocessors: [postprocessor1, postprocessor2],
      })

      expect(spyFn).toHaveBeenNthCalledWith(1, 'custom-1')
      expect(spyFn).toHaveBeenNthCalledWith(2, 'custom-2')

      await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.MULTIPLE}.md`)
    })
  })
})
