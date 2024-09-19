import { findAndReplace } from 'mdast-util-find-and-replace'
import { SYNTAX_REGEXP } from '@/constants'
import { getDefaultHandlers } from '@/handlers'
import { getDefaultPostprocessors } from '@/postprocessors'
import { generateHtml, parseMagicLink } from '@/utils'
import type { RemarkMagicLinkOptions } from '@/types'
import type { Root } from 'mdast'


export function remarkMagicLink(options: RemarkMagicLinkOptions) {
  // eslint-disable-next-line ts/no-unnecessary-condition
  if (!options)
    return () => void 0


  const {
    handlers = getDefaultHandlers(options),
    postprocessors = getDefaultPostprocessors(),
    openInNewTab = true,
  } = options


  return function(tree: Root) {
    findAndReplace(
      tree,
      [
        SYNTAX_REGEXP,
        (_, content: string) => {
          const parsed = parseMagicLink(content, handlers)

          if (!parsed)
            return false

          const postprocessed = parsed

          for (const postprocessor of postprocessors)
            postprocessor.postprocess(postprocessed)


          return {
            type: 'html',
            value: generateHtml(postprocessed, openInNewTab),
          }
        },
      ],
    )
  }
}
