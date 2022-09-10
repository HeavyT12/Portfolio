<template>
	<component
		:is="component"
		v-bind="$attrs"
		class="ty-text-field"
		v-on="$listeners"
	>
		<slot />
	</component>
</template>

<script>
	import VTextField from 'vuetify/lib/components/VTextField/VTextField.js';
	import VTextarea from 'vuetify/lib/components/VTextarea/VTextarea.js';

	/** Specialized text field component. */
	export default {
		name: 'TyTextField',

		inheritAttrs: false,

		props: {
			multiline: {
				type: Boolean,
				default: false
			}
		},

		computed: {
			component() {
				return this.multiline ? VTextarea : VTextField;
			}
		}
	};
</script>
