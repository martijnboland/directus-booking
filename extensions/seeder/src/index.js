const fs = require('fs').promises;
const path = require('path');

export default ({ filter, action }, { services, database, getSchema }) => {

	const { RolesService, PermissionsService, UsersService, ItemsService } = services;

	action('server.start', async () => {
		const schema = await getSchema();

    await seedRoles(schema);

		await seedPermissions(schema);

		await seedUsers(schema);

		var serviceIds = await seedServices(schema);

		await seedEmployees(schema, serviceIds);
  });

	async function seedRoles(schema) {
    
		console.log('Seeding roles...');
		
		const roles = await readJsonFile(path.join(__dirname, '../../../seeddata/roles.json'));

		var rolesService = new RolesService({ knex: database, schema: schema });
		var existingRoles = await rolesService.readByQuery({ fields: 'id' });
		
		if (existingRoles.length <= 1) { // Only administrator
			console.log('Only one role exists, creating other roles...');
			await rolesService.upsertMany(roles);
			console.log('Finished creating roles');
		} else {
			console.log('More than one role already exists, skipping seed...');
		}
	}

	async function seedPermissions(schema) {
		console.log('Seeding permissions...');
		
		const permissions = await readJsonFile(path.join(__dirname, '../../../seeddata/permissions.json'));

		var permissionsService = new PermissionsService({ knex: database, schema: schema });
		var existingPermissions = await permissionsService.readByQuery({ fields: 'id' });
		
		if (existingPermissions.length === 0) { 
			console.log('No custom permissions exist in the database, creating...');
			await permissionsService.upsertMany(permissions);
			console.log('Finished creating permissions');
		} else {
			console.log('Permissions already exists, skipping creation...');
		}
	}

	async function seedUsers(schema) {
    
		console.log('Seeding users...');
		
		const users = await readJsonFile(path.join(__dirname, '../../../seeddata/users.json'));

		var usersService = new UsersService({ knex: database, schema: schema });
		var existingUsers = await usersService.readByQuery({ fields: 'id' });
		
		if (existingUsers.length <= 1) { // Only administrator user
			console.log('Only one user exists, creating other users...');
			await usersService.upsertMany(users);
			console.log('Finished creating users');
		} else {
			console.log('More than one user already exists, skipping seed...');
		}
	}

	async function seedServices(schema) {
    
		console.log('Seeding services...');
		
		const services = await readJsonFile(path.join(__dirname, '../../../seeddata/services.json'));

		var servicesService = new ItemsService('services', { knex: database, schema: schema });
		var existingServices = await servicesService.readByQuery({ fields: 'id' });
		
		if (existingServices.length === 0) {
			console.log('No services exist, creating...');
			var serviceIds = await servicesService.upsertMany(services);
			console.log('Finished creating services');
			return serviceIds;
		} else {
			console.log('Services already exist, skipping seed...');
			return [];
		}
	}

	async function seedEmployees(schema, serviceIds) {
    
		console.log('Seeding employees...');
		
		const employees = await readJsonFile(path.join(__dirname, '../../../seeddata/employees.json'));

		var employeesService = new ItemsService('employees', { knex: database, schema: schema });
		var exisitingEmployees = await employeesService.readByQuery({ fields: 'id' });
		
		if (exisitingEmployees.length === 0) {
			// Set employeeservices when available
			if (serviceIds.length > 0 && serviceIds.length > 2 && employees.length > 1) {
				employees[0].services = serviceIds.slice(0, 2).map(s => ({ services_id: s }));
				employees[1].services = serviceIds.slice(2, 3).map(s => ({ services_id: s }));

				console.log('employees => ', employees);
			}
			console.log('No employees exist, creating...');
			await employeesService.upsertMany(employees);
			console.log('Finished creating employees');
		} else {
			console.log('Employees already exist, skipping seed...');
		}
	}

	async function readJsonFile(filePath) {
		console.log(`Reading json file from ${filePath}`);
		var jsonText = await fs.readFile(filePath);
		return JSON.parse(jsonText);
	}

};
