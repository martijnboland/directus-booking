const fs = require('fs').promises;

export default ({ filter, action }, { services, database }) => {

	const { RolesService } = services;

	async function readJsonFile(path) {
		console.log(`Reading json file from ${path}`);
		var jsonText = String(await fs.readFile(path));
		return JSON.parse(jsonText);
	}

	async function seedRoles() {
    console.log('Seeding roles...');
		const roles = await readJsonFile('../../../seeddata/roles.json');
		var rolesService = new RolesService();
		var existingRoles = await rolesService.readByQuery();
		if (existingRoles.length <= 1) { // Only administrator
			console.log('Only one role exists, creating other roles...');
			await rolesService.upsertMany(roles);
		} else {
			console.log('More than one role already exists, skipping seed...');
		}
	}

	action('server.start', async () => {
    await seedRoles();
  });
};
