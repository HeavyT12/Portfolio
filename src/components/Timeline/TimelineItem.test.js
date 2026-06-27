import { describe, it, expect } from 'vitest';

import TimelineItem from './TimelineItem.vue';
import { createMountFactory } from '@/util/test-helpers.js';

const factory = createMountFactory(TimelineItem);

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
