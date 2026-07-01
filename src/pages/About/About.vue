<template>
	<div class="about mx-auto">
		<h1 class="about__heading text-h4 mb-6">
			About Me
		</h1>

		<p class="text-body-1 mb-4">
			Hi, I'm Tyson Farley — a software engineer who has spent the last several
			years building full-stack web applications, from JavaScript and PHP
			front-ends to Java and Spring back-end services. Lately my focus has been
			on the data and AI side: SQL dialect translation, vector databases, and
			the services that power AI features.
		</p>

		<p class="text-body-1 mb-4">
			I care about clean, maintainable code and products that genuinely help the
			people who use them. The timeline on the home page walks through the
			milestones of my career so far. Please browse at your leisure!
		</p>
	</div>
</template>

<script>
	export default {
		name: 'About'
	};
</script>

<style lang="scss" scoped>
	.about {
		max-width: 720px;
		padding-top: 1rem;
	}
</style>
