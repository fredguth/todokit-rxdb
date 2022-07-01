<script>
	import Filter from '../components/Filter.svelte';
	import NewTodoForm from '../components/NewTodoForm.svelte';
	import TodoList from '../components/TodoList.svelte';
	import { onMount } from 'svelte';
	import { getDb } from '$lib/db';



	let todosFilter = '';
	let db$;
	let todos = [];
	onMount(() => {
		// window.process = window.process || {env:{}};
		// window.global = window;
		db$ = getDb();
	});
	const filters = [
		{ name: 'All', filterBy: '' },
		{ name: 'Active', filterBy: 'active' },
		{ name: 'Completed', filterBy: 'completed' }
	];

	$: completeTodos = todos.filter((todo) => todo.done === true);
	$: incompleteTodos = todos.filter((todo) => todo.done === false);

	// const addTodo = (newTodoName) => {
	//   todos = [
	//     ...todos,
	//     {
	//       // TODO Make ID more unique
	//       id: 'todo-' + todos.length.toString(),
	//       name: newTodoName,
	//       done: false
	//     }
	//   ];
	// };
	const addTodo = async (newTodoName) => {
		// let timestamp = new Date().getTime();
		// await db$.todos.insert({
		// 	// TODO make ID unique
		// 	id: 'todo-' + timestamp,
		// 	name: newTodoName,
		// 	done: false,
		// 	createdAt: timestamp,
		// 	updatedAt: timestamp
		// });
	};
	const removeTodo = (id) => {
		todos = todos.filter((todo) => todo.id !== id);
	};

	const clearCompleted = () => {
		todos = incompleteTodos;
	};
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

		<TodoList {todos} filter={todosFilter} onRemoveTodo={removeTodo} />
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
