import { getDirectusClient } from "$lib/directus-client";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
	const directus = await getDirectusClient();

  const services = await directus.items('services').readByQuery({
    fields: ['*']
  });

  const employees = await directus.items('employees').readByQuery({
    fields: ['*', 'account.first_name', 'account.last_name', 'services.services_id', 'workinghours.*']
  });

  return {
		body: {
      services: services.data,
      employees: employees.data
		}
	};
}

export const post: RequestHandler = async ({ request }) => {
	const formData = await request.formData();

  console.log('formData => ', formData);

  return {};
};