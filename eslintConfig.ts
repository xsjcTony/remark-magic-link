import { defineConfig } from '@aelita-dev/eslint-config'


export default defineConfig(
  {
    typescript: {
      projectType: 'lib',
      projectService: {
        allowDefaultProject: [
          'eslintConfig.ts',
          'changelogithub.config.ts',
          'build.config.ts',
          'vitest.config.ts',
        ],
        defaultProject: './tsconfig.json',
      },
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
