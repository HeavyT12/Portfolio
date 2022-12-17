<template>
	<v-timeline-item
		ref="timelineItem"
		v-resize="onResize"
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

		<div class="d-flex">
			<v-flex v-if="updateShouldSpace()" />
			<v-card
				ref="timelineItemCard"
				class="ty-timeline-item__card"
				:style="cardStyles"
			>
				<v-card-title class="ty-timeline-item__card-title py-2 px-4">
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
						<div
							v-if="showCollapsed"
							class="ty-timeline-item__arrow-container ty-timeline-item__up-arrow-container pt-5 pb-2"
						>
							<TyButton
								class="ty-timeline-item__up-arrow-button white--text"
								color="rainBlue"
								fab
								x-small
								@click="onOverlayClick"
							>
								<TyIcon>keyboard_arrow_down</TyIcon>
							</TyButton>
						</div>
						<div
							v-if="showExpanded"
							class="ty-timeline-item__arrow-container ty-timeline-item__bottom-arrow-container"
						>
							<TyButton
								icon="keyboard_arrow_up"
								@click="onUpArrowClick"
							/>
						</div>
					</v-card-text>
				</template>
			</v-card>
		</div>
	</v-timeline-item>
</template>

<script>
	import TyButton from 'Button/Button.vue';
	import TyIcon from 'Icon/Icon.vue';

	import { debounce } from 'lodash-es';

	const MONTH_NAMES = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	const MAX_CARD_HEIGHT = 180;

	/** Specialized version of the v-timeline-item component. */
	export default {
		name: 'TyTimelineItem',

		inheritAttrs: false,

		components: {
			TyButton,
			TyIcon
		},

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
			shouldSpace: false,
			oversized: false,
			clickExpanded: false,
			loading: true
		}),

		computed: {
			cardStyles() {
				if (!this.showCollapsed) {
					return {};
				}

				return {
					'max-height': `${MAX_CARD_HEIGHT}px`
				};
			},

			dateString() {
				return `${this.getMonthName(this.date.getMonth())} ${this.date.getFullYear()}`
			},

			showCollapsed() {
				return this.loading || (this.oversized && !this.clickExpanded);
			},

			showExpanded() {
				return this.oversized && this.clickExpanded;
			}
		},

		created() {
			this.onResize = debounce(this.validateCardSize, 500);
		},

		methods: {
			calcShouldSpace() {
				if (this.dense) {
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

			onResize() {
				// Implementation in created hook.
			},

			validateCardSize() {
				this.oversized = this.clickExpanded
					|| (
						this.$refs.timelineItemCard
						&& this.$refs.timelineItemCard.$el
						&& (
							this.$refs.timelineItemCard.$el.style.maxHeight == MAX_CARD_HEIGHT
							|| this.$refs.timelineItemCard.$el.offsetHeight >= MAX_CARD_HEIGHT
						)
					);

				this.loading = false;
			},

			onOverlayClick() {
				this.clickExpanded = true;
			},

			onUpArrowClick() {
				this.clickExpanded = false;
				this.$nextTick(() => {
					this.validateCardSize();
				});
			},

			getMonthName(index) {
				return MONTH_NAMES[index]
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ty-timeline-item {
		.ty-timeline-item__card {
			overflow-y: hidden;
		}

		.ty-timeline-item__card-title {
			word-break: unset;
		}

		.ty-timeline-item__arrow-container {
			display: flex;
			justify-content: center;
			align-items: center;

			&.ty-timeline-item__up-arrow-container {
				position: absolute;
				top: 120px;
				left: 0;
				right: 0;
				background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
			}

			&.ty-timeline-item__bottom-arrow-container {
				margin-bottom: -16px;
			}
		}
	}
</style>
