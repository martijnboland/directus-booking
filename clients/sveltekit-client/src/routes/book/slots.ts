import { getDirectusClient } from "$lib/directus-client";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ url }) => {
	const directus = await getDirectusClient();

  console.log('params => ', url.searchParams);

  let slots: any = [];

  return {
		body: {
      slots: slots
		}
	};
}