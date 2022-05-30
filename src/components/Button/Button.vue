<template>
	<v-btn
		v-bind="$attrs"
		class="ty-button"
		:icon="isIcon"
		v-on="$listeners"
	>
		<span
			v-if="renderIconStart"
			:class="iconStartClasses"
		>
			<slot name="icon">
				<v-icon>
					{{ icon }}
				</v-icon>
			</slot>
		</span>

		<template v-if="!compact">
			<slot />
		</template>

		<span
			v-if="renderIconEnd"
			:class="iconEndClasses"
		>
			<slot name="icon">
				<v-icon>
					{{ icon }}
				</v-icon>
			</slot>
		</span>
	</v-btn>
</template>

<script>
	const ICON_START = 'start';
	const ICON_END = 'end';
	const ICON_BOTH = 'both'
	const VALID_ICON_PLACEMENTS = [
		ICON_START,
		ICON_END,
		ICON_BOTH,
		'neither'
	];

	/** Specialized button component. */
	export default {
		name: 'TyButton',

		inheritAttrs: false,

		props: {
			icon: {
				type: [Boolean, String],
				default: false
			},

			iconPlacement: {
				type: String,
				default: ICON_START,
				validator: placement =>
					VALID_ICON_PLACEMENTS.includes(placement)
			},

			compact: {
				type: Boolean,
				default: false
			}
		},

		computed: {
			isIcon() {
				return this.icon == true
					|| (
						(!this.$scopedSlots.default || this.compact)
						&& (this.icon || this.$scopedSlots.icon)
					);
			},

			renderIcon() {
				return this.$scopedSlots.icon
					|| typeof this.icon == 'string';
			},

			renderIconStart() {
				return this.renderIcon
					&& (
						this.iconPlacement == ICON_START
						|| this.iconPlacement == ICON_BOTH
					);
			},

			renderIconEnd() {
				return this.renderIcon
					&& (
						this.iconPlacement == ICON_END
						|| (
							this.iconPlacement == ICON_BOTH
							&& !this.compact
						)
					);
			},

			iconStartClasses() {
				return {
					'pr-2': !this.isIcon
				}
			},

			iconEndClasses() {
				return {
					'pl-2': !this.isIcon
				}
			}
		}
	};
</script>
