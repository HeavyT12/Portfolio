import Vuex from 'vuex';
import Vuetify from 'plugins/vuetify.js';
import {shallowMount, createLocalVue} from '@vue/test-utils';

export const setupLocalVue = () => {
	const localVue = createLocalVue();

	localVue.use(Vuex);

	return localVue;
}

export const setupEnvironmentVars = () => {
	return {
		localVue: setupLocalVue(),
		vuetify: Vuetify
	}
}

/**
 * @param {Component|Object}
 * 
 * @returns {Function}
 */
export const createShallowMountFactory = (component) => {
	const environmentVars = setupEnvironmentVars();

	return (options = {}) => {
		return shallowMount(component, {
			...environmentVars,
			...options
		})
	};
};