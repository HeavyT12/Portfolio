<template>
	<v-dialog
		v-model="localValue"
		v-bind="$attrs"
		class="ty-dialog"
		content-class="ty-dialog-content"
		:max-width="maxWidth"
	>
		<template #activator="activatorProps">
			<slot
				name="activator"
				v-bind="activatorProps"
			/>
		</template>

		<v-card>
			<template v-if="title || $slots.title">
				<v-card-title class="d-flex align-center">
					<span
						v-if="icon || $slots.icon"
						class="pr-2 d-flex"
					>
						<slot name="icon">
							<v-icon
								v-if="icon"
								:icon="icon"
								:color="color"
							/>
						</slot>
					</span>
					<slot name="title">
						{{ title }}
					</slot>

					<template v-if="closable">
						<v-spacer />

						<TyButton
							icon="mdi-close"
							@click="localValue = false"
						/>
					</template>
				</v-card-title>

				<v-divider />
			</template>

			<v-card-text class="pa-5">
				<slot />
			</v-card-text>

			<template v-if="closable || $slots.actions">
				<v-divider />

				<v-card-actions>
					<v-spacer />

					<slot name="actions" />

					<TyButton
						v-if="typeof closable == 'string'"
						@click="localValue = false"
					>
						{{ closable }}
					</TyButton>
				</v-card-actions>
			</template>
		</v-card>
	</v-dialog>
</template>

<script>
	import Model from '@/mixins/Model/Model.js';

	import TyButton from '@/components/Button/Button.vue';

	/** Specialized dialog component. */
	export default {
		name: 'TyDialog',

		inheritAttrs: false,

		mixins: [Model],

		components: {
			TyButton
		},

		props: {
			color: {
				type: String,
				default: undefined
			},

			closable: {
				type: [Boolean, String],
				default: "Close"
			},

			icon: {
				type: String,
				default: ''
			},

			maxWidth: {
				type: [Number, String],
				default: 600
			},

			minHeight: {
				type: [Number, String],
				default: 300
			},

			title: {
				type: String,
				default: ''
			}
		}
	};
</script>
