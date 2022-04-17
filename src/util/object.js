import {partial, has, every} from 'lodash-es';

export function hasOwnProperty(obj, ...properties) {
	return every(properties, partial(has, obj));
}