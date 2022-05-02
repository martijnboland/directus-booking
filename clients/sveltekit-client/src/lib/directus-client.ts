
import { Directus } from '@directus/sdk';
import 'dotenv/config';

const directusUrl = process.env.VITE_DIRECTUS_URL || 'http://localhost:8055';
const directus = new Directus(directusUrl);

async function getDirectusClient() {
	if (directus.auth.token) return directus;

	try {
    if (process.env.DIRECTUS_STATIC_TOKEN) {
			await directus.auth.static(process.env.DIRECTUS_STATIC_TOKEN);
		}
	} catch (err: any) {
		if (err.parent?.code === 'ECONNREFUSED') {
			console.error(
				'Unable to connect to the Directus instance. Make sure the .env file is present and the VITE_DIRECTUS_URL variable is pointing the correct URL.'
			);
		}
	}

	return directus;
}

export { getDirectusClient };