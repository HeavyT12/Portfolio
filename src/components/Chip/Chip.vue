<template>
	<v-chip
		variant="outlined"
		size="small"
		v-bind="$attrs"
		class="ty-chip"
	>
		<slot />
	</v-chip>
</template>

<script>
	/** Specialized, subtle chip used for short metadata labels (e.g. skills). */
	export default {
		name: 'TyChip',

		inheritAttrs: false
	};
</script>
