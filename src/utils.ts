import { toHtml } from 'hast-util-to-html'
import { h } from 'hastscript'
import type { MagicLinkHandler, ParsedMagicLink } from '@/types'


export function parseMagicLink(
  content: string,
  handlers: MagicLinkHandler[],
): ParsedMagicLink | false {
  for (const handler of handlers) {
    const parsed = handler.handler(content)

    if (parsed)
      return parsed
  }

  return false
}


export function generateHtml(
  postprocessed: ParsedMagicLink,
  openInNewTab: boolean,
): string {
  const {
    text,
    link,
    type,
    iconUrl,
  } = postprocessed

  const hast = h(
    `a.remark-magic-link.remark-magic-link-${type}`,
    {
      href: link,
      ...iconUrl && { 'class': 'remark-magic-link-with-icon' },
      ...openInNewTab && { target: '_blank' },
    },
    [
      ...iconUrl
        ? [h('span.remark-magic-link-icon', {
          role: 'img',
          style: `background-image: url('${iconUrl}')`,
        })]
        : [],
      h('span.remark-magic-link-text', text),
    ],
  )

  return toHtml(hast)
}
