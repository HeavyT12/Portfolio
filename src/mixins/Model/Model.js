export default {
	props: {
		modelValue: undefined
	},

	emits: ['update:modelValue', 'open', 'close'],

	data: () => ({
		localValue: undefined
	}),

	watch: {
		modelValue: {
			immediate: true,
			handler(value) {
				this.localValue = value;
			}
		},

		localValue(localValue) {
			this.$emit('update:modelValue', localValue);

			if (localValue) {
				this.$emit('open');
			} else {
				this.$emit('close');
			}
		}
	}
};
