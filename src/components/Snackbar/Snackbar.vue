<template>
	<v-snackbar
		v-model="localValue"
		v-bind="$attrs"
		class="ty-snackbar"
		:class="classes"
		content-class="ty-snackbar-content d-flex align-center"
	>
		<span
			v-if="icon || $slots.icon"
			class="pr-3 align-self-start"
		>
			<slot name="icon">
				<v-icon
					v-if="icon"
					:icon="icon"
				/>
			</slot>
		</span>

		<div>
			<slot />
		</div>

		<template #actions>
			<slot name="actions" />

			<TyButton
				v-if="closable"
				:icon="isCloseIcon ? 'mdi-close' : false"
				:compact="isCloseIcon"
				@click="localValue = false"
			>
				{{ closable }}
			</TyButton>
		</template>
	</v-snackbar>
</template>

<script>
	import Model from '@/mixins/Model/Model.js';

	import TyButton from '@/components/Button/Button.vue';

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
			:deep(.v-snackbar__actions) {
				align-self: start;
				padding-top: 8px;
			}
		}
	}
</style>
