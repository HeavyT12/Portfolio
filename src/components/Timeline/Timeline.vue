<template>
	<div class="ty-timeline">
		<v-toolbar
			v-if="title"
			flat
			dense
		>
			{{ title }}
		</v-toolbar>
		<v-timeline
			v-bind="$attrs"
			ref="timeline"
			class="ty-timeline__timeline"
			v-on="$listeners"
		>
			<slot />
		</v-timeline>
	</div>
</template>

<script>
	import TyTimelineItem from 'Timeline/TimelineItem.vue';

	/** Specialized version of the v-timeline component. */
	export default {
		name: 'TyTimeline',

		inheritAttrs: false,

		props: {
			title: {
				type: String,
				default: ''
			},

			colors: {
				type: Array,
				required: true,
				validator: colors =>
					colors.length > 0
					&& colors.every(color => typeof color == 'string')
			}
		},

		watch: {
			colors: {
				deep: true,
				immediate: true,
				handler() {
					this.processColors();
				}
			}
		},

		mounted() {
			this.processColors();
		},

		methods: {
			processColors() {
				if (this.colors.length == 0) {
					return;
				}

				this.$children[1]?.$children
					.filter(child => child.$options.name === TyTimelineItem.name)
					.forEach((timelineItem, index) => {
						timelineItem.color = this.colors[index % this.colors.length];
					});
			}
		}
	};
</script>

<style scoped lang="scss">
	.ty-timeline {
		.ty-timeline__timeline {
			padding-top: 12px;
		}
	}
</style>
