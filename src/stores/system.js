import { defineStore } from 'pinia';

function filterNotifications(list, { asText = false, type = undefined } = {}) {
	let notifications = list;

	if (type) {
		notifications = notifications.filter(notification => notification.type === type);
	}

	if (asText) {
		notifications = notifications.map(notification => notification.text);
	}

	return notifications;
}

function decrement(list, quantity = 1, type = undefined) {
	let count = 0;

	return list.filter(notification => {
		if (count >= quantity) {
			return true;
		}

		if (type) {
			if (notification.type === type) {
				count++;
				return false;
			}

			return true;
		}

		count++;
		return false;
	});
}

function clear(list, type) {
	return type ? list.filter(notification => notification.type !== type) : [];
}

export const useSystemStore = defineStore('system', {
	state: () => ({
		alerts: [],
		announcements: [],
		messages: []
	}),

	getters: {
		getAlerts: state => options => filterNotifications(state.alerts, options),
		getAnnouncements: state => options => filterNotifications(state.announcements, options),
		getMessages: state => options => filterNotifications(state.messages, options)
	},

	actions: {
		addAlert({ text, type }) {
			this.alerts.push({ text, type });
		},

		addAnnouncement({ text, type }) {
			this.announcements.push({ text, type });
		},

		addMessage({ text, type }) {
			this.messages.push({ text, type });
		},

		decrementAlerts({ quantity = 1, type = undefined } = {}) {
			this.alerts = decrement(this.alerts, quantity, type);
		},

		decrementAnnouncements({ quantity = 1, type = undefined } = {}) {
			this.announcements = decrement(this.announcements, quantity, type);
		},

		decrementMessages({ quantity = 1, type = undefined } = {}) {
			this.messages = decrement(this.messages, quantity, type);
		},

		clearAlerts({ type = undefined } = {}) {
			this.alerts = clear(this.alerts, type);
		},

		clearAnnouncements({ type = undefined } = {}) {
			this.announcements = clear(this.announcements, type);
		},

		clearMessages({ type = undefined } = {}) {
			this.messages = clear(this.messages, type);
		}
	}
});
