/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * an individual task to be done
 */
export interface ITodo {
	id: string;
	text: string;
	done: boolean;
	createdAt: number;
	updatedAt: number;
	[k: string]: string | boolean | number;
}
