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
			<TyImage
				src="resource/logo.png"
				:max-width="$vuetify.display.mdAndUp ? 60 : 52"
			/>

			<div class="mx-2">
				Tyson Farley Portfolio
			</div>

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
			>
				<ContactMe @sent="contactOpen = false" />
			</TyDialog>
		</template>

		<PersonalHistory
			:dense="$vuetify.display.xs"
		/>
	</TyApp>
</template>

<script>
	import PersonalHistory from '@/components/PersonalHistory/PersonalHistory.vue';
	import TyApp from '@/components/App/App.vue';
	import TyImage from '@/components/Image/Image.vue';
	import SystemNotificationHub from '@/components/SystemNotificationHub/SystemNotificationHub.vue';
	import TyButton from '@/components/Button/Button.vue';
	import TyDialog from '@/components/Dialog/Dialog.vue';
	import ContactMe from '@/Forms/ContactMe.vue';

	export default {
		name: 'Home',

		components: {
			PersonalHistory,
			TyApp,
			TyImage,
			SystemNotificationHub,
			TyButton,
			TyDialog,
			ContactMe
		},

		data: () => ({
			contactOpen: false
		})
	};
</script>
