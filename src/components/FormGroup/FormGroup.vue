<template>
	<div class="ty-form-group">
		<slot
			:attributes="attributes"
			:errorMessages="activeErrorMessages"
			:errors="activeErrors"
			:events="events"
			:first-error-message="firstErrorMessage"
			:has-errors="hasErrors"
			:validator="preferredValidator"
		/>
	</div>
</template>

<script>
	import { singleErrorExtractorMixin } from 'vuelidate-error-extractor'

	export default {
		name: 'TyFormGroup',

		mixins: [singleErrorExtractorMixin]
	}
</script>
