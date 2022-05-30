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
				Tyson Farley Portfolio &#8212; Home Page
			</div>
		</template>

		<TyButton @click="adder('success')">success</TyButton>
		<TyButton @click="adder('error')">error</TyButton>
		<TyButton @click="adder('info')">info</TyButton>
		<TyButton @click="adder('warning')">warning</TyButton>

		<PersonalHistory :dense="$vuetify.breakpoint.xs" />
	</TyApp>
</template>

<script>
	import PersonalHistory from 'PersonalHistory/PersonalHistory.vue';
	import TyApp from 'App/App.vue';
	import TyButton from 'Button/Button.vue';
	import TyIcon from 'Icon/Icon.vue';
	import TyImage from 'Image/Image.vue';
	import SystemNotificationHub from 'SystemNotificationHub/SystemNotificationHub.vue';

	import { mapMutations } from 'vuex';

	export default {
		name: 'Home',

		components: {
			PersonalHistory,
			TyApp,
			TyButton,
			TyIcon,
			TyImage,
			SystemNotificationHub
		},

		data: () => ({
			snack: false
		}),

		methods: {
			...mapMutations('System', [
				'addAlert',
				'addAnnouncement',
				'addMessage'
			]),

			adder(type) {
				this.addAlert({ type, text: type });
				this.addMessage({ type, text: type });
				this.addAnnouncement({ type, text: type });
			}
		}
	};
</script>
