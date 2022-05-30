<template>
	<v-dialog
		v-model="localValue"
		v-bind="$attrs"
		class="ty-dialog"
		content-class="ty-dialog-content"
		:max-width="maxWidth"
		v-on="$listeners"
	>
		<template #activator="activatorProps">
			<slot
				name="activator"
				v-bind="activatorProps"
			/>
		</template>

		<v-card>
			<template v-if="title || $scopedSlots.title">
				<v-card-title>
					<span
						v-if="icon || $scopedSlots.icon"
						class="pr-2 d-flex"
					>
						<slot name="icon">
							<v-icon
								v-if="icon"
								:color="color"
							>
								{{ icon }}
							</v-icon>
						</slot>
					</span>
					<slot name="title">
						{{ title }}
					</slot>

					<template v-if=closable>
						<v-spacer />

						<TyButton
							icon="close"
							@click="localValue = false"
						/>
					</template>
				</v-card-title>

				<v-divider />
			</template>

			<v-card-text class="pa-5 black--text">
				<slot />
			</v-card-text>

			<template v-if="closable || $scopedSlots.actions">
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
	import Model from 'mixins/Model/Model.js';

	import TyButton from 'Button/Button.vue';

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
