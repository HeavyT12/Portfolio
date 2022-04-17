<template>
	<v-btn
		v-bind="$attrs"
		class="ty-button"
		v-on="$listeners"
	>
		<slot />
	</v-btn>
</template>

<script>
	/** Specialized button component. */
	export default {
		name: 'TyButton',

		inheritAttrs: false
	};
</script>
