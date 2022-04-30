<template>
	<v-container
		v-bind="$attrs"
		class="ty-container"
		:class="classes"
		v-on="$listeners"
	>
		<slot />
	</v-container>
</template>

<script>
	/** Specialized container component. */
	export default {
		name: 'TyContainer',

		inheritAttrs: false,

		computed: {
			classes() {
				return {
					['ty-container--squished']: this.$vuetify.breakpoint.mdAndUp
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ty-container {
		&.ty-container--squished {
			padding: 12px 15%;
		}
	}
</style>
