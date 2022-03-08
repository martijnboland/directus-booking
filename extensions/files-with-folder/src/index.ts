import { defineInterface } from '@directus/extensions-sdk';
import InterfaceFiles from './files.vue';

export default defineInterface({
	id: 'files-with-folder',
	name: 'Files with folder',
	description: 'Directus files interface with added folder selection',
	icon: 'note_add',
	component: InterfaceFiles,
	relational: true,
	types: ['alias'],
	localTypes: ['files'],
	group: 'relational',
	options: ({ relations }) => {
		return [
			{
				field: 'folder',
				name: '$t:interfaces.system-folder.folder',
				type: 'uuid',
				meta: {
					width: 'full',
					interface: 'system-folder',
					note: '$t:interfaces.system-folder.field_hint',
				},
				schema: {
					default_value: undefined,
				},
			},
			{
				field: 'template',
				name: '$t:display_template',
				meta: {
					interface: 'system-display-template',
					options: {
						collectionName: relations.o2m?.collection,
					},
				},
			},
			{
				field: 'enableCreate',
				name: '$t:creating_items',
				schema: {
					default_value: true,
				},
				meta: {
					interface: 'boolean',
					options: {
						label: '$t:enable_create_button',
					},
					width: 'half',
				},
			},
			{
				field: 'enableSelect',
				name: '$t:selecting_items',
				schema: {
					default_value: true,
				},
				meta: {
					interface: 'boolean',
					options: {
						label: '$t:enable_select_button',
					},
					width: 'half',
				},
			},
		];
	},
	recommendedDisplays: ['related-values']
});
