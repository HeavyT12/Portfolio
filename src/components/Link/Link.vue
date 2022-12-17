<template>
	<a
		v-bind="$attrs"
		class="ty-link"
		:href="href"
		:target="target"
		v-on="$listeners"
	>
		<slot />
	</a>
</template>

<script>
	/** Specialized link component. */
	export default {
		name: 'TyLink',

		inheritAttrs: false,

		props: {
			href: {
				type: String,
				required: true
			},

			target: {
				type: String,
				default: '_self'
			}
		}
	};
</script>
