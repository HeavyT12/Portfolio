import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

// https://vite.dev/config/
export default defineConfig({
	// Relative base so built asset URLs resolve under the GitHub Pages
	// project subpath (https://heavyt12.github.io/Portfolio/).
	base: './',
	plugins: [
		vue(),
		vuetify({ autoImport: true }),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		outDir: 'dist',
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./vitest.setup.js'],
		server: {
			deps: {
				// Vuetify ships untranspiled ESM that must be processed by Vite.
				inline: ['vuetify'],
			},
		},
	},
});
