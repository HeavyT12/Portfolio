import { describe, it, expect } from 'vitest';

import About from './About.vue';
import { createMountFactory } from '@/util/test-helpers.js';

const factory = createMountFactory(About);

describe('About', () => {
	it('renders the heading', () => {
		expect(factory().text()).toContain('About Me');
	});

	it('renders the bio copy', () => {
		expect(factory().text()).toContain("Hi, I'm Tyson Farley");
	});
});
