import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useSystemStore } from './system.js';

describe('system store', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('adds and reads alerts', () => {
		const store = useSystemStore();

		store.addAlert({ text: 'Hello', type: 'info' });

		expect(store.getAlerts()).toHaveLength(1);
		expect(store.getAlerts({ asText: true })).toEqual(['Hello']);
	});

	it('filters notifications by type', () => {
		const store = useSystemStore();

		store.addAlert({ text: 'a', type: 'info' });
		store.addAlert({ text: 'b', type: 'error' });

		expect(store.getAlerts({ type: 'error', asText: true })).toEqual(['b']);
	});

	it('decrements the oldest alerts first', () => {
		const store = useSystemStore();

		store.addAlert({ text: 'a', type: 'info' });
		store.addAlert({ text: 'b', type: 'info' });

		store.decrementAlerts({ quantity: 1 });

		expect(store.getAlerts({ asText: true })).toEqual(['b']);
	});

	it('clears messages by type', () => {
		const store = useSystemStore();

		store.addMessage({ text: 'm1', type: 'info' });
		store.addMessage({ text: 'm2', type: 'error' });

		store.clearMessages({ type: 'info' });

		expect(store.getMessages({ asText: true })).toEqual(['m2']);
	});

	it('clears all announcements when no type is given', () => {
		const store = useSystemStore();

		store.addAnnouncement({ text: 'x', type: 'info' });
		store.addAnnouncement({ text: 'y', type: 'warning' });

		store.clearAnnouncements();

		expect(store.getAnnouncements()).toHaveLength(0);
	});
});
