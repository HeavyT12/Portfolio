import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex, { Store } from 'vuex';

function errorHandler(error) {
	console.log('Exception: ', error)
}

window.onerror = function (message, source, lineno, colno, error) {
	errorHandler(error);
}

Vue.config.errorHandler = errorHandler;

export function createAppDiv() {
	const element = document.createElement('div');

	element.id = 'app';

	return element;
};

export function mount(component, store = null) {
	Vue.use(Vuex);
	Vue.use(Vuetify);

	document.body.appendChild(createAppDiv());

	const initializer = {
		el: '#app',
		vuetify: new Vuetify(),
		render: h => h(component)
	};

	if (store) {
		initializer.store = new Store(store);
	}

	new Vue(initializer);
};
