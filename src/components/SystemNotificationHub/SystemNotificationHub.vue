<template>
	<div class="system-notification-hub">
		<TyAlertSnackbar
			v-for="({notifications, clearMethod, type}, n) in genAlertsData()"
			v-model="notifications.length"
			app
			:key="n"
			:type="type"
			:alerts="notifications"
			@close="clearMethod"
		/>

		<TyMessageDialog
			v-for="({notifications, clearMethod, type}, n) in genMessagesData()"
			v-model="notifications.length"
			:key="n"
			:type="type"
			:messages="notifications"
			@close="clearMethod"
		/>

		<v-expand-transition>
			<div v-if="announcements.length && showAnnouncements">
				<TyAnnouncementBar
					dismissible
					:announcements="announcements"
					@input="toggleAnnouncements"
				/>
			</div>
		</v-expand-transition>
	</div>
</template>

<script>
	import TyAlertSnackbar from 'Snackbar/AlertSnackbar.vue';
	import TyAnnouncementBar from 'AnnouncementBar/AnnouncementBar.vue'
	import TyMessageDialog from 'Dialog/MessageDialog.vue';

	import { mapGetters, mapMutations } from 'vuex';

	import {
		GET_ALERTS,
		GET_MESSAGES,
		GET_ANNOUNCEMENTS
	} from 'stores/System/SystemGetters.js';

	import {
		CLEAR_ALERTS,
		CLEAR_MESSAGES,
		CLEAR_ANNOUNCEMENTS
	} from 'stores/System/SystemMutations.js';

	import {
		TYPE_SUCCESS,
		TYPE_INFO,
		TYPE_WARNING,
		TYPE_ERROR
	} from 'mixins/Notification/Notification.js';

	/** Interface component for the bulk of system notifications. */
	export default {
		name: 'SystemNotificationHub',

		inheritAttrs: false,

		components: {
			TyAlertSnackbar,
			TyAnnouncementBar,
			TyMessageDialog
		},

		props: {
			showAnnouncements: {
				type: Boolean,
				default: false
			},

			showSuccessAlerts: {
				type: Boolean,
				default: false
			},

			showInfoAlerts: {
				type: Boolean,
				default: false
			},

			showWarningAlerts: {
				type: Boolean,
				default: false
			},

			showErrorAlerts: {
				type: Boolean,
				default: false
			},

			showSuccessMessages: {
				type: Boolean,
				default: false
			},

			showInfoMessages: {
				type: Boolean,
				default: false
			},

			showWarningMessages: {
				type: Boolean,
				default: false
			},

			showErrorMessages: {
				type: Boolean,
				default: false
			}
		},

		data: () => ({
			TYPE_SUCCESS,
			TYPE_INFO,
			TYPE_WARNING,
			TYPE_ERROR
		}),

		computed: {
			...mapGetters('System', [
				GET_ALERTS,
				GET_ANNOUNCEMENTS,
				GET_MESSAGES
			]),

			announcements() {
				return this[GET_ANNOUNCEMENTS]();
			}
		},

		methods: {
			...mapMutations('System', [
				CLEAR_ALERTS,
				CLEAR_ANNOUNCEMENTS,
				CLEAR_MESSAGES
			]),

			filterTypes(typeMap) {
				return Object.entries(typeMap)
					.filter(([_, value]) => value)
					.map(([key]) => key);
			},

			genAlertsData() {
				return this.genData(GET_ALERTS, CLEAR_ALERTS, this.filterTypes({
					[TYPE_SUCCESS]: this.showSuccessAlerts,
					[TYPE_INFO]: this.showInfoAlerts,
					[TYPE_WARNING]: this.showWarningAlerts,
					[TYPE_ERROR]: this.showErrorAlerts
				}));
			},

			genMessagesData() {
				return this.genData(GET_MESSAGES, CLEAR_MESSAGES, this.filterTypes({
					[TYPE_SUCCESS]: this.showSuccessMessages,
					[TYPE_INFO]: this.showInfoMessages,
					[TYPE_WARNING]: this.showWarningMessages,
					[TYPE_ERROR]: this.showErrorMessages
				}));
			},

			genData(getter, clearer, types) {
				return types.map(type => {
					return {
						notifications: this.getNotifications(getter, type),
						clearMethod: this.genNotificationClearer(clearer, type),
						type
					}
				})
			},

			getNotifications(getter, type) {
				return this[getter]({ asText: true, type });
			},

			genNotificationClearer(clearer, type) {
				return () => this[clearer]({ type });
			},

			toggleAnnouncements(input) {
				if (!input) {
					this[CLEAR_ANNOUNCEMENTS]();
				}
			}
		}
	};
</script>
