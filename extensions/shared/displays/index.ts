import { shallowRef, Ref } from 'vue';
import { DisplayConfig } from '@directus/shared/types';

const displaysRaw: Ref<DisplayConfig[]> = shallowRef([]);
const displays: Ref<DisplayConfig[]> = shallowRef([]);

displays.value = [{
	id: 'file',
	name: '$t:displays.file.file',
	description: '$t:displays.file.description',
	icon: 'insert_drive_file',
	component: null,
	types: ['uuid'],
	localTypes: ['file'],
	options: [],
	fields: ['id', 'type', 'title'],
}];

export function getDisplays(): { displays: Ref<DisplayConfig[]>; displaysRaw: Ref<DisplayConfig[]> } {
	return { displays, displaysRaw };
}

export function getDisplay(name?: string | null): DisplayConfig | undefined {
	return !name ? undefined : displays.value.find(({ id }) => id === name);
}
