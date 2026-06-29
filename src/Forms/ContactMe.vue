<template>
	<v-form
		ref="form"
		class="form-contact-me"
		@submit.prevent="submit"
	>
		<TyTextField
			v-model="form.name"
			label="Name"
			:rules="nameRules"
			:disabled="loading"
		/>

		<TyTextField
			v-model="form.email"
			label="Email Address"
			:rules="emailRules"
			:disabled="loading"
		/>

		<TyTextField
			v-model="form.message"
			multiline
			label="Message"
			:rules="messageRules"
			:disabled="loading"
		/>

		<TyTurnstile
			ref="turnstile"
			v-model="token"
		/>
	</v-form>
</template>

<script>
	import { mapActions } from 'pinia';

	import { useSystemStore } from '@/stores/system.js';

	import TyTextField from '@/components/TextField/TextField.vue';
	import TyTurnstile from '@/components/Turnstile/Turnstile.vue';

	const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;
	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	export default {
		name: 'FormContactMe',

		inheritAttrs: false,

		components: {
			TyTextField,
			TyTurnstile
		},

		emits: ['sent', 'update:loading'],

		data: () => ({
			form: {
				name: '',
				email: '',
				message: ''
			},
			token: '',
			loading: false,
			nameRules: [
				value => !!(value && value.trim()) || 'Name is required.'
			],
			emailRules: [
				value => !!(value && value.trim()) || 'Email is required.',
				value => EMAIL_RE.test(value) || 'Please enter a valid email.'
			],
			messageRules: [
				value => !!(value && value.trim()) || 'Message is required.'
			]
		}),

		watch: {
			// Surface submit progress so the dialog's action button can show it.
			loading(value) {
				this.$emit('update:loading', value);
			}
		},

		methods: {
			...mapActions(useSystemStore, ['addAlert']),

			async submit() {
				const { valid } = await this.$refs.form.validate();

				if (!valid) {
					return;
				}

				if (!this.token) {
					this.addAlert({ text: 'Please complete the bot check.', type: 'warning' });
					return;
				}

				this.loading = true;

				try {
					const response = await fetch(ENDPOINT, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ ...this.form, token: this.token })
					});

					const body = await response.json().catch(() => ({}));

					if (!response.ok || !body.ok) {
						throw new Error(body.error || 'Request failed.');
					}

					this.addAlert({ text: 'Message sent — thanks for reaching out!', type: 'success' });
					this.reset();
					this.$emit('sent');
				} catch (error) {
					this.addAlert({
						text: error.message || 'Could not send your message. Please try again.',
						type: 'error'
					});
				} finally {
					this.loading = false;
				}
			},

			reset() {
				this.form = { name: '', email: '', message: '' };
				this.token = '';
				this.$refs.form?.resetValidation?.();
				this.$refs.turnstile?.reset?.();
			}
		}
	};
</script>
