<template>
	<v-overlay
		v-bind="$attrs"
		:value="localValue"
		class="ty-loading-mask"
		absolute
		@click.native="$emit('click')"
		v-on="$listeners"
	>
		<slot name="progress">
			<TyLoadingLogo />
		</slot>
		<slot />
	</v-overlay>
</template>

<script>
	import Model from 'mixins/Model/Model.js';
	import TyLoadingLogo from 'Loading/Logo.vue';

	export default {
		name: 'TyLoadingMask',

		inheritAttrs: false,

		mixins: [Model],

		components: {
			TyLoadingLogo
		},

		props: {}
	};
</script>
