---
outline: [2, 3]
---


# Getting Started


## Overview

This is a [unified](https://unifiedjs.com/) ([remark](https://remark.js.org/)) plugin to turn `{text}` syntax into links, optionally with an icon.


## When Should I Use This?
This plugin is useful when you have a set of links that you want to quickly adopt them by a simple `{text}` syntax instead of writing `[text](url)` everytime in markdown, with a consistent styling and optionally with an icon.

It gives back a well-structured accessible HTML output, which can be styled by classname or used by JavaScript, for example to add some tooltips or other interactive features. 


## Installation

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

It requires Node.js v16+.

::: code-group
```bash [npm]
npm install remark-magic-link
```
```bash [yarn]
yarn add remark-magic-link
```
```bash [pnpm]
pnpm add remark-magic-link
```
```bash [bun]
bun add remark-magic-link
```
```ts [esm.sh]
import remarkMagicLink from 'https://esm.sh/remark-magic-link'
```
:::


## Usage

Say we have the following markdown file `example.md`:

```markdown
# Title

{Vitest} dummy {Vue}

{Unified}

Paragraph
```

and a module `example.js` or `example.ts`:

::: code-group
```js twoslash [example.js]
import { remark } from 'remark'
import remarkMagicLink from 'remark-magic-link'
import { read } from 'to-vfile'

const options = {
  linksMap: {
    Vitest: 'https://github.com/vitest-dev/vitest',
    Vue: {
      link: 'https://github.com/vuejs/core',
      icon: 'https://vuejs.org/logo.svg',
    },
    Unified: {
      link: 'https://github.com/unifiedjs/unified',
      icon: false,
    }
  }
}

const file = await remark()
  .use(remarkMagicLink, options)
  .process(await read(new URL('example.md', import.meta.url)))

console.log(file.toString())
```
```ts twoslash [example.ts]
import type { RemarkMagicLinkOptions } from 'remark-magic-link'
import { remark } from 'remark'
import remarkMagicLink from 'remark-magic-link'
import { read } from 'to-vfile'

const options: RemarkMagicLinkOptions = {
  linksMap: {
    Vitest: 'https://github.com/vitest-dev/vitest',
    Vue: {
      link: 'https://github.com/vuejs/core',
      icon: 'https://vuejs.org/logo.svg',
    },
    Unified: {
      link: 'https://github.com/unifiedjs/unified',
      icon: false,
    }
  }
}

const file = await remark()
  .use(remarkMagicLink, options)
  .process(await read(new URL('example.md', import.meta.url)))

console.log(file.toString())
```
:::

Running `node example.js` or `tsx example.ts` yields:

::: code-group
```markdown [formatted & decoded]
# Title

<a class="remark-magic-link remark-magic-link-link remark-magic-link-with-icon" href="https://github.com/vitest-dev/vitest" target="_blank">
  <span class="remark-magic-link-icon" role="img" style="background-image: url('https://github.com/vitest-dev.png')"></span>
  <span class="remark-magic-link-text">Vitest</span>
</a>
dummy
<a class="remark-magic-link remark-magic-link-link remark-magic-link-with-icon" href="https://github.com/vuejs/core" target="_blank">
  <span class="remark-magic-link-icon" role="img" style="background-image: url('https://vuejs.org/logo.svg')"></span>
  <span class="remark-magic-link-text">Vue</span>
</a>

<a class="remark-magic-link remark-magic-link-link" href="https://github.com/unifiedjs/unified" target="_blank">
  <span class="remark-magic-link-text">Unified</span>
</a>

Paragraph

```
```markdown [original]
# Title

<a class="remark-magic-link remark-magic-link-link remark-magic-link-with-icon" href="https://github.com/vitest-dev/vitest" target="_blank"><span class="remark-magic-link-icon" role="img" style="background-image: url(&#x27;https://github.com/vitest-dev.png&#x27;)"></span><span class="remark-magic-link-text">Vitest</span></a> dummy <a class="remark-magic-link remark-magic-link-link remark-magic-link-with-icon" href="https://github.com/vuejs/core" target="_blank"><span class="remark-magic-link-icon" role="img" style="background-image: url(&#x27;https://vuejs.org/logo.svg&#x27;)"></span><span class="remark-magic-link-text">Vue</span></a>

<a class="remark-magic-link remark-magic-link-link" href="https://github.com/unifiedjs/unified" target="_blank"><span class="remark-magic-link-text">Unified</span></a>

Paragraph
```
:::


## Styling

It's unstyled by default, but a default `style.css` is provided.

```ts
import 'remark-magic-link/style.css';
```

It will transform `{Vitest}` into: <span class="vp-style-raw"><a class="remark-magic-link remark-magic-link-link remark-magic-link-with-icon" href="https://github.com/vitest-dev/vitest" target="_blank">
<span class="remark-magic-link-icon" role="img" style="background-image: url('https://github.com/vitest-dev.png')"></span>
<span class="remark-magic-link-text">Vitest</span>
</a></span> 

If you want to customize it yourself, the plugin generates a well-structured HTML output which can be styled via classnames.

| Element         | Classnames                                                                      |
|-----------------|---------------------------------------------------------------------------------|
| `<a>` (root)    | `remark-magic-link` \| `remark-magic-link-with-icon` (if `icon` is not `false`) |
| `<span>` (icon) | `remark-magic-link-icon`                                                        |
| `<span>` (text) | `remark-magic-link-text`                                                        |


## Options

The only required option is [`linksMap`](/api/#linksMap) if you are using the default [handlers](/api/handler), which is an object where keys are the texts to be matched and values are the links and icons to be used.

Refer to [API Reference](/api/) for advanced usages.


## TypeScript

This plugin is written in TypeScript and publishes its types.

Refer to [Options](/api/#Options) or `index.d.ts` for detailed types.


## Credits

Inspired by [markdown-it-magic-link](https://github.com/antfu/markdown-it-magic-link).
