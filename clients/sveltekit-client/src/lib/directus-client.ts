
import { Directus } from '@directus/sdk';
import 'dotenv/config';
import type { MyCollections } from './directus-types';

const directusUrl = process.env.VITE_DIRECTUS_URL || 'http://localhost:8055';
let directus: Directus<MyCollections>;

async function getDirectusClient() {
	if (! directus) {
		directus = new Directus<MyCollections>(directusUrl, { auth: { staticToken: process.env.DIRECTUS_STATIC_TOKEN } });
		try {
			const me = await directus.users.me.read();
		} 
		catch (err: any) {
			if (err.parent?.code === 'ECONNREFUSED') {
				console.error(
					'Unable to connect to the Directus instance. Make sure the .env file is present and the VITE_DIRECTUS_URL variable is pointing the correct URL.'
				);
			}
		}
	}
	return directus;
}

export { getDirectusClient };