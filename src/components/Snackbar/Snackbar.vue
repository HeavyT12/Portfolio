<template>
	<v-snackbar
		v-model="localValue"
		v-bind="$attrs"
		class="ty-snackbar"
		:class="classes"
		content-class="ty-snackbar-content d-flex align-center"
		v-on="$listeners"
	>
		<span
			v-if="icon || $scopedSlots.icon"
			class="pr-3 align-self-start"
		>
			<slot name="icon">
				<v-icon v-if="icon">
					{{ icon }}
				</v-icon>
			</slot>
		</span>

		<div>
			<slot />
		</div>

		<template #action="actionProps">
			<slot
				name="action"
				v-bind="actionProps"
			/>

			<TyButton
				v-if="closable"
				v-bind="actionProps"
				:icon="isCloseIcon ? 'close' : false"
				:compact="isCloseIcon"
				@click="localValue = false"
			>
				{{ closable }}
			</TyButton>
		</template>
	</v-snackbar>
</template>

<script>
	import Model from 'mixins/Model/Model.js';

	import TyButton from 'Button/Button.vue';

	/** Specialized snackbar component. */
	export default {
		name: 'TySnackBar',

		inheritAttrs: false,

		mixins: [Model],

		components: {
			TyButton
		},

		props: {
			closable: {
				type: [Boolean, String],
				default: true
			},

			icon: {
				type: String,
				default: ''
			},

			vertical: {
				type: Boolean,
				default: false
			}
		},

		computed: {
			classes() {
				return {
					'ty-snackbar--horizontal': !this.vertical
				};
			},

			isCloseIcon() {
				return this.closable == true;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ty-snackbar {
		&.ty-snackbar--horizontal {
			::v-deep .v-snack__action {
				align-self: start;
				padding-top: 8px;
			}
		}
	}
</style>
