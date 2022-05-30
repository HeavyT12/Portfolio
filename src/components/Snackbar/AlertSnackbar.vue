<template>
	<TySnackBar
		v-bind="$attrs"
		class="ty-alert-snackbar"
		top
		min-width="auto"
		:color="colorToUse"
		:icon="iconToUse"
		v-on="$listeners"
	>
		<template v-for="(alert, n) in alerts">
			<div :key="n">
				{{ alert }}
			</div>
		</template>
	</TySnackBar>
</template>

<script>
	import NotificationFactory from 'mixins/Notification/Notification.js';

	import TySnackBar from 'Snackbar/Snackbar.vue';

	export default {
		name: 'TyAlertSnackBar',

		inheritAttrs: false,

		mixins: [NotificationFactory('alerts')],

		components: {
			TySnackBar
		}
	};
</script>
