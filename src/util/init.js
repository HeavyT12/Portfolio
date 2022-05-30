import Vue from 'vue';
import Vuetify from 'plugins/vuetify.js';
import Vuex, { Store } from 'vuex';

function errorHandler(error) {
	console.log('Exception: ', error)
}

window.onerror = function (message, source, lineno, colno, error) {
	errorHandler(error);
}

Vue.use(Vuex);

Vue.config.errorHandler = errorHandler;

export function createAppDiv() {
	const element = document.createElement('div');

	element.id = 'app';

	return element;
};

export function mount(component, store = null) {
	document.body.appendChild(createAppDiv());

	const initializer = {
		el: '#app',
		vuetify: Vuetify,
		render: h => h(component)
	};

	if (store) {
		initializer.store = new Store(store);
	}

	new Vue(initializer);
};
