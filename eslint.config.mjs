// only here to wrap and sort tailwind classes in templates, oxfmt collapses them; oxlint does the linting
import tailwind from 'eslint-plugin-better-tailwindcss'
import tsParser from '@typescript-eslint/parser'
import vueParser from 'vue-eslint-parser'

export default [
  { ignores: ['.nuxt', '.output', 'dist', 'node_modules', 'public'] },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tsParser, sourceType: 'module' },
    },
    plugins: { 'better-tailwindcss': tailwind },
    settings: { 'better-tailwindcss': { entryPoint: 'assets/css/main.css' } },
    rules: {
      'better-tailwindcss/enforce-consistent-line-wrapping': [
        'warn',
        { printWidth: 80, group: 'newLine', preferSingleLine: true },
      ],
      'better-tailwindcss/enforce-consistent-class-order': 'warn',
      'better-tailwindcss/enforce-consistent-variant-order': 'warn',
      'better-tailwindcss/enforce-canonical-classes': 'warn',
      'better-tailwindcss/no-duplicate-classes': 'warn',
      'better-tailwindcss/no-unnecessary-whitespace': 'warn',
    },
  },
]
