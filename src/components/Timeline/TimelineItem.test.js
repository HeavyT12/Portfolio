import TimelineItem from './TimelineItem.vue';
import { createShallowMountFactory } from 'util/test-helpers.js';

const innerFactory = createShallowMountFactory(TimelineItem);

const factory = (settings = {}) => {
	return innerFactory({
		...settings,
		stubs: {
			'v-timeline-item': {
				template: '<div><slot /><slot name="opposite" /></div>'
			},
			...settings.stubs,
		}
	})
}

describe('TimelineItem', () => {
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

		describe('opposite', () => {
			it('renders passed content', () => {
				const html = `<div class="expected-html">Present!</div>`;

				expect(factory({
					slots: {
						opposite: html
					}
				}).html()).toContain(html);
			});
		});
	});
});
