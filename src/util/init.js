import Vue from 'vue';
import Vuetify from 'plugins/vuetify.js';
import Vuex, { Store } from 'vuex';
import Vuelidate from 'vuelidate'
import VuelidateErrorExtractor, { templates } from 'vuelidate-error-extractor';
import FormGroup from 'components/FormGroup/FormGroup.vue'

function errorHandler(error) {
	console.log('Exception: ', error)
}

window.onerror = function(message, source, lineno, colno, error) {
	errorHandler(error);
}

Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
	template: FormGroup,
	messages: {
		required: 'This field is required.',
		minLength: 'Please enter a minimum of {min} characters.',
		email: 'Please enter a valid email.'
	}
});

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
