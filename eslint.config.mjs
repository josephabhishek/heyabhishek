import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from 'eslint-config-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'coverage/**', 'next-env.d.ts'] },

  js.configs.recommended,

  // Type-aware linting. This is the reason TypeScript is pinned to 5.9.x:
  // typescript-eslint@8 supports `typescript >=4.8.4 <6.1.0`.
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  ...next,

  // Accessibility violations are errors, not warnings. Retrofitting
  // accessibility is the failure mode this project is built to avoid.
  {
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      ...jsxA11y.configs.strict.rules,
      'jsx-a11y/no-autofocus': 'error',
    },
  },

  {
    rules: {
      // Brand rule: no unexplained escapes into `any`.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
    },
  },

  // Build scripts run in Node and may log.
  {
    files: ['scripts/**/*.{ts,mjs}', '*.config.{ts,mjs}'],
    rules: { 'no-console': 'off' },
  },
);
