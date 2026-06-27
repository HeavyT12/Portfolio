<template>
	<div class="system-notification-hub">
		<TyAlertSnackbar
			v-for="({notifications, clearMethod, type}, n) in genAlertsData()"
			:model-value="notifications.length > 0"
			:key="n"
			:type="type"
			:alerts="notifications"
			:timeout="6000 + notifications.length"
			@close="clearMethod"
		/>

		<TyMessageDialog
			v-for="({notifications, clearMethod, type}, n) in genMessagesData()"
			:model-value="notifications.length > 0"
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
	import { mapState, mapActions } from 'pinia';

	import TyAlertSnackbar from '@/components/Snackbar/AlertSnackbar.vue';
	import TyAnnouncementBar from '@/components/AnnouncementBar/AnnouncementBar.vue';
	import TyMessageDialog from '@/components/Dialog/MessageDialog.vue';

	import { useSystemStore } from '@/stores/system.js';

	import {
		TYPE_SUCCESS,
		TYPE_INFO,
		TYPE_WARNING,
		TYPE_ERROR
	} from '@/mixins/Notification/Notification.js';

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
			...mapState(useSystemStore, [
				'getAlerts',
				'getAnnouncements',
				'getMessages'
			]),

			announcements() {
				return this.getAnnouncements();
			}
		},

		methods: {
			...mapActions(useSystemStore, [
				'clearAnnouncements',
				'clearMessages',
				'decrementAlerts'
			]),

			filterTypes(typeMap) {
				return Object.entries(typeMap)
					.filter(([, value]) => value)
					.map(([key]) => key);
			},

			genAlertsData() {
				return this.genData('getAlerts', 'decrementAlerts', this.filterTypes({
					[TYPE_SUCCESS]: this.showSuccessAlerts,
					[TYPE_INFO]: this.showInfoAlerts,
					[TYPE_WARNING]: this.showWarningAlerts,
					[TYPE_ERROR]: this.showErrorAlerts
				}));
			},

			genMessagesData() {
				return this.genData('getMessages', 'clearMessages', this.filterTypes({
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
					this.clearAnnouncements();
				}
			}
		}
	};
</script>
