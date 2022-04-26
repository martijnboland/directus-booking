const fs = require('fs').promises;
const path = require('path');

export default ({ filter, action }, { services, database, getSchema }) => {

	const { RolesService } = services;

	async function readJsonFile(filePath) {
		console.log(`Reading json file from ${filePath}`);
		var jsonText = await fs.readFile(filePath);
		return JSON.parse(jsonText);
	}

	async function seedRoles() {
    
		console.log('Seeding roles...');
		
		const roles = await readJsonFile(path.join(__dirname, '../../../seeddata/roles.json'));
		const schema = await getSchema();

		var rolesService = new RolesService({ knex: database, schema: schema });
		var existingRoles = await rolesService.readByQuery({ fields: '*' });
		
		if (existingRoles.length <= 1) { // Only administrator
			console.log('Only one role exists, creating other roles...');
			await rolesService.upsertMany(roles);
			console.log('Finished creating roles');
		} else {
			console.log('More than one role already exists, skipping seed => ', existingRoles);
		}
	}

	action('server.start', async () => {
    await seedRoles();
  });
};
