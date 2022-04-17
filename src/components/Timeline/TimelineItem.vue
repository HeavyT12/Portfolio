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
				class="headline font-weight-bold"
			>
				{{ date }}
			</span>
			<slot name="opposite" />
		</template>
		<div class="d-flex">
			<v-flex v-if="shouldSpace" />
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

		mounted() {
			this.calcShouldSpace();
		},

		updated() {
			this.calcShouldSpace();
		},

		methods: {
			calcShouldSpace() {
				const thisEl = this.$el;

				if (!thisEl) {
					return;
				}

				const style = getComputedStyle(thisEl);
				const flexDirection = style.flexDirection;

				this.shouldSpace = flexDirection !== 'row-reverse';
			}
		}
	};
</script>
