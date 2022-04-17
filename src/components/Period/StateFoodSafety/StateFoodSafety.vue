<template>
	<TyTimeline
		v-bind="$attrs"
		class="statefoodsafety"
		title="StateFoodSafety"
		:colors="colors"
		v-on="$listeners"
	>
		<TyTimelineItem date="January 22, 2018">
			Hired
		</TyTimelineItem>
		<TyTimelineItem date="November 2018">
			Start of Vue implementation
		</TyTimelineItem>
		<TyTimelineItem date="July 2019">
			Compliance Manager started
		</TyTimelineItem>
		<TyTimelineItem date="December 2019">
			Graduated from Utah Valley University
		</TyTimelineItem>
	</TyTimeline>
</template>

<script>
	import TyTimeline from 'Timeline/Timeline.vue';
	import TyTimelineItem from 'Timeline/TimelineItem.vue';

	export default {
		name: 'StateFoodSafety',

		inheritAttrs: false,

		components: {
			TyTimeline,
			TyTimelineItem
		},

		data: () => ({
			colors: [
				'rgb(242, 8, 8)',
				'rgb(3, 117, 163)',
				'rgb(147, 74, 156)',
				'rgb(55, 190, 237)'
			]
		})
	};
</script>
