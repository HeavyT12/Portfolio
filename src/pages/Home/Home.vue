<template>
	<TyApp
		class="ty-home"
		:announcements="announcements"
	>
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
				src="../resource/logo.png"
				:max-width="$vuetify.breakpoint.mdAndUp ? 60 : 52"
			/>

			<div class="mx-2">
				Tyson Farley Portfolio
			</div>

			<!--
			<div class="mx-2">
				Tyson Farley Portfolio &#8212; Home Page
			</div>
			-->
		</template>

		<PersonalHistory
			:dense="$vuetify.breakpoint.xs"
		/>
	</TyApp>
</template>

<script>
	import PersonalHistory from 'PersonalHistory/PersonalHistory.vue';
	import TyApp from 'App/App.vue';
	import TyImage from 'Image/Image.vue';
	import SystemNotificationHub from 'SystemNotificationHub/SystemNotificationHub.vue';

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
