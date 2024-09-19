import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import remarkMagicLink from '@/index'
import type { RemarkMagicLinkOptions } from '@/types'
import type { Value } from 'vfile'


export async function processInput(
  input: string,
  options: RemarkMagicLinkOptions,
): Promise<Value> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMagicLink, options)
    .use(remarkStringify)
    .process(input)

  return file.value
}
