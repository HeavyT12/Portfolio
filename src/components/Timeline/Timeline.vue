<template>
	<div class="ty-timeline">
		<div
			v-if="title || skills.length"
			class="ty-timeline__header"
			:style="headerStyle"
		>
			<TyLink
				v-if="title && website"
				class="ty-timeline__website-link ty-timeline__title"
				:href="website"
			>
				{{ title }}
			</TyLink>
			<span
				v-else-if="title"
				class="ty-timeline__title"
			>
				{{ title }}
			</span>
			<div
				v-if="skills.length"
				class="ty-timeline__skills d-flex flex-wrap ga-2"
			>
				<TyChip
					v-for="skill in skills"
					:key="skill"
				>
					{{ skill }}
				</TyChip>
			</div>
		</div>
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
	import TyChip from '@/components/Chip/Chip.vue';
	import TyLink from '@/components/Link/Link.vue';

	/** Specialized version of the v-timeline component. */
	export default {
		name: 'TyTimeline',

		inheritAttrs: false,

		components: {
			TyChip,
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
			},

			/** Short skill labels rendered as a subtle chip cloud beside the title. */
			skills: {
				type: Array,
				default: () => [],
				validator: skills =>
					skills.every(skill => typeof skill == 'string')
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

			headerStyle() {
				return `border-bottom: 3px solid ${this.colors[0]};`
			}
		}
	};
</script>

<style scoped lang="scss">
	.ty-timeline {
		.ty-timeline__header {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			column-gap: 1.5rem;
			row-gap: 0.5rem;
			padding: 0.5rem 1rem;
		}

		.ty-timeline__title {
			font-size: 2.5rem;
			font-weight: 700;
			line-height: 1.25;
		}

		// Push the chip cloud to the right edge of the header, opposite the title.
		.ty-timeline__skills {
			margin-left: auto;
		}

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
