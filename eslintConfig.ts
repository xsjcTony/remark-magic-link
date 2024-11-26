import { defineConfig } from '@aelita-dev/eslint-config'


export default defineConfig(
  {
    ignores: ['README.md'],
    typescript: {
      projectType: 'lib',
    },
    vue: {
      ruleOptions: {
        multiWordComponentNames: {
          ignores: ['Layout'],
        },
      },
    },
    unocss: false,
  },
)
