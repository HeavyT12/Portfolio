import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { flushPromises } from '@vue/test-utils';

import ContactMe from './ContactMe.vue';
import { createMountFactory } from '@/util/test-helpers.js';

const factory = createMountFactory(ContactMe);

// Stub the Turnstile wrapper so the real widget (external script) never loads.
const mountForm = () => factory({
	global: {
		stubs: { TyTurnstile: true }
	}
});

describe('ContactMe', () => {
	beforeEach(() => {
		global.fetch = vi.fn();
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('does not submit when required fields are empty', async () => {
		const wrapper = mountForm();

		await wrapper.vm.submit();
		await flushPromises();

		expect(global.fetch).not.toHaveBeenCalled();
	});

	it('does not submit a valid form without a Turnstile token', async () => {
		const wrapper = mountForm();
		await wrapper.setData({ form: { name: 'A', email: 'a@b.com', message: 'hi' } });

		await wrapper.vm.submit();
		await flushPromises();

		expect(global.fetch).not.toHaveBeenCalled();
	});

	it('posts the payload and resets on success', async () => {
		global.fetch.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });

		const wrapper = mountForm();
		await wrapper.setData({
			form: { name: 'Ada', email: 'ada@example.com', message: 'Hello there' },
			token: 'tok-123'
		});

		await wrapper.vm.submit();
		await flushPromises();

		expect(global.fetch).toHaveBeenCalledTimes(1);
		const [, options] = global.fetch.mock.calls[0];
		expect(JSON.parse(options.body)).toMatchObject({
			name: 'Ada',
			email: 'ada@example.com',
			message: 'Hello there',
			token: 'tok-123'
		});

		// Form clears after a successful send.
		expect(wrapper.vm.form.message).toBe('');
		expect(wrapper.vm.token).toBe('');
		expect(wrapper.vm.loading).toBe(false);
		expect(wrapper.emitted('sent')).toBeTruthy();
	});

	it('keeps the message and clears loading on failure', async () => {
		global.fetch.mockResolvedValue({ ok: false, json: async () => ({ error: 'nope' }) });

		const wrapper = mountForm();
		await wrapper.setData({
			form: { name: 'Ada', email: 'ada@example.com', message: 'Hello there' },
			token: 'tok-123'
		});

		await wrapper.vm.submit();
		await flushPromises();

		expect(wrapper.vm.form.message).toBe('Hello there');
		expect(wrapper.vm.loading).toBe(false);
		expect(wrapper.emitted('sent')).toBeFalsy();
	});
});
