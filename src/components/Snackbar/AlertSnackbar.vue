<template>
	<TySnackBar
		v-bind="$attrs"
		class="ty-alert-snackbar"
		location="top"
		min-width="auto"
		:color="colorToUse"
		:icon="iconToUse"
	>
		<div
			v-for="(alert, n) in alerts"
			:key="n"
		>
			{{ alert }}
		</div>
	</TySnackBar>
</template>

<script>
	import NotificationFactory from '@/mixins/Notification/Notification.js';

	import TySnackBar from '@/components/Snackbar/Snackbar.vue';

	export default {
		name: 'TyAlertSnackBar',

		inheritAttrs: false,

		mixins: [NotificationFactory('alerts')],

		components: {
			TySnackBar
		}
	};
</script>
