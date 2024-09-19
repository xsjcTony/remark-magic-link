import {
  GET_FAVICON_URL_BASE,
  GITHUB_ORG_REGEXP,
  GITHUB_SPECIAL_ROUTES,
} from '@/constants'
import type { MagicLinkPostprocessor } from '@/types'


export const gitHubOrgImagePostprocessor: MagicLinkPostprocessor = {
  name: 'github-org-image',
  postprocess(parsed) {
    if (parsed.imageUrl === false)
      return

    const org = GITHUB_ORG_REGEXP.exec(parsed.link)?.[1]

    if (
      !org
      || GITHUB_SPECIAL_ROUTES.has(org)
      || !parsed.imageUrl.startsWith(GET_FAVICON_URL_BASE)
    )
      return

    parsed.imageUrl = `https://github.com/${org}.png`
  },
}


export function getDefaultPostprocessors(): MagicLinkPostprocessor[] {
  return [gitHubOrgImagePostprocessor]
}
