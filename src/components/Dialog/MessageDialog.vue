<template>
	<TyDialog
		v-bind="$attrs"
		class="ty-message-dialog"
		:color="colorToUse"
		:icon="iconToUse"
		:title="titleToUse"
		v-on="$listeners"
	>
		<template #activator="activatorProps">
			<slot
				name="activator"
				v-bind="activatorProps"
			/>
		</template>

		<template v-for="(message, n) in messages">
			<div :key="n">
				{{ message }}
			</div>
		</template>
	</TyDialog>
</template>

<script>
	import NotificationFactory from 'mixins/Notification/Notification.js';

	import TyDialog from 'Dialog/Dialog.vue';

	export default {
		name: 'TyMessageDialog',

		inheritAttrs: false,

		mixins: [NotificationFactory('messages')],

		components: {
			TyDialog
		}
	};
</script>
