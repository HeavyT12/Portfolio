<template>
	<TyImage
		v-bind="$attrs"
		class="ty-loading-logo"
		:class="classes"
		src="../resource/logo.png"
		:max-width="size"
		v-on="$listeners"
	/>
</template>

<script>
	import TyImage from 'Image/Image.vue';

	export default {
		name: 'TyLoadingLogo',

		inheritAttrs: false,

		components: {
			TyImage
		},

		props: {
			inactive: {
				type: Boolean,
				default: false
			},

			size: {
				type: [String, Number],
				default: 90
			}
		},

		computed: {
			classes() {
				return {
					'ty-loading-logo--active': !this.inactive
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ty-loading-logo {
		&.ty-loading-logo--active {
			animation-duration: 3s;
			animation-name: spin;
			animation-iteration-count: infinite;
		}

		@keyframes spin {
			from {
				transform: rotateZ(0deg);
			}

			to {
				transform: rotateZ(-1440deg);
			}
		}
	}
</style>
