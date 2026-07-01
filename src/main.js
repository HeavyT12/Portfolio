import { createApp } from 'vue';
import { createPinia } from 'pinia';

import vuetify from '@/plugins/vuetify.js';
import router from '@/router/index.js';
import App from '@/App.vue';

function errorHandler(error) {
	console.log('Exception: ', error);
}

window.onerror = function (message, source, lineno, colno, error) {
	errorHandler(error);
};

const app = createApp(App);

app.config.errorHandler = errorHandler;

app.use(createPinia());
app.use(vuetify);
app.use(router);

app.mount('#app');
