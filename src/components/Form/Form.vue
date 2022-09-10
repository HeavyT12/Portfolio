<template>
	<form
		v-bind="$attrs"
		class="ty-form"
		v-on="$listeners"
	>
		<slot />
	</form>
</template>

<script>
	/** Specialized form component. */
	export default {
		name: 'TyForm',

		inheritAttrs: false
	};
</script>
