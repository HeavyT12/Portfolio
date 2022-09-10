import {
	ALERTS,
	ANNOUNCEMENTS,
	MESSAGES
} from 'stores/System/SystemStateKeys.js';

import {
	GET_ALERTS,
	GET_ANNOUNCEMENTS,
	GET_MESSAGES
} from 'stores/System/SystemGetters.js';

import {
	ADD_ALERT,
	ADD_ANNOUNCEMENT,
	ADD_MESSAGE,
	DECREMENT_ALERTS,
	DECREMENT_ANNOUNCEMENTS,
	DECREMENT_MESSAGES,
	CLEAR_ALERTS,
	CLEAR_ANNOUNCEMENTS,
	CLEAR_MESSAGES
} from 'stores/System/SystemMutations.js';

const getNotifications = (state, key) => (({ asText = false, type = undefined } = {}) => {
	let notifications = state[key];

	if (type) {
		notifications = notifications.filter(notification => type == notification.type);
	}

	if (asText) {
		notifications = notifications.map(notification => notification.text);
	}

	return notifications;
});
const addNotifications = (state, key, ...items) => state[key].push(...items);
const decrementNotifications = (state, key, quantity = 1, type = undefined) => {
	let count = 0;
	state[key] = state[key].filter(notification => {
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
		false;
	});
}
const clearNotifications = (state, key, type) => {
	if (type) {
		state[key] = state[key].filter(notification => type !== notification.type);
	} else {
		state[key] = [];
	}
}

export default {
	namespaced: true,

	state: () => ({
		[ALERTS]: [],
		[ANNOUNCEMENTS]: [],
		[MESSAGES]: []
	}),

	getters: {
		[GET_ALERTS](state) {
			return getNotifications(state, ALERTS);
		},

		[GET_ANNOUNCEMENTS](state) {
			return getNotifications(state, ANNOUNCEMENTS);
		},

		[GET_MESSAGES](state) {
			return getNotifications(state, MESSAGES);
		}
	},

	mutations: {
		[ADD_ALERT](state, { text, type }) {
			addNotifications(state, ALERTS, { text, type });
		},

		[ADD_ANNOUNCEMENT](state, { text, type }) {
			addNotifications(state, ANNOUNCEMENTS, { text, type });
		},

		[ADD_MESSAGE](state, { text, type }) {
			addNotifications(state, MESSAGES, { text, type });
		},

		[DECREMENT_ALERTS](state, { quantity = 1, type = undefined } = {}) {
			decrementNotifications(state, ALERTS, quantity, type);
		},

		[DECREMENT_ANNOUNCEMENTS](state, { quantity = 1, type = undefined } = {}) {
			decrementNotifications(state, ANNOUNCEMENTS, quantity, type);
		},

		[DECREMENT_MESSAGES](state, { quantity = 1, type = undefined } = {}) {
			decrementNotifications(state, MESSAGES, quantity, type);
		},

		[CLEAR_ALERTS](state, { type = undefined } = {}) {
			clearNotifications(state, ALERTS, type);
		},

		[CLEAR_ANNOUNCEMENTS](state, { type = undefined } = {}) {
			clearNotifications(state, ANNOUNCEMENTS, type);
		},

		[CLEAR_MESSAGES](state, { type = undefined } = {}) {
			clearNotifications(state, MESSAGES, type);
		}
	}
};
