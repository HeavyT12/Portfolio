<template>
	<PersonalHistory
		:dense="$vuetify.display.xs"
	/>
</template>

<script>
	import PersonalHistory from '@/components/PersonalHistory/PersonalHistory.vue';

	export default {
		name: 'Home',

		components: {
			PersonalHistory
		}
	};
</script>
