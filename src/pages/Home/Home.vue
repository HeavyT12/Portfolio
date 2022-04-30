<template>
	<TyApp
		class="ty-home"
		:announcements="announcements"
	>
		<template #app-bar>
			<TyImage
				src="../resource/logo.png"
				:max-width="$vuetify.breakpoint.mdAndUp ? 60 : 52"
			/>

			<div class="mx-2">
				Tyson Farley Portfolio &#8212; Home Page
			</div>
		</template>

		<StateFoodSafety />
		<Domo />
		<div class="text-center text-h4">
			Present
		</div>
	</TyApp>
</template>

<script>
	import Domo from "Period/Domo/Domo.vue";
	import StateFoodSafety from "Period/StateFoodSafety/StateFoodSafety.vue";
	import TyApp from "App/App.vue";
	import TyButton from "Button/Button.vue";
	import TyImage from "Image/Image.vue";
	import TyLoadingMask from "Loading/Mask.vue";

	import { mapState } from "vuex";

	export default {
		name: "Home",

		components: {
			StateFoodSafety,
			Domo,
			TyApp,
			TyButton,
			TyImage,
			TyLoadingMask
		},

		computed: {
			...mapState("System", ["announcements"]),
		},
	};
</script>
