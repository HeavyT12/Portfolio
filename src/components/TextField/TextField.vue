<template>
	<v-textarea
		v-if="multiline"
		v-bind="$attrs"
		class="ty-text-field"
	>
		<slot />
	</v-textarea>
	<v-text-field
		v-else
		v-bind="$attrs"
		class="ty-text-field"
	>
		<slot />
	</v-text-field>
</template>

<script>
	/** Specialized text field — renders a textarea when `multiline` is set. */
	export default {
		name: 'TyTextField',

		inheritAttrs: false,

		props: {
			multiline: {
				type: Boolean,
				default: false
			}
		}
	};
</script>
