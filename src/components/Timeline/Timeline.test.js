import Timeline from './Timeline.vue';
import { createShallowMountFactory } from 'util/test-helpers.js';

const factory = createShallowMountFactory(Timeline);

describe('Timeline', () => {
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
	});
});
