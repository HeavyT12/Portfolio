import { createRouter, createWebHashHistory } from 'vue-router';

import Home from '@/pages/Home/Home.vue';
import About from '@/pages/About/About.vue';

// Hash history (not HTML5) because the site is served from the GitHub Pages
// project subpath (https://heavyt12.github.io/Portfolio/) with no SPA fallback —
// a deep link / reload on a clean path would 404. The hash keeps routing fully
// client-side, so no 404.html rewrite or server config is needed.
const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: { title: 'Tyson Farley Portfolio' }
	},
	{
		path: '/about',
		name: 'about',
		component: About,
		meta: { title: 'About — Tyson Farley' }
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

router.afterEach((to) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
});

export default router;
