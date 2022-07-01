<script>
	import Filter from '../components/Filter.svelte';
	import NewTodoForm from '../components/NewTodoForm.svelte';
	import TodoList from '../components/TodoList.svelte';
	import { onMount } from 'svelte';
	import { getDb } from '$lib/db';

	let todosFilter = '';
	let db$;
	let todos = []
	onMount(async () => {

		db$ = await getDb();
		db$.todos
			.find()
			.sort({ createdAt: 'asc' })
			.$.subscribe((stored) => (todos = stored));
	});
	const filters = [
		{ name: 'All', filterBy: '' },
		{ name: 'Active', filterBy: 'active' },
		{ name: 'Completed', filterBy: 'completed' }
	];

	$: completeTodos = todos.filter((todo) => todo.done === true);
	$: incompleteTodos = todos.filter((todo) => todo.done === false);

	const addTodo = async (newTodoName) => {
		let timestamp = new Date().getTime();
		await db$.todos.insert({
			// TODO make ID unique
			id: 'todo-' + timestamp,
			name: newTodoName,
			done: false,
			createdAt: timestamp,
			updatedAt: timestamp
		});
	};
	const toggleTodo = async (todo) => {
		let data = {...todo.toJSON()};
		data.done = !data.done;
		data.updatedAt = new Date().getTime();
		await todo.atomicPatch(data)
	}
	const removeTodo = async (todo) => await todo.remove();

	const clearCompleted = () => completeTodos.forEach((completed) => removeTodo(completed));
</script>

<header class="header">
	<h1 class="logo">todos</h1>
</header>

<section class="todoapp">
	<NewTodoForm onSubmit={addTodo} />

	<section class="main">
		<!-- TODO -->
		<!-- <input id="toggle-all" class="toggle-all" type="checkbox" /> -->
		<!-- <label for="toggle-all">Mark all as complete</label> -->

		<TodoList {todos} filter={todosFilter} onToggleTodo={toggleTodo} onRemoveTodo={removeTodo} />
	</section>

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
							on:click={() => (todosFilter = filter.filterBy)}
							selectedFilter={todosFilter}
							filter={filter.filterBy}
						>
							{filter.name}
						</Filter>
					</li>
				{/each}
			</ul>

			<div>
				{#if completeTodos.length > 0}
					<button class="clear-completed" on:click={clearCompleted}> Clear completed </button>
				{/if}
			</div>
		</footer>
	{/if}
</section>
