export default {
	model: {
		prop: 'value',
		event: 'input'
	},

	props: {
		value: undefined
	},

	data: () => ({
		localValue: undefined
	}),

	watch: {
		value: {
			immediate: true,
			handler(value) {
				this.localValue = value;
			}
		},

		localValue(localValue) {
			this.$emit('input', localValue);
		}
	}
};
