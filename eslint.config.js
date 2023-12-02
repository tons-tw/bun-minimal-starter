import eslintJs from '@eslint/js'
import eslintTs from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'

export default eslintTs.config(
  eslintJs.configs.recommended,
  eslintTs.configs.recommended,
  prettier
)
