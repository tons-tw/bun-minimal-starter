import eslint from '@eslint/js'
import ts from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'

export default ts.config(
  eslint.configs.recommended,
  ...ts.configs.recommended,
  prettier
)
