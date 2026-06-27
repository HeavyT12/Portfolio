import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';

import Timeline from './Timeline.vue';
import TimelineItem from './TimelineItem.vue';
import { createMountFactory, createVuetifyInstance } from '@/util/test-helpers.js';

const innerFactory = createMountFactory(Timeline);

const factory = (settings = {}) => {
	return innerFactory({
		...settings,
		props: {
			colors: ['red'],
			...settings.props
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

	describe('color propagation', () => {
		it('assigns palette colors to items by registration order', () => {
			const wrapper = mount({
				components: { TyTimeline: Timeline, TyTimelineItem: TimelineItem },
				template: `
					<TyTimeline :colors="['red', 'blue']">
						<TyTimelineItem :date="new Date('January 2020')" title="A">one</TyTimelineItem>
						<TyTimelineItem :date="new Date('February 2020')" title="B">two</TyTimelineItem>
						<TyTimelineItem :date="new Date('March 2020')" title="C">three</TyTimelineItem>
					</TyTimeline>
				`
			}, {
				global: {
					plugins: [createVuetifyInstance(), createPinia()]
				}
			});

			const items = wrapper.findAllComponents(TimelineItem);

			expect(items).toHaveLength(3);
			expect(items[0].vm.color).toBe('red');
			expect(items[1].vm.color).toBe('blue');
			expect(items[2].vm.color).toBe('red');
		});
	});
});
