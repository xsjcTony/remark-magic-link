import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'
import { processInput } from '~/utils'
import type { RemarkMagicLinkOptions } from '@/index'


const TEST_TITLE = {
  NORMAL: 'normal',
  NO_CONFIG: 'no-config',
  NO_MATCH: 'no-match',
  CUSTOM_ICON: 'custom-icon',
  NO_ICON: 'no-icon',
  NO_NEW_TAB: 'no-new-tab',
}
const OUTPUT_PATH = './output/main/'


const INPUT = await readFile(new URL('fixtures/input-main.md', import.meta.url), 'utf8')


describe('[main]', () => {
  it(`[${TEST_TITLE.NORMAL}]: transform matched keywords in "linkMaps" to links`, async () => {
    const result = await processInput(INPUT, {
      linksMap: {
        Vitest: 'https://github.com/vitest-dev/vitest',
        Vue: 'https://github.com/vuejs/core',
      },
    })

    await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.NORMAL}.md`)
  })


  it(`[${TEST_TITLE.NO_CONFIG}]: do nothing if no "linkMaps" provided`, async () => {
    const result = await processInput(INPUT, void 0 as unknown as RemarkMagicLinkOptions)

    await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.NO_CONFIG}.md`)
  })


  it(`[${TEST_TITLE.NO_MATCH}]: do nothing if keyword is not matched`, async () => {
    const result = await processInput(INPUT, {
      linksMap: {
        Vitest: 'https://github.com/vitest-dev/vitest',
      },
    })

    await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.NO_MATCH}.md`)
  })


  it(`[${TEST_TITLE.CUSTOM_ICON}}]: use custom icon if "iconUrl" is specified`, async () => {
    const result = await processInput(INPUT, {
      linksMap: {
        Vitest: { link: 'https://github.com/vitest-dev/vitest', iconUrl: 'foo' },
        VueUse: 'https://github.com/vueuse/vueuse',
        Vue: { link: 'https://github.com/vuejs/core', iconUrl: 'https://vuejs.org/logo.svg' },
      },
    })

    await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.CUSTOM_ICON}.md`)
  })


  it(`[${TEST_TITLE.NO_ICON}]: do not render icon if "iconUrl" is "false"`, async () => {
    const result = await processInput(INPUT, {
      linksMap: {
        Vitest: 'https://github.com/vitest-dev/vitest',
        Vue: { link: 'https://github.com/vuejs/core', iconUrl: false },
      },
    })

    await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.NO_ICON}.md`)
  })


  it(`[${TEST_TITLE.NO_NEW_TAB}]: do not open in new tab if "openInNewTab" is "false"`, async () => {
    const result = await processInput(INPUT, {
      linksMap: {
        Vitest: 'https://github.com/vitest-dev/vitest',
        Vue: 'https://github.com/vuejs/core',
      },
      openInNewTab: false,
    })

    await expect(result).toMatchFileSnapshot(`${OUTPUT_PATH}${TEST_TITLE.NO_NEW_TAB}.md`)
    expect(result).not.toContain('target="_blank"')
  })
})
