<template>
	<v-timeline-item
		ref="timelineItem"
		v-bind="$attrs"
		class="ty-timeline-item align-center"
		:color="color"
		small
		v-on="$listeners"
	>
		<template #opposite>
			<span
				v-if="date"
				class="text-h6 font-weight-bold"
			>
				{{ dateString }}
			</span>
			<slot name="opposite" />
		</template>

		<div
			class="ty-timeline-item__content d-flex"
		>
			<v-flex v-if="updateShouldSpace()" />
			<v-card>
				<v-card-title class="ty-timeline-item__content-title py-2 px-4">
					<slot name="title">
						<div
							v-if="title"
							class="text-h5"
						>
							{{ title }}
						</div>
					</slot>
				</v-card-title>

				<v-card-subtitle
					v-if="dense"
					class="py-1"
				>
					{{ dateString }}
				</v-card-subtitle>

				<template v-if="$slots.default">
					<v-divider />

					<v-card-text class="black--text">
						<slot />
					</v-card-text>
				</template>
			</v-card>
		</div>
	</v-timeline-item>
</template>

<script>
	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	/** Specialized version of the v-timeline-item component. */
	export default {
		name: 'TyTimelineItem',

		inheritAttrs: false,

		props: {
			date: {
				type: Object,
				default: undefined,
				validator: date =>
					typeof date == 'undefined'
						|| date instanceof Date
			},

			color: {
				type: String,
				default: undefined
			},

			title: {
				type: String,
				default: ''
			},

			dense: {
				type: Boolean,
				default: false
			}
		},

		data: () => ({
			shouldSpace: false
		}),

		computed: {
			dateString() {
				return `${this.getMonthName(this.date.getMonth())} ${this.date.getFullYear()}`
			}
		},

		methods: {
			calcShouldSpace() {
				if (this.$vuetify.breakpoint.xs) {
					return false;
				}

				const thisEl = this.$el;

				if (!thisEl) {
					return false;
				}

				const style = getComputedStyle(thisEl);
				const flexDirection = style.flexDirection;

				return flexDirection !== 'row-reverse';
			},

			updateShouldSpace() {
				this.shouldSpace = this.calcShouldSpace()
				return this.shouldSpace;
			},

			getMonthName(index) {
				return monthNames[index]
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ty-timeline-item {
		.ty-timeline-item__content-title {
			word-break: unset;
		}
	}
</style>
