<template>
	<v-overlay
		v-model="localValue"
		v-bind="$attrs"
		class="ty-loading-mask"
		contained
		@click="$emit('click')"
	>
		<slot name="progress">
			<TyLoadingLogo />
		</slot>
		<slot />
	</v-overlay>
</template>

<script>
	import Model from '@/mixins/Model/Model.js';
	import TyLoadingLogo from '@/components/Loading/Logo.vue';

	export default {
		name: 'TyLoadingMask',

		inheritAttrs: false,

		mixins: [Model],

		emits: ['click'],

		components: {
			TyLoadingLogo
		}
	};
</script>
