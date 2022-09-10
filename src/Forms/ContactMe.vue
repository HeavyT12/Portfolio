<template>
	<TyForm class="form-contact-me">
		<TyFormGroup :validator="$v.form.name">
			<template #default="{ events, errorMessages }">
				<TyTextField
					v-model="form.name"
					label="Name"
					:error-messages="errorMessages"
					v-on="events"
				/>
			</template>
		</TyFormGroup>

		<TyFormGroup :validator="$v.form.email">
			<template #default="{ events, errorMessages }">
				<TyTextField
					v-model="form.email"
					label="Email Address"
					:error-messages="errorMessages"
					v-on="events"
				/>
			</template>
		</TyFormGroup>

		<TyFormGroup :validator="$v.form.message">
			<template #default="{ events, errorMessages }">
				<TyTextField
					v-model="form.message"
					multiline
					label="Message"
					:error-messages="errorMessages"
					v-on="events"
				/>
			</template>
		</TyFormGroup>

		<TyRecaptcha />

		<TyButton>Submit</TyButton>
	</TyForm>
</template>

<script>
	import TyButton from 'Button/Button.vue';
	import TyForm from 'Form/Form.vue';
	import TyFormGroup from 'FormGroup/FormGroup.vue';
	import TyRecaptcha from 'Recaptcha/Recaptcha.vue';
	import TyTextField from 'TextField/TextField.vue';

	import { required, email } from 'vuelidate/lib/validators';

	export default {
		name: 'FormContactMe',

		inheritAttrs: false,

		components: {
			TyButton,
			TyForm,
			TyFormGroup,
			TyRecaptcha,
			TyTextField
		},

		data: () => ({
			form: {
				name: '',
				email: '',
				message: ''
			}
		}),

		validations: {
			form: {
				name: {
					required
				},
				email: {
					required,
					email
				},
				message: {
					required
				}
			}
		}
	};
</script>
