// import { writable } from 'svelte/store';
// import type { Writable } from 'svelte/store';
// import type { RxCollection } from 'rxdb';

// import { db } from '$lib/db';
// import todoSchema from '$lib/todoSchema';
// import { toTypedRxJsonSchema } from 'rxdb';
// import type { ExtractDocumentTypeFromTypedRxJsonSchema, RxCollection } from 'rxdb';
// import type { BehaviorSubject } from 'rxjs';

// export async function useStorage<Value>(collectionName: string, sort: string): Writable<Value> {
// 	let sortOptions: Object = { createdAt: 'desc' };
// 	if (sort.indexOf(':') > -1) {
// 		let key = sort.split(':')[0];
// 		let value = sort.split(':')[1];
// 		sortOptions = { key: value };
// 	}
// 	let collection$: BehaviorSubject<RxCollection>;
// 	collection$ = (await db.load())[collectionName].find().sort(sortOptions).$;
// 	let store: Writable<any> = writable([], (set) => {
// 		collection$.subscribe(set);
// 		return collection$.unsubscribe();
// 	});
// 	return store;
// }

// // export function useStorage<Value>(key: string, initialValue: Value): Writable<Value> {
// // 	let serialize = JSON.stringify;
// // 	let deserialize = JSON.parse;

// // 	let storedValue: Value = deserialize(localStorage.getItem(key));

// // 	let store = writable(storedValue ? storedValue : initialValue);
// // 	store.subscribe((value) => localStorage.setItem(key, serialize(value)));

// // 	return store;
// // }

// export const todos = writableCollection('todos', 'createdAt:desc');
