import { createApp } from 'vue';
import { createPinia } from 'pinia';

import vuetify from '@/plugins/vuetify.js';
import Home from '@/pages/Home/Home.vue';

function errorHandler(error) {
	console.log('Exception: ', error);
}

window.onerror = function (message, source, lineno, colno, error) {
	errorHandler(error);
};

const app = createApp(Home);

app.config.errorHandler = errorHandler;

app.use(createPinia());
app.use(vuetify);

app.mount('#app');
