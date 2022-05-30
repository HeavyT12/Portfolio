<template>
	<v-icon
		v-bind="$attrs"
		class="ty-icon"
		v-on="$listeners"
	>
		<slot />
	</v-icon>
</template>

<script>
	/** Specialized icon component. */
	export default {
		name: 'TyIcon',

		inheritAttrs: false
	};
</script>
