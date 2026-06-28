<template>
	<VueTurnstile
		ref="widget"
		class="ty-turnstile"
		:site-key="siteKey"
		:model-value="modelValue"
		theme="light"
		@update:model-value="$emit('update:modelValue', $event)"
	/>
</template>

<script>
	import VueTurnstile from 'vue-turnstile';

	/** Wraps the third-party Cloudflare Turnstile widget; the token is the v-model. */
	export default {
		name: 'TyTurnstile',

		inheritAttrs: false,

		components: {
			VueTurnstile
		},

		props: {
			modelValue: {
				type: String,
				default: ''
			}
		},

		emits: ['update:modelValue'],

		computed: {
			siteKey() {
				return import.meta.env.VITE_TURNSTILE_SITE_KEY;
			}
		},

		methods: {
			/** Clears the current token and re-renders for a fresh challenge. */
			reset() {
				this.$refs.widget?.reset?.();
			}
		}
	};
</script>
