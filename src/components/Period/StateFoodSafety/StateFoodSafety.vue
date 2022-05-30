<template>
	<TyTimeline
		v-bind="$attrs"
		class="statefoodsafety"
		title="StateFoodSafety"
		:colors="colors"
		v-on="$listeners"
	>
		<TyTimelineItem
			:date="new Date('January 22, 2018')"
			title="Hired"
		/>
		<TyTimelineItem
			:date="new Date('November 2018')"
			title="Vue Implementation"
		/>
		<TyTimelineItem
			:date="new Date('December 2018')"
			title="My Group Purchases"
		/>
		<TyTimelineItem
			:date="new Date('July 2019')"
			title="Compliance Manager"
		/>
		<TyTimelineItem
			:date="new Date('December 2019')"
			title="Graduated from College"
		/>
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
