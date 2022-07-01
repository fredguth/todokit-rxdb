//   { id: '1', name: 'One', done: false },
const todoSchema = {
	title: 'todo',
	description: 'an individual task to be done',
	version: 0,
	type: 'object',
	indexes: ['createdAt', 'updatedAt'],
	primaryKey: 'id',
	properties: {
		id: {
			type: 'string'
		},
		name: {
			type: 'string'
		},
		done: {
			type: 'boolean'
		},
		createdAt: {
			type: 'number'
		},
		updatedAt: {
			type: 'number'
		}
	},
	required: ['id']
};

export default todoSchema;
