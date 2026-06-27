import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default [
	js.configs.recommended,
	...pluginVue.configs['flat/essential'],
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			// Page/section components (Home, Domo, ...) are intentionally
			// single-word; the Ty* wrappers cover the shared primitives.
			'vue/multi-word-component-names': 'off'
		}
	},
	{
		ignores: ['dist/**', 'node_modules/**']
	}
];
