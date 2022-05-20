<script lang="ts">
  import type { Appointment, Employee, Service } from "$lib/directus-types";
  import type { PartialItem } from "@directus/sdk";

  export let services: Service[];
  export let employees: Employee[];

  $: employeesForService = appointment.service
    ? employees.filter(e => e.services.some(s => s.services_id === appointment.service))
    : []

  let appointment: PartialItem<Appointment> = {}

  let appointmentDate: string;

  let timeslots: [];

  async function updateTimeslots() {
    if (appointmentDate && appointment.service) {
      let url = `/book/slots?date=${appointmentDate}&service=${appointment.service}`;
      if (appointment.employee) {
        url += `&employee=${appointment.employee}`;
      }
      var response = await fetch(url);
      timeslots = (await response.json()).slots;
    }
  }

</script>

<h2>Create booking</h2>

<form action="/book" method="post">

  <p>
    <label for="service">Service</label>
    <select id="service" name="service" bind:value={appointment.service} on:change={updateTimeslots}>
      <option>Pick a service</option>
      {#each services as service}
        <option value={service.id}>{service.name}</option>
      {/each}
    </select>
  </p>

  <p>
    <label for="employee">Who?</label>
    <select id="employee" name="employee" bind:value={appointment.employee} on:change={updateTimeslots}>
      <option value="">No preference</option>
      {#each employeesForService as employee}
        <option value={employee.id}>{employee.account.first_name} {employee.account.last_name}</option>
      {/each}
    </select>
  </p>

  <p>
    <label for="startdatetime">When?</label>
    <input type="date" bind:value={appointmentDate} on:change={updateTimeslots}>
  </p>

</form>