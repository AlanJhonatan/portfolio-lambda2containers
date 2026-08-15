import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

export default defineConfig({
	files: ['**/*.{js,ts}'],
	extends: [
		js.configs.recommended,
		tseslint.configs.recommended,
		prettierConfig,
	],
})
