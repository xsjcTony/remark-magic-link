export interface ParsedMagicLink {
  text: string
  link: string
  type: string
  icon: string | false
}


export interface MagicLinkHandler {
  name: string
  handle: (content: string) => ParsedMagicLink | false
}

export interface MagicLinkPostprocessor {
  name: string
  postprocess: (parsed: ParsedMagicLink) => void
}


export interface RemarkMagicLinkOptions {
  linksMap?: Record<string, string | { link: string; icon?: string | false }>
  handlers?: MagicLinkHandler[]
  postprocessors?: MagicLinkPostprocessor[]
  openInNewTab?: boolean
}
