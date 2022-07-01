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
			type: 'string',
			maxLength: 100
		},
		name: {
			type: 'string',
			maxLength: 100
		},
		done: {
			type: 'boolean'
		},
		createdAt: {
			type: 'number',
			multipleOf: 1,
			minimum: 0,
			maximum: 9000000000000
		},
		updatedAt: {
			type: 'number',
			multipleOf: 1,
			minimum: 0,
			maximum: 9000000000000
		}
	},
	required: ['id']
};

export default todoSchema;
