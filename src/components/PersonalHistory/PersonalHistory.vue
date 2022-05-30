<template>
	<div class="personal-history">
		<StateFoodSafety :dense="dense" />
		<Domo :dense="dense" />
		<div
			class="text-h4"
			:class="presentClasses"
		>
			Present
		</div>
	</div>
</template>

<script>
	import Domo from 'Period/Domo/Domo.vue';
	import StateFoodSafety from 'Period/StateFoodSafety/StateFoodSafety.vue';

	export default {
		name: 'PersonalHistory',

		inheritAttrs: false,

		components: {
			StateFoodSafety,
			Domo,
		},

		props: {
			dense: {
				type: Boolean,
				default: false
			}
		},

		computed: {
			presentClasses() {
				return {
					'text-center': !this.dense
				};
			}
		}
	};
</script>
