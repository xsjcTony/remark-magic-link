export interface ParsedMagicLink {
  text: string
  link: string
  type: string
  icon: string | false
}


export interface MagicLinkHandler {
  name: string
  handler: (content: string) => ParsedMagicLink | false | undefined
}

export interface MagicLinkPostprocessor {
  name: string
  postprocess: (parsed: ParsedMagicLink) => void
}


export interface RemarkMagicLinkOptions {
  linksMap: Record<string, string | { link: string; icon?: string | false }>
  handlers?: MagicLinkHandler[]
  postprocessors?: MagicLinkPostprocessor[]
  openInNewTab?: boolean
}
