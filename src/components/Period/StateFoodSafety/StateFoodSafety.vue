<template>
	<TyTimeline
		v-bind="$attrs"
		class="statefoodsafety"
		title="StateFoodSafety"
		website="https://www.statefoodsafety.com"
		:colors="colors"
		v-on="$listeners"
	>
		<TyTimelineItem
			:date="new Date('January 22, 2018')"
			title="Hired"
		>
			StateFoodSafety's focus is to provide online food safety education.
			End users can purchase Food Handler, Food Manager, Food Allergy Awareness,
			and Alcohol Server/Seller certification training.
			After which, they can view the online course at their leisure and take the
			final test from the comfort of their own home.
			<br>
			StateFoodSafety's website utilizes a JavaScript front-end and a PHP back-end.
			This was my first developer job, and I had no previous experience with either.
			Thanks to hard work, determination, and especially incredible coworkers,
			I quickly came up to speed on StateFoodSafety's tech stack.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('November 2018')"
			title="Vue Implementation"
		>
			The development team started transitioning the front-end to Vue around this time.
			This was a time of discovery for my team and me as we explored the new capabilities Vue provided.
			My Group Purchases, a certification education and management tool, was the first app converted to the new framework.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('July 2019')"
			title="Compliance Manager"
		>
			A new applet built from the ground up with its front-end entirely in Vue.
			The Compliance Manager started as a tool to streamline an establishment's education and certification.
			It later grew to accommodate health inspectors, so they could manage various establishments within their jurisdiction,
			as well as corporate organizations, so they could monitor multiple locations.
			I contributed largely to the front-end, pioneering various Vue components,
			and to the back-end, building out the supporting database and APIs behind it.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('December 2019')"
			title="Graduated UVU"
		>
			Funded by a full tuition scholarship,
			I graduated Magna Cum Laude with a Computer Science Bachelor's degree and Spanish minor from
			<TyLink href="https://www.uvu.edu">Utah Valley University</TyLink>.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('March 2020')"
			title="Quarantine"
		>
			Transitioned to work from home due to the COVID-19 pandemic.
		</TyTimelineItem>
		<TyTimelineItem
			:date="new Date('March 2021')"
			title="TPC Training Acquisition"
		>
			Company owners retired and sold StateFoodSafety.
			<TyLink href="https://www.tpctraining.com">TPC Training</TyLink> is a business comprised of online education subsidiaries.
			Several months after purchasing StateFoodSafety, TPC took ownership of <TyLink href="https://www.efoodhandlers.com">eFoodHandlers</TyLink> and
			thus entered with a strong presence into the food handling certification market.
		</TyTimelineItem>
	</TyTimeline>
</template>

<script>
	import TyLink from 'Link/Link.vue';
	import TyTimeline from 'Timeline/Timeline.vue';
	import TyTimelineItem from 'Timeline/TimelineItem.vue';

	export default {
		name: 'StateFoodSafety',

		inheritAttrs: false,

		components: {
			TyLink,
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
