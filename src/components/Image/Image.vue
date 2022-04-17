<template>
	<v-img
		v-bind="$attrs"
		class="ty-image"
		v-on="$listeners"
	>
		<slot />
	</v-img>
</template>

<script>
	/** Specialized image component. */
	export default {
		name: 'TyImage',

		inheritAttrs: false
	};
</script>
