export const SYNTAX_REGEXP = /\{([^{}\n]+?)}/g
export const HTTP_PROTOCOL_REGEXP = /^https?:\/\//i
export const GITHUB_ORG_REGEXP = /^(?:https?:\/\/)?github\.com\/([\w-]+?)(?:$|\/)/i

export const GET_FAVICON_URL_BASE = 'https://favicon.yandex.net/favicon/'

export const GITHUB_SPECIAL_ROUTES = new Set([
  'settings',
  'pulls',
  'issues',
  'discussions',
  'sponsor',
  'sponsors',
  'notifications',
])
