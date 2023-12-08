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
			Rules were set so that an SQL statement could become an MDX query,
			and then the MDX result set could be conversely interpreted as if it were a relational datasource.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('November 2022')"
			title="Dremio SQL Dialect Translation"
		>
			Having been exposed to Domo's query translation service,
			my efforts and insight were purposed towards implementing
			a translation service for a new partner's SQL engine dialect, Dremio.
			This project would be more within the bounds of existing Domo infrastructure and
			very different from the MDX translation project earlier in the year,
			but still posed its own challenges due to limitations of the natively supported
			functions within both Dremio and Domo and their data types.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('February 2023')"
			title="Databricks SQL Dialect Translation"
		>
			Much like the Dremio translation before it,
			I implemented support for a new cloud integration Databricks.
			I was able to leverage the insight, knowledge, and pitfalls I had learned with Dremio
			and quickly build out the Databricks offering to be production ready in a few months.
			Additionally, there were discoveries with the Databricks integration that helped refine
			the Dremio integration, as well.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('April 2023')"
			title="AI Services"
		>
			A new type of project was being worked on as my cloud integration work was coming to a close.
			Insightful coworkers of mine saw early on the promise of building out an AI model offering to not only integrate
			large language model capabilities into the Domo platform, but also allow customers to develop, train,
			and manage their own models to provide further insights into their data.
			<br />
			With a solid foundation of model management built out to allow configuring which models were used for which tasks,
			I was able to build out our first three AI services that other teams
			within Domo as well as end users would go on to build on top of.
			<br />
			Text Generation allowed direct communication with the underlying model for autocompletion or to answer questions.
			<br />
			Text-to-SQL allowed the user to ask a natural language question to the model about their dataset.
			The response would return a validated SQL query that could optionally be executed.
			<br />
			Text-to-BeastMode behaved much like the Text-to-SQL service, but instead returned a Domo
			<TyLink href="https://domo-support.domo.com/s/article/360043429933?language=en_US">Beast Mode</TyLink>,
			a kind of dataset calculation.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('July 2023')"
			title="Vector Database"
		>
			With the advent of the AI boom and the wave Domo was riding already,
			it became apparent there was a need to support unstructured data.
			After rounding out the first few AI services Domo would offer,
			I proceeded to build out the interface for communicating with a vector database.
			This would go on to be the building blocks for running a semantic search
			on the Domo knowledge base and a customer's datasets,
			which would also support the budding Domo AI Assistant.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('October 2023')"
			title="ML Management"
		>
			At this time, the majority of my effort was then spent on the machine learning model management side
			to help build additional connectors for supporting various types of ML model sources.
		</TyTimelineItem>
	</TyTimeline>
</template>

<script>
	import TyTimeline from 'Timeline/Timeline.vue';
	import TyTimelineItem from 'Timeline/TimelineItem.vue';
	import TyLink from 'Link/Link.vue';

	export default {
		name: 'Domo',

		inheritAttrs: false,

		components: {
			TyTimeline,
			TyTimelineItem,
			TyLink
		},

		data: () => ({
			colors: [
				'rgb(153, 204, 238)',
				'rgb(255, 255, 255)'
			]
		})
	};
</script>
