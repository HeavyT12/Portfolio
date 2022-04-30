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
				{{ date }}
			</span>
			<slot name="opposite" />
		</template>
		<div
			class="ty-timeline-item__content d-flex"
			:class="contentClasses"
		>
			<v-flex v-if="updateShouldSpace()" />
			<slot />
		</div>
	</v-timeline-item>
</template>

<script>
	/** Specialized version of the v-timeline-item component. */
	export default {
		name: 'TyTimelineItem',

		inheritAttrs: false,

		props: {
			date: {
				type: String,
				default: ''
			},

			color: {
				type: String,
				default: undefined
			}
		},

		data: () => ({
			shouldSpace: false
		}),

		computed: {
			contentClasses() {
				return {
					['ty-timeline-item__content--right-align']: this.shouldSpace
				}
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
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ty-timeline-item {
		.ty-timeline-item__content {
			&.ty-timeline-item__content--right-align {
				text-align: right;
			}
		}
	}
</style>
