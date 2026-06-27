import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createPinia } from 'pinia';

export const createVuetifyInstance = () => createVuetify({ components, directives });

/**
 * Builds a factory that fully mounts the given component with the Vuetify and
 * Pinia plugins registered. Full mount (rather than shallow) is used so slot
 * pass-through and Vuetify rendering can be asserted against real output.
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
				plugins: [createVuetifyInstance(), createPinia()],
				...options.global
			}
		});
	};
};
