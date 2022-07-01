import todoSchema from './todoSchema';
import { dev } from '$app/env';

// import { type RxDocument, type RxCollection, type RxDatabase } from 'rxdb';
const _create = async () => {
	// Imports are here so they don't run during SSR
	const { createRxDatabase, addRxPlugin } = await import('rxdb');
	const { addPouchPlugin, getRxStoragePouch } = await import('rxdb/plugins/pouchdb');
	const { RxDBQueryBuilderPlugin } = await import('rxdb/plugins/query-builder');
	const { RxDBUpdatePlugin } = await import('rxdb/plugins/update');
	const PouchdbAdapterIdb = await import('pouchdb-adapter-idb');
	await addPouchPlugin(PouchdbAdapterIdb);
	await addRxPlugin(RxDBQueryBuilderPlugin);
	await addRxPlugin(RxDBUpdatePlugin);
	/**
	 * to reduce the build-size,
	 * we use some modules in dev-mode only
	 */
	if (dev) {
		const { PouchDB } = await import('rxdb/plugins/pouchdb');
		await Promise.all([
			/**
			 * Enable the dev mode plugin
			 */
			import('rxdb/plugins/dev-mode').then((module) => addRxPlugin(module.RxDBDevModePlugin)),

			// we use the schema-validation only in dev-mode
			// this validates each document if it is matching the jsonschema
			import('rxdb/plugins/validate').then((module) => addRxPlugin(module.RxDBValidatePlugin)),

			// enable debug to detect slow queries
			import('pouchdb-debug').then((module) => addPouchPlugin(module['default']))
		]);
		PouchDB.debug.enable('pouchdb:find');
	}
	// Create DB
	const db = await createRxDatabase({
		name: 'todokit',
		storage: getRxStoragePouch('idb'),
		multiInstance: true
	});

	// create collections
	await db.addCollections({ todos: { schema: todoSchema } });

	// Sync
	// const syncURL = `http://${window.location.hostname}:5984/`;
	// Object.keys(collections).forEach((name) =>
	// 	db[name].sync({
	// 		remote: syncURL + name + '/'
	// 	})
	// );

	return db;
};

// DB is shared singleton
let dbPromise;
export const getDb = () => {
	// const syncURL = `http://${window.location.hostname}:5984/`;
	// if (!dbPromise) dbPromise = _create(syncURL);
	if (!dbPromise) dbPromise = _create();
	return dbPromise;
};
