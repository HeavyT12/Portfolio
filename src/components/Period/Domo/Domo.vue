<template>
	<TyTimeline
		v-bind="$attrs"
		class="domo"
		title="Domo"
		website="https://www.domo.com"
		:colors="colors"
		v-on="$listeners"
	>
		<TyTimelineItem
			:date="new Date('October 18, 2021')"
			title="Hired"
		>
			Domo's drive is to faciliate data literacy and provide decision-making capability to every level of business.
			Customers can pull all data sources into a single platform and discover business insights through data visualization.
			<br />
			Domo was my first exposure to using Java professionally.
			As popularly follows Java implementation, this was also my introduction to Spring.
			In contrast to StateFoodSafety, I work as a back-end engineer full time.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('May 26, 2022')"
			title="MDX Translation"
		>
			Started an ambitious project to leverage Domo's heavily-integrated relational database
			infrastructure to translate SQL statements into MDX (Multidimensionl Expressions) for
			the intent of pulling in data from OLAP cube data sources.
			Rule were set so that an SQL statement could become an MDX query,
			and then the MDX result set could be conversely interpreted as if it were as relational datasource.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('November 2022')"
			title="SQL Dialect Translation"
		>
			Having been exposed to Domo's query translation service,
			my efforts and insight were purposed towards implementing
			a translation service for a new partner's SQL engine dialect.
			This project would be more within the bounds of existing Domo infrastructure and
			very different from the MDX translation project earlier in the year,
			but still posed its own challenges due to limitations of the natively supported functions and data types.
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
