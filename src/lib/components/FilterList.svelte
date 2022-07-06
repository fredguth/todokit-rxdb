<script>
	import Filter from '$lib/components/Filter.svelte';
	export let todos;
	export let selectedFilter;

	const filters = [
		{ name: 'All', filterBy: 'none' },
		{ name: 'Active', filterBy: 'active' },
		{ name: 'Completed', filterBy: 'completed' }
	];

	$: completeTodos = todos.filter((todo) => todo.done);
	$: incompleteTodos = todos.filter((todo) => !todo.done);
</script>

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
		{#if completeTodos.length > 0}
			<button class="clear-completed" on:click={clearCompleted}> Clear completed </button>
		{/if}
	</div>
</footer>
