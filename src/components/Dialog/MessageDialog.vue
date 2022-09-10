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

		<div
			v-for="(message, n) in messages"
			:key="n"
		>
			{{ message }}
		</div>
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
