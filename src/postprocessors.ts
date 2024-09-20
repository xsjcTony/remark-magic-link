import {
  GET_FAVICON_URL_BASE,
  GITHUB_ORG_REGEXP,
  GITHUB_SPECIAL_ROUTES,
} from '@/constants'
import type { MagicLinkPostprocessor } from '@/types'


export const gitHubOrgIconPostprocessor: MagicLinkPostprocessor = {
  name: 'github-org-icon',
  postprocess(parsed) {
    if (parsed.icon === false)
      return

    const org = GITHUB_ORG_REGEXP.exec(parsed.link)?.[1]

    if (
      !org
      || GITHUB_SPECIAL_ROUTES.has(org)
      || !parsed.icon.startsWith(GET_FAVICON_URL_BASE)
    )
      return

    parsed.icon = `https://github.com/${org}.png`
  },
}


export function getDefaultPostprocessors(): MagicLinkPostprocessor[] {
  return [gitHubOrgIconPostprocessor]
}
