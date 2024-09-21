# Overview

This is the API reference for the plugin. It is recommended to read the [guide](/guide/) first.


## Options

```ts
interface RemarkMagicLinkOptions {
  linksMap: Record<string, string | { link: string; icon?: string | false }>
  openInNewTab?: boolean
  handlers?: MagicLinkHandler[]
  postprocessors?: MagicLinkPostprocessor[]
}
```

### linksMap <Badge text="required" type="danger" />

- Type: `Record<string, string | { link: string; icon?: string | false }>`

An object of key-value pairs where the keys are the texts to be matched and the values are the links and icons to be used.

For example, with option:

```ts twoslash
import type { RemarkMagicLinkOptions } from 'remark-magic-link'

const options: RemarkMagicLinkOptions = {
  linksMap: {
    Vitest: 'https://github.com/vitest-dev/vitest'
  }
}
```

It will render:

```markdown
<a class="remark-magic-link remark-magic-link-link remark-magic-link-with-icon" href="https://github.com/vitest-dev/vitest" target="_blank">
  <span class="remark-magic-link-icon" role="img" style="background-image: url('https://github.com/vitest-dev.png')"></span>
  <span class="remark-magic-link-text">Vitest</span>
</a>
```

::: tip
By default, if you don't specify any link for `icon`, it will automatically use the favicon of the link via yandex API.

If it's a GitHub repo, the organization's avatar will be used. Just like in the above example, `https://github.com/vitest-dev.png` is used as icon URL.
:::

- If you don't want any icon to be rendered, you can set it to `false`.


### openInNewTab
- Type: `boolean`
- Default: `true`

You can set it to `false` if you want the link to be opened in the same tab.


### handlers

- Type: `MagicLinkHandler[]`

If you want to customize the parsing behaviour, you can provide an array of handlers.

Refer to [Handler](/api/handler) for more details.


### postprocessors

- Type: `MagicLinkPostprocessor[]`

If you want to customize the final output after link is parsed, you can provide an array of postprocessors.

Refer to [Postprocessor](/api/postprocessor) for more details.
