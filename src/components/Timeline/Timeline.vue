<template>
	<div class="ty-timeline">
		<v-toolbar
			v-if="title"
			class="text-h4"
			:style="toolbarStyle"
			flat
			density="compact"
		>
			<TyLink
				v-if="website"
				class="ty-timeline__website-link"
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
			class="ty-timeline__timeline pr-4"
			:class="timelineClasses"
			:density="dense ? 'compact' : 'default'"
			:side="dense ? 'end' : undefined"
		>
			<slot />
		</v-timeline>
	</div>
</template>

<script>
	import TyLink from '@/components/Link/Link.vue';

	/** Specialized version of the v-timeline component. */
	export default {
		name: 'TyTimeline',

		inheritAttrs: false,

		components: {
			TyLink
		},

		provide() {
			return {
				// Functions (not refs) so child computeds track the parent's
				// reactive props without relying on ref auto-unwrapping.
				timeline: {
					getColors: () => this.colors,
					getDense: () => this.dense,
					register: () => this.nextIndex++
				}
			};
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

			/** Whether the timeline renders in its compact, single-sided form. */
			dense: {
				type: Boolean,
				default: false
			},

			website: {
				type: String,
				default: ''
			}
		},

		data: () => ({
			// Hands each TyTimelineItem its position so it can pick a color.
			nextIndex: 0
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
