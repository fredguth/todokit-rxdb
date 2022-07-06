<script>
	export let addTodo;
	let todoText = '';

	const handleSubmit = () => {
		if (todoText.trim().length < 1) {
			return;
		}
		addTodo(todoText);
		todoText = '';
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input
		class="new-todo"
		placeholder="What needs to be done?"
		data-testid="new-todo"
		bind:value={todoText}
	/>
</form>

<!-- 
<script>
  
  let todoText = '';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todoText.trim().length < 1) {
      return;
    }

    onSubmit(todoText);
    clearNewTodo();
  };

  const clearNewTodo = () => {
    todoText = '';
  };
</script>

<form
  data-testid="new-todo-form"
  on:submit={handleSubmit}
>
  <input
    class="new-todo"
    placeholder="What needs to be done?"
    data-testid="new-todo"
    bind:value={todoText} />
</form> -->
