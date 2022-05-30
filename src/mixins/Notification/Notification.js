export const TYPE_SUCCESS = 'success';
export const TYPE_INFO = 'info';
export const TYPE_WARNING = 'warning';
export const TYPE_ERROR = 'error';

const VALID_TYPES = [
	TYPE_SUCCESS,
	TYPE_INFO,
	TYPE_WARNING,
	TYPE_ERROR
];

export const ICON_MAP = {
	[TYPE_SUCCESS]: 'check_circle',
	[TYPE_INFO]: 'info',
	[TYPE_WARNING]: 'warning',
	[TYPE_ERROR]: 'error'
};

export const TITLE_MAP = {
	[TYPE_SUCCESS]: 'Success',
	[TYPE_INFO]: 'Info',
	[TYPE_WARNING]: 'Warning',
	[TYPE_ERROR]: 'Error'
};

export const COLOR_MAP = Object.fromEntries(VALID_TYPES.map(type => [type, type]));

export default function(notificationType) {
	return {
		props: {
			[notificationType]: {
				type: Array,
				default: () => [],
				validator: notifications =>
					notifications.every(notification => typeof notification === 'string')
			},

			color: {
				type: String,
				default: undefined
			},

			icon: {
				type: String,
				default: undefined
			},

			title: {
				type: String,
				default: undefined
			},

			type: {
				type: String,
				required: true,
				validator: type => VALID_TYPES.includes(type)
			}
		},

		computed: {
			colorToUse() {
				return this.color || COLOR_MAP[this.type];
			},

			iconToUse() {
				return this.icon || ICON_MAP[this.type];
			},

			titleToUse() {
				return this.title || TITLE_MAP[this.type];
			}
		}
	};
};
