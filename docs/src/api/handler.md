# Handler

A handler is a function that takes the matched string as input and returns a either `ParsedMagicLink` or `false`.

Handlers will be executed in order, and will use the result of the first `ParsedMagicLink` returned and stop there.


## Default Handlers

The plugin comes with a set of default handlers if you don't provide any. They are:

1. [Link Handler](#link-handler)


### Link Handler

This handler will first match the trimmed string with the `linksMap` provided by you. If it can't find a match, then it will return `false`.

If it finds a match, it will return a `ParsedMagicLink` object with the following properties:
- `text`: The trimmed matched string
- `type`: `'link'` *(This will generate a `remark-magic-link-link` class on the root `<a>` element)*
- `link`: The link URL from `linksMap`
- `icon`: If no `icon` is provided, it will use the favicon of the link via `yandex API`


## Custom Handler

A handler is an object with a handler `name` and the `handle` function.

By any chance it returns `false`, the next handler will then be executed.

```ts
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
```
- `text` is going to be the string rendered in `<span class="remark-magic-link-text">` element
- `link` will be the `href` attribute of the root `<a>` element
- `type` is the type of the link. It will be used to generate a class `remark-magic-link-${type}` onr the root `<a>` element
- `icon` is the URL of the icon. If it's `false`, no icon will be rendered

Once you have all of your custom handlers in hand, pass it to the options object like this:

```ts
import type { RemarkMagicLinkOptions } from 'remark-magic-link'
import { customHandler1, customHandler2 } from './handlers'

const options: RemarkMagicLinkOptions = {
  linksMap: { Vitest: 'https://github.com/vitest-dev/vitest' },
  handlers: [customHandler1, customHandler2],
}
```
