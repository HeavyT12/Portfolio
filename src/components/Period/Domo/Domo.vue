<template>
	<TyTimeline
		v-bind="$attrs"
		class="domo"
		title="Domo"
		:colors="colors"
		v-on="$listeners"
	>
		<TyTimelineItem date="October 18, 2021">
			Hired
		</TyTimelineItem>
	</TyTimeline>
</template>

<script>
	import TyTimeline from 'Timeline/Timeline.vue';
	import TyTimelineItem from 'Timeline/TimelineItem.vue';

	export default {
		name: 'Domo',

		inheritAttrs: false,

		components: {
			TyTimeline,
			TyTimelineItem
		},

		data: () => ({
			colors: [
				'rgb(153, 204, 238)',
				'rgb(255, 255, 255)'
			]
		})
	};
</script>
