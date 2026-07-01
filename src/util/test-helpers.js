import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';

export const createVuetifyInstance = () => createVuetify({ components, directives });

// Memory-history router with the app's named routes so router-aware components
// (anything using <router-view>, <router-link>, or a `:to`) mount without
// "Failed to resolve component" / "No match for named route" warnings. Stub
// components keep tests isolated from the real page components.
export const createRouterInstance = () => createRouter({
	history: createMemoryHistory(),
	routes: [
		{ path: '/', name: 'home', component: { template: '<div />' } },
		{ path: '/about', name: 'about', component: { template: '<div />' } }
	]
});

/**
 * Builds a factory that fully mounts the given component with the Vuetify,
 * Pinia, and Vue Router plugins registered. Full mount (rather than shallow) is
 * used so slot pass-through and Vuetify rendering can be asserted against real
 * output.
 *
 * @param {Component|Object} component
 *
 * @returns {Function}
 */
export const createMountFactory = (component) => {
	return (options = {}) => {
		return mount(component, {
			...options,
			global: {
				plugins: [
					createVuetifyInstance(),
					createPinia(),
					createRouterInstance()
				],
				...options.global
			}
		});
	};
};
