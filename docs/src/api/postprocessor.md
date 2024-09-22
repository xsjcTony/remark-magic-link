# Postprocessor

A postprocessor is a function that takes the `ParsedMagicLink` object as input and modifies it as needed before rendering.

All postprocessors will be executed in order.


## Default Postprocessors

The plugin comes with a set of default postprocessors if you don't provide any. They are:

1. [GitHub Org Icon Postprocessor](#github-org-icon-postprocessor)


### GitHub Org Icon Postprocessor

This postprocessor will do **NOTHING** if:
- The link is not a GitHub repo
- The link is a special path for GitHub repo like `https://github.com/org/repo/settings`
- The `icon` is explicitly set *(This is done by checking whether `yandex API` is used)*

Otherwise, it will get the organization's avatar and set it as the icon URL, e.g. `https://github.com/vitest-dev.png`


## Custom Postprocessor

A postprocessor is an object with a postprocessor `name` and the `postprocess` function.

```ts
export interface ParsedMagicLink {
  text: string
  link: string
  type: string
  icon: string | false
}

export interface MagicLinkPostprocessor {
  name: string
  postprocess: (parsed: ParsedMagicLink) => void
}

```

Simply modifies the `PrasedMagicLink` object based on your needs.

::: tip
The return value of postprocessor is ignored, and it should NOT return anything meaningful.
:::

Once you have all of your custom postprocessors in hand, pass it to the options object like this:

```ts
import type { RemarkMagicLinkOptions } from 'remark-magic-link'
import { customPostprocessor1, customPostprocessor2 } from './handlers'

const options: RemarkMagicLinkOptions = {
  linksMap: { Vitest: 'https://github.com/vitest-dev/vitest' },
  postprocessors: [customPostprocessor1, customPostprocessor2],
}
```
