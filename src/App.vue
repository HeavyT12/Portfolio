<template>
	<TyApp class="ty-home">
		<template #notification>
			<SystemNotificationHub
				show-announcements
				show-success-alerts
				show-info-alerts
				show-warning-alerts
				show-error-alerts
				show-success-messages
				show-info-messages
				show-warning-messages
				show-error-messages
			/>
		</template>

		<template #app-bar>
			<router-link
				class="app-bar__brand d-flex align-center"
				:to="{ name: 'home' }"
			>
				<TyImage
					src="resource/logo.png"
					:max-width="$vuetify.display.mdAndUp ? 60 : 52"
				/>

				<div class="mx-2">
					Tyson Farley Portfolio
				</div>
			</router-link>

			<TyButton
				icon="mdi-home"
				icon-placement="start"
				variant="text"
				:to="{ name: 'home' }"
			>
				Home
			</TyButton>

			<TyButton
				icon="mdi-account"
				icon-placement="start"
				variant="text"
				:to="{ name: 'about' }"
			>
				About
			</TyButton>

			<v-spacer />

			<TyButton
				icon="mdi-email"
				icon-placement="start"
				@click="contactOpen = true"
			>
				Contact
			</TyButton>

			<TyDialog
				v-model="contactOpen"
				title="Contact Me"
				:closable="true"
			>
				<ContactMe
					ref="contact"
					@sent="contactOpen = false"
					@update:loading="contactLoading = $event"
				/>

				<template #actions>
					<TyButton
						:disabled="contactLoading"
						@click="contactOpen = false"
					>
						Close
					</TyButton>
					<TyButton
						color="primary"
						:loading="contactLoading"
						:disabled="contactLoading"
						@click="$refs.contact.submit()"
					>
						Submit
					</TyButton>
				</template>
			</TyDialog>
		</template>

		<router-view />
	</TyApp>
</template>

<script>
	import TyApp from '@/components/App/App.vue';
	import TyImage from '@/components/Image/Image.vue';
	import SystemNotificationHub from '@/components/SystemNotificationHub/SystemNotificationHub.vue';
	import TyButton from '@/components/Button/Button.vue';
	import TyDialog from '@/components/Dialog/Dialog.vue';
	import ContactMe from '@/Forms/ContactMe.vue';

	export default {
		name: 'App',

		components: {
			TyApp,
			TyImage,
			SystemNotificationHub,
			TyButton,
			TyDialog,
			ContactMe
		},

		data: () => ({
			contactOpen: false,
			contactLoading: false
		})
	};
</script>

<style lang="scss" scoped>
	.app-bar__brand {
		color: inherit;
		text-decoration: none;
	}
</style>
