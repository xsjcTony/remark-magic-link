import { readFile } from 'node:fs/promises'
import { describe, expect, it, vi } from 'vitest'
import { GET_FAVICON_URL_BASE } from '@/constants'
import { makeLinkHandler } from '@/handlers'
import { processInput } from '~/utils'
import type { MagicLinkHandler, RemarkMagicLinkOptions } from '@/types'


const TEST_TITLE = {
  SINGLE: 'single',
  MULTIPLE: 'multiple',
}
const OUTPUT_PATH = './output/handler/'


const INPUT = await readFile(new URL('fixtures/input-handler.md', import.meta.url), 'utf8')


describe('[handler]', () => {
  describe('[default]', () => {
    it('should return "false" if no link is provided', () => {
      expect(makeLinkHandler(void 0).handler('')).toBe(false)
    })


    it('should return "false" if the link is not in the linksMap', () => {
      const options: RemarkMagicLinkOptions = { linksMap: { foo: 'https://test.com' } }

      expect(makeLinkHandler(options).handler('bar')).toBe(false)
    })


    it('should return "false" if the link is not valid including protocol', () => {
      const options: RemarkMagicLinkOptions = { linksMap: { foo: 'test.com' } }

      expect(makeLinkHandler(options).handler('foo')).toBe(false)
    })


    it('should use the string as "link" and fetch the favicon for "iconUrl"', () => {
      const options: RemarkMagicLinkOptions = { linksMap: { foo: 'https://test.com' } }

      expect(makeLinkHandler(options).handler('foo')).toStrictEqual({
        text: 'foo',
        link: 'https://test.com',
        type: 'link',
        iconUrl: `${GET_FAVICON_URL_BASE}test.com`,
      })
    })


    describe('[object -> iconUrl]', () => {
      it('should respect the passed in "iconUrl"', () => {
        const options: RemarkMagicLinkOptions = {
          linksMap: {
            foo: { link: 'https://test.com', iconUrl: 'https://test.com/icon.png' },
          },
        }

        expect(makeLinkHandler(options).handler('foo')).toStrictEqual({
          text: 'foo',
          link: 'https://test.com',
          type: 'link',
          iconUrl: 'https://test.com/icon.png',
        })
      })


      it('should respect the passed in "iconUrl" even if it is "false"', () => {
        const options: RemarkMagicLinkOptions = {
          linksMap: {
            foo: { link: 'https://test.com', iconUrl: false },
          },
        }

        expect(makeLinkHandler(options).handler('foo')).toStrictEqual({
          text: 'foo',
          link: 'https://test.com',
          type: 'link',
          iconUrl: false,
        })
      })
    })
  })


  describe('[custom]', () => {
    it(`[${TEST_TITLE.SINGLE}]: parse the link with provided handler`, async () => {
      const spyFn = vi.fn()

      const handler: MagicLinkHandler = {
        name: 'custom',
        handler: (content) => {
          spyFn('custom')

          return {
            text: content,
            link: 'https://test.com',
            type: 'custom',
            iconUrl: 'foo',
          }
        },
      }

      const result = await processInput(INPUT, {
        linksMap: { foo: 'https://test.com' },
        handlers: [handler],
      })

      expect(spyFn).toHaveBeenNthCalledWith(1, 'custom')

      await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.SINGLE}.md`)
    })


    it(`[${TEST_TITLE.MULTIPLE}]: parse the link with multiple provided handlers in order, use the result of the first truthy result`, async () => {
      const spyFn = vi.fn()

      const handlerFalsy: MagicLinkHandler = {
        name: 'falsy',
        handler: () => {
          spyFn('1-falsy')
          return false
        },
      }

      const handlerTruthy: MagicLinkHandler = {
        name: 'truthy',
        handler: (content) => {
          spyFn('2-truthy')

          return {
            text: content,
            link: 'https://test.com',
            type: 'custom',
            iconUrl: 'foo',
          }
        },
      }

      const handlerUseless: MagicLinkHandler = {
        name: 'truthy-but-useless',
        handler: content => ({
          text: content,
          link: 'https://useless.com',
          type: 'useless',
          iconUrl: 'bar',
        }),
      }

      const result = await processInput(INPUT, {
        linksMap: { foo: 'https://test.com' },
        handlers: [handlerFalsy, handlerTruthy, handlerUseless],
      })

      expect(spyFn).toHaveBeenNthCalledWith(1, '1-falsy')
      expect(spyFn).toHaveBeenNthCalledWith(2, '2-truthy')
      expect(spyFn).not.toHaveBeenCalledTimes(3)

      await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.MULTIPLE}.md`)
    })
  })
})
