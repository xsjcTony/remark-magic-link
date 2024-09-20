import { GET_FAVICON_URL_BASE, HTTP_PROTOCOL_REGEXP } from '@/constants'
import type { MagicLinkHandler, RemarkMagicLinkOptions } from '@/types'


export function makeLinkHandler(options: RemarkMagicLinkOptions | undefined): MagicLinkHandler {
  const { linksMap } = options ?? {}

  return {
    name: 'link',
    handler(content: string) {
      const type = 'link'
      const text = content.trim()

      let url: string | undefined
      let icon: string | false | undefined

      const link = linksMap?.[text] ?? void 0

      if (!link)
        return false

      if (typeof link === 'string') {
        url = link
      } else {
        url = link.link
        icon = link.icon
      }

      if (!HTTP_PROTOCOL_REGEXP.exec(url))
        return false

      icon ??= `${GET_FAVICON_URL_BASE}${new URL(url).hostname}`


      return {
        text,
        link: url,
        type,
        icon,
      }
    },
  }
}


export function getDefaultHandlers(options: RemarkMagicLinkOptions): MagicLinkHandler[] {
  return [makeLinkHandler(options)]
}
