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

	export default {
		name: 'Home',

		components: {
			PersonalHistory,
			TyApp,
			TyImage,
			SystemNotificationHub
		}
	};
</script>
