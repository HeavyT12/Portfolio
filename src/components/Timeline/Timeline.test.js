import Timeline from './Timeline.vue';
import { createShallowMountFactory } from 'util/test-helpers.js';

const innerFactory = createShallowMountFactory(Timeline);

const factory = (settings = {}) => {
	return innerFactory({
		...settings,
		propsData: {
			colors: ["red"],
			...settings.propsData
		}
	})
}

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
