import { getDirectusClient } from "$lib/directus-client";
import type { Employee } from "$lib/directus-types";
import type { PartialItem } from "@directus/sdk";
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ url }) => {
  const directus = await getDirectusClient();

  console.log('params => ', url.searchParams);

  const serviceId = parseInt(url.searchParams.get('service') || '');

  // Get employees and working hours
  const employeeId = parseInt(url.searchParams.get('employee') || '');
  const employeeFilter: any = {
    services: {
      services_id: {
        _eq: serviceId
      }
    }
  };
  const employeeFields = ['id', 'workinghours.*'];
  const employees = employeeId > 0
    ? await directus.items('employees').readMany([employeeId], { fields: employeeFields })
    : await directus.items('employees').readByQuery({ fields: employeeFields, filter: employeeFilter });

  console.log('Employees => ', employees.data);

  // Get current appointments for date and employees
  const appointmentDate = url.searchParams.get('appointmentDate');
  const appointmentsFilter: any = {
    startDateTime: {
      _between: [
        appointmentDate,
        appointmentDate,
      ]
    },
    service: {
      _eq: serviceId
    }
  };
  const appointments = await directus.items('appointments').readByQuery({ filter: appointmentsFilter })

  console.log('Appointments => ', appointments.data);

  let slots: any = [];

  return {
    body: {
      slots: slots
    }
  };
}