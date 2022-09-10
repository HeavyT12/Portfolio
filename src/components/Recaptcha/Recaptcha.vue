<template>
	<div class="ty-recaptcha">
		<div v-if="hidden">
			This site is protected by reCAPTCHA and the Google
			<a href="https://policies.google.com/privacy">Privacy Policy</a> and
			<a href="https://policies.google.com/terms">Terms of Service</a> apply.
		</div>

		<VueRecaptcha
			class="ty-recaptcha__component"
			:class="componentClasses"
			:size="size"
			:key="key"
			load-recaptcha-script
			sitekey="6LeZ9i8gAAAAADBsIyEO7Frj6IrNTDNgzwhs25xJ"
		/>
	</div>
</template>

<script>
	import VueRecaptcha from 'vue-recaptcha';

	export default {
		name: 'TyRecaptcha',

		inheritAttrs: false,

		components: {
			VueRecaptcha
		},

		data: () => ({
			key: 0
		}),

		props: {
			invisible: {
				type: Boolean,
				default: false
			},

			compact: {
				type: Boolean,
				default: false
			},

			hidden: {
				type: Boolean,
				default: false
			}
		},

		computed: {
			componentClasses() {
				return {
					'ty-recaptcha__component--hidden': this.hidden,
					'ty-recaptcha__component--invisible': this.invisible
				}
			},

			size() {
				if (this.invisible || this.hidden) {
					return 'invisible';
				} else if (this.compact) {
					return 'compact'
				}

				return 'normal'
			}
		},

		watch: {
			size: {
				handler() {
					this.key = ++this.key % 2;
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ty-recaptcha {
		.ty-recaptcha__component {
			&.ty-recaptcha__component--hidden {
				visibility: hidden;
			}

			&.ty-recaptcha__component--invisible {
				::v-deep .grecaptcha-badge {
					z-index: 1;
				}
			}
		}
	}
</style>
