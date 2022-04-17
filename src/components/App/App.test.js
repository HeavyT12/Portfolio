import App from './App.vue';
import { createShallowMountFactory } from 'util/test-helpers.js';

const factory = createShallowMountFactory(App);

describe('App', () => {
	describe('Slots', () => {
		describe('default', () => {
			it('renders passed content', () => {
				const html = `<div class="expected-html">Present!</div>`;

				expect(factory({
					slots: {
						default: html
					}
				}).html()).toContain(html);
			});
		});

		describe('app-bar', () => {
			it('renders passed content', () => {
				const html = `<div class="expected-html">Present!</div>`;

				expect(factory({
					slots: {
						'app-bar': html
					}
				}).html()).toContain(html);
			});
		});

		describe('footer', () => {
			it('renders passed content', () => {
				const html = `<div class="expected-html">Present!</div>`;

				expect(factory({
					slots: {
						'footer': html
					}
				}).html()).toContain(html);
			});
		});
	});
});
