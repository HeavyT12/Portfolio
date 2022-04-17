<template>
	<v-snackbar
		v-bind="$attrs"
		class="ty-alert-snackbar"
		top
		v-on="$listeners"
	>
		<template v-for="(alert, n) in alerts">
			<div :key="n">
				{{ alert }}
			</div>
		</template>
	</v-snackbar>
</template>

<script>
	export default {
		name: 'TyAlertSnackBar',

		props: {
			/** The list of alerts to display. */
			alerts: {
				type: Array,
				default: () => [],
				validator: (alerts) =>
					alerts.every((alert) => typeof alert === 'string')
			},

			type: {
				type: String,
				required: true
			}
		}
	};
</script>
