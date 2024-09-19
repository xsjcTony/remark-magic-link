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
    imageUrl,
  } = postprocessed

  const hast = h(
    `a.remark-magic-link.remark-magic-link-${type}`,
    {
      href: link,
      ...imageUrl && { 'class': 'remark-magic-link-with-image' },
      ...openInNewTab && { target: '_blank' },
    },
    [
      ...imageUrl
        ? [h('span.remark-magic-link-image', {
          role: 'img',
          style: `background-image: url('${imageUrl}')`,
        })]
        : [],
      h('span.remark-magic-link-text', text),
    ],
  )

  return toHtml(hast)
}
