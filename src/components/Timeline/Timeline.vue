<template>
	<div class="ty-timeline">
		<v-toolbar
			v-if="title"
			class="text-h4"
			:style="toolbarStyle"
			flat
			dense
		>
			<TyLink
				class="ty-timeline__website-link"
				v-if="website"
				:href="website"

			>
				{{ title }}
			</TyLink>
			<template v-else>
				{{ title }}
			</template>
		</v-toolbar>
		<v-timeline
			v-bind="$attrs"
			ref="timeline"
			class="ty-timeline__timeline pr-4"
			:class="timelineClasses"
			v-on="$listeners"
		>
			<slot />
		</v-timeline>
	</div>
</template>

<script>
	import TyLink from 'Link/Link.vue';
	import TyTimelineItem from 'Timeline/TimelineItem.vue';

	const V_TIMELINE_WATCHERS = {
		dense: false
	};

	/** Specialized version of the v-timeline component. */
	export default {
		name: 'TyTimeline',

		inheritAttrs: false,

		components: {
			TyLink
		},

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
			},

			website: {
				type: String,
				default: ''
			}
		},

		data: () => ({
			...V_TIMELINE_WATCHERS,
		}),

		computed: {
			timelineClasses() {
				return {
					'pl-4': !this.dense
				};
			},

			toolbarStyle() {
				return `border-bottom: 3px solid ${this.colors[0]};`
			}
		},

		watch: {
			colors: {
				deep: true,
				immediate: true,
				handler() {
					this.updateTimelineItemsColor();
				}
			}
		},

		mounted() {
			this.updateTimelineItemsColor();

			// Set up the child component watchers.
			Object.keys(V_TIMELINE_WATCHERS).forEach((field) => {
				this.$watch(
					() => this.$refs.timeline[field],
					(value) => {
						this[field] = value;
						this.updateTimelineItemsDense();
					},
					{
						immediate: true,
					}
				);
			});
		},

		methods: {
			updateTimelineItemsColor() {
				this.updateTimelineItemsProperty(
					(timelineItem, index) => {
						timelineItem.color = this.colors[index % this.colors.length];
					}
				);
			},

			updateTimelineItemsDense() {
				this.updateTimelineItemsProperty(
					timelineItem => {
						timelineItem.dense = this.dense;
					}
				);
			},

			updateTimelineItemsProperty(forEachLambda) {
				this.$children[1]?.$children
					.filter(child => child.$options.name === TyTimelineItem.name)
					.forEach(forEachLambda);
			}
		}
	};
</script>

<style scoped lang="scss">
.ty-timeline {
		.ty-timeline__timeline {
			padding-top: 12px;
		}

		.ty-timeline__website-link {
			color: #000;
			text-decoration: none;

			&:hover {
				color: #00A2E8;
				text-decoration: underline;
			}
		}
	}
</style>
