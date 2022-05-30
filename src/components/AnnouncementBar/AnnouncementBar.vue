<template>
	<v-alert
		v-bind="$attrs"
		class="announcement-bar text-center"
		:type="type"
		:icon="iconToUse"
		v-on="$listeners"
	>
		{{ text }}
	</v-alert>
</template>

<script>
	import { ICON_MAP } from 'mixins/Notification/Notification.js';

	import { hasOwnProperty } from 'object.js';

	const DEFAULT_MESSAGE_MILLISECONDS = 10000;

	export default {
		name: 'TyAnnouncementBar',

		inheritAttrs: false,

		props: {
			announcements: {
				type: Array,
				default: () => [],
				validator: (announcements) =>
					announcements.every(announcement =>
						hasOwnProperty(announcement, 'type', 'text')
					)
			},

			/**
			 * The amount of time (in milliseconds)
			 * each announcement will display.
			 */
			transitionDelay: {
				type: Number,
				default: DEFAULT_MESSAGE_MILLISECONDS
			}
		},

		data: () => ({
			intervalId: null,
			index: 0
		}),

		computed: {
			type() {
				return this.announcements.length
					? this.announcements[this.index].type
					: undefined;
			},

			text() {
				return this.announcements.length
					? this.announcements[this.index].text
					: '';
			},

			iconToUse() {
				return ICON_MAP[this.type];
			}
		},

		watch: {
			transitionDelay() {
				this.refreshInterval();
			},

			announcements: {
				deep: true,
				handler() {
					this.stopInterval();
					this.transitionAnnouncement();
					this.startInterval();
				}
			}
		},

		mounted() {
			this.startInterval();
		},

		beforeDestroy() {
			this.stopInterval();
		},

		methods: {
			startInterval() {
				if (!this.intervalId && this.announcements.length > 1) {
					this.intervalId = setInterval(
						this.transitionAnnouncement,
						this.transitionDelay
					);
				}
			},

			stopInterval() {
				clearInterval(this.intervalId);
				this.intervalId = null;
			},

			refreshInterval() {
				this.stopInterval();
				this.startInterval();
			},

			transitionAnnouncement() {
				if (this.announcements.length) {
					this.index = (this.index + 1) % this.announcements.length;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.announcement-bar {
		transition: background-color 1.2s ease-out;
	}
</style>
