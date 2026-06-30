import { describe, it, expect } from 'vitest';

import Chip from './Chip.vue';
import { createMountFactory } from '@/util/test-helpers.js';

const factory = createMountFactory(Chip);

describe('Chip', () => {
	describe('Slots', () => {
		describe('default', () => {
			it('renders passed content', () => {
				const html = `<span class="expected-html">Java</span>`;

				expect(factory({
					slots: {
						default: html
					}
				}).html()).toContain(html);
			});
		});
	});
});
