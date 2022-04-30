<template>
	<div class="ty-timeline">
		<v-toolbar
			v-if="title"
			class="text-h5"
			:style="toolbarStyle"
			flat
			dense
		>
			{{ title }}
		</v-toolbar>
		<v-timeline
			v-bind="$attrs"
			ref="timeline"
			class="ty-timeline__timeline"
			:dense="isDense"
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
			/** The main heading for the timeline section. */
			title: {
				type: String,
				default: ''
			},

			/** Array of strings that represent the color theme for the timeline. */
			colors: {
				type: Array,
				required: true,
				validator: colors =>
					colors.length > 0
					&& colors.every(color => typeof color == 'string')
			}
		},

		computed: {
			toolbarStyle() {
				return `border-bottom: 3px solid ${this.colors[0]};`
			},

			isDense() {
				return this.$vuetify.breakpoint.xs;
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
