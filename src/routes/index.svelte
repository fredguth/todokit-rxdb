<script lang="ts">
	import type { ITodo } from '$lib/todo';
	import AddTodo from '$lib/components/AddTodo.svelte';
	import Todo from '$lib/components/Todo.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import { onMount } from 'svelte';
	import { getDb } from '$lib/db';
	import type { RxDocument } from 'rxdb';
	const filters = [
		{ name: 'All', filterBy: 'none' },
		{ name: 'Active', filterBy: 'active' },
		{ name: 'Completed', filterBy: 'completed' }
	];

	// state
	let selectedFilter: 'none' | 'active' | 'completed' = 'none';
	let todos = [];
	let db$;

	// computed

	$: visibleTodos = todos.filter((todo) => {
		switch (selectedFilter) {
			case 'active':
				return !todo.done;
			case 'completed':
				return todo.done;
			default:
				return true;
		}
	});
	$: completedTodos = todos.filter((todo) => todo.done);
	$: incompleteTodos = todos.filter((todo) => !todo.done);

	// lifecycle
	onMount(async () => {
		db$ = await getDb();
		db$.todos
			.find()
			.sort({ createdAt: 'asc' })
			.$.subscribe((stored) => (todos = stored));
	});

	// methods

	const generateRandomId = () => {
		return Math.random().toString(16).slice(2);
	};
	const addTodo = async (newTodoText: string) => {
		let timestamp = new Date().getTime();
		await db$.todos.insert({
			id: generateRandomId(),
			text: newTodoText,
			done: false,
			createdAt: timestamp,
			updatedAt: timestamp
		});
	};

	const toggleDone = async (todo) => {
		let data = { ...todo.toJSON() };
		data.done = !data.done;
		data.updatedAt = new Date().getTime();
		await todo.atomicPatch(data);
	};

	const removeTodo = async (todo) => await todo.remove();

	const editTodo = async (todo, text: string) => {
		let data = { ...todo.toJSON() };
		data.text = text;
		data.updatedAt = new Date().getTime();
		await todo.atomicPatch(data);
	};

	const clearCompleted = () => completedTodos.forEach((completed) => removeTodo(completed));
</script>

<header class="header">
	<h1 class="logo">Todos</h1>
</header>

<section class="todoapp">
	<AddTodo {addTodo} />

	<section class="main">
		<input id="toggle-all" class="toggle-all" type="checkbox" />
		<label for="toggle-all">Mark all as complete</label>
		<ul class="todo-list" data-testid="todo-list">
			{#each visibleTodos as todo}
				<Todo {todo} {toggleDone} {removeTodo} {editTodo} />
			{/each}
		</ul>
		{#if todos.length}
			<footer class="footer">
				<span class="todo-count">
					<strong>{incompleteTodos.length}</strong>
					item{incompleteTodos.length === 1 ? '' : 's'} left
				</span>

				<ul class="filters">
					{#each filters as filter}
						<li>
							<Filter
								on:click={() => (selectedFilter = filter.filterBy)}
								{selectedFilter}
								filter={filter.filterBy}
							>
								{filter.name}
							</Filter>
						</li>
					{/each}
				</ul>

				<div>
					{#if completedTodos.length > 0}
						<button class="clear-completed" on:click={clearCompleted}> Clear completed </button>
					{/if}
				</div>
			</footer>
		{/if}
	</section>
</section>
