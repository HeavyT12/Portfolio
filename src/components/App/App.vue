<template>
	<v-app class="ty-app">
		<v-app-bar app>
			<slot name="app-bar" />
		</v-app-bar>

		<v-main>
			<slot name="notification" />

			<TyContainer fluid>
				<slot />
			</TyContainer>
		</v-main>

		<v-footer>
			<slot name="footer" />
			<div class="app__footer text-caption text-center">
				Copyright &copy; {{ today.getFullYear() }} Tyson Farley
			</div>
		</v-footer>
	</v-app>
</template>

<script>
	import TyAnnouncementBar from 'AnnouncementBar/AnnouncementBar.vue';
	import TyContainer from "Container/Container.vue"

	export default {
		name: 'TyApp',

		components: {
			TyAnnouncementBar,
			TyContainer
		},

		computed: {
			today() {
				return new Date();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.ty-app {
		.app__footer {
			width: 100%;
		}
	}
</style>
