document.getElementById('new-todo').addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('todo-text').value;
    addTodo(text);
});

function addTodo(text) {
    const todos = getTodos();
    const newTodo = { text: text, completed: false };
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos(todos);
}

function getTodos() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    return user.todos || [];
}

function saveTodos(todos) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    user.todos = todos;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
}

function renderTodos(todos) {
    const ul = document.getElementById('todos');
    ul.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            ${todo.text}
            <button onclick="toggleComplete(${index})">${todo.completed ? 'Incomplete' : 'Complete'}</button>
            <button onclick="deleteTodo(${index})">Delete</button>
        `;
        ul.appendChild(li);
    });
}

function toggleComplete(index) {
    const todos = getTodos();
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos(todos);
}

function deleteTodo(index) {
    const todos = getTodos();
    todos.splice(index, 1);
    saveTodos(todos);
    renderTodos(todos);
}

// Initialize task list
renderTodos(getTodos());
