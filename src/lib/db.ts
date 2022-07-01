const _create = async () => {
	// Imports are here so they don't run during SSR
	const { createRxDatabase } = await import('rxdb');
	const { addPouchPlugin, getRxStoragePouch } = await import('rxdb/plugins/pouchdb');
	const PouchdbAdapterIdb = await import('pouchdb-adapter-idb');
	await addPouchPlugin(PouchdbAdapterIdb);

	// Create DB
	const db = await createRxDatabase({
		name: 'todokit',
		storage: getRxStoragePouch('idb')
	}).then(() => console.log('Database created.'));
	// Register models
	// const collections = await models();
	// await db.addCollections(collections);
	// Sync
	// const syncURL = `http://${window.location.hostname}:5984/`;
	// Object.keys(collections).forEach((name) =>
	// 	db[name].sync({
	// 		remote: syncURL + name + '/'
	// 	})
	// );

	// return db;
};

// DB is shared singleton
let dbPromise;
export const getDb = () => {
	// const syncURL = `http://${window.location.hostname}:5984/`;
	// if (!dbPromise) dbPromise = _create(syncURL);
	if (!dbPromise) dbPromise = _create();
	return dbPromise;
};

// export const handleChange = (item) => (e) => {
// 	let value = e.target.value;
// 	switch (e.target.type) {
// 		case 'number':
// 			value = Number(value);
// 			break;
// 		case 'checkbox':
// 			value = e.target.checked;
// 			break;
// 	}
// 	item.atomicPatch({ [e.target.name]: value });
// };

// export const handleRemove = (item) => (e) => {
// 	e.preventDefault();
// 	return item.remove();
// };
