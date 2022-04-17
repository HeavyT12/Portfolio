<template>
	<v-app class="app">
		<v-app-bar app>
			<slot name="app-bar" />
		</v-app-bar>

		<v-main>
			<TyAnnouncementBar :announcements="announcements" />

			<v-container fluid>
				<slot />
			</v-container>
		</v-main>

		<v-footer app>
			<slot name="footer" />
			<div class="app__footer text-caption text-center">
				Copyright &copy; {{ today.getFullYear() }} Tyson Farley
			</div>
		</v-footer>
	</v-app>
</template>

<script>
	import TyAnnouncementBar from 'AnnouncementBar/AnnouncementBar.vue';

	export default {
		name: 'TyApp',

		components: {
			TyAnnouncementBar
		},

		props: {
			announcements: {
				type: Array,
				default: () => []
			}
		},

		computed: {
			today() {
				return new Date();
			}
		}
	};
</script>

<style lang="scss" scoped>
	.app {
		.app__footer {
			width: 100%;
		}
	}
</style>
