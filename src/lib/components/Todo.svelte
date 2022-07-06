<script lang="ts">
	import type { ITodo } from '$lib/todo';
	export let todo: ITodo;
	export let toggleDone: (todo: ITodo) => void;
	export let removeTodo: (todo: ITodo) => void;
	export let editTodo: (todo: ITodo, text: string) => void;
	let editing = false;

	const toggleEditing = () => {
		editing = !editing;
		console.log('editing:', editing);
	};
	function handleKeydown(event: KeyboardEvent, todo): void {
		if (!editing) return;
		let pressedKey = event.key;
		let targetElement = event.target as HTMLInputElement;
		let newTodoText = targetElement.value;

		switch (pressedKey) {
			case 'Escape':
				targetElement.blur();
				break;
			case 'Enter':
				editTodo(todo, newTodoText);
				targetElement.blur();
				break;
		}
	}

	function handleBlur(event: FocusEvent, todo: ITodo): void {
		let targetElement = event.target as HTMLInputElement;
		let newTodoText = targetElement.value;

		editTodo(todo, newTodoText);
		targetElement.blur();
		editing = false;
	}
</script>

<li
	class="todo {todo.done ? 'completed' : ''} {editing ? 'editing' : ''}"
	data-testid={'todo-' + todo.id}
>
	<input class="toggle" type="checkbox" checked={todo.done} on:change={() => toggleDone(todo)} />
	{#if !editing}
		<label for={todo.id} on:dblclick={toggleEditing}>
			{todo.text}
		</label>
	{:else}
		<!-- svelte-ignore a11y-autofocus -->
		<input
			data-testid="edit"
			on:keydown={(e) => handleKeydown(e, todo)}
			on:blur|preventDefault={(e) => handleBlur(e, todo)}
			class="new-todo"
			type="text"
			value={todo.text}
			autofocus
		/>
	{/if}
	<button
		class="destroy"
		on:click={() => removeTodo(todo)}
		data-testid={'todo-delete-' + todo.id}
	/>
</li>
