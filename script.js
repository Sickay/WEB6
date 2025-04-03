// Функція для збереження завдань у localStorage
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Функція для отримання завдань з localStorage
function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  return savedTodos;
}

// Функція для рендерингу завдань
function renderTodos(todos) {
  const todoList = document.querySelector('.todo-lists');
  todoList.innerHTML = ''; // Очищаємо попередні завдання

  todos.forEach((todo) => {
    const todo_el = document.createElement('div');
    todo_el.classList.add('todo-item');

    const todo_content_el = document.createElement('div');
    todo_el.appendChild(todo_content_el);

    const todo_input_el = document.createElement('input');
    todo_input_el.classList.add('text');
    todo_input_el.type = 'text';
    todo_input_el.value = todo.text;
    todo_input_el.setAttribute('readonly', 'readonly');

    if (todo.completed) {
      todo_input_el.classList.add('done'); // Якщо завдання виконане
    }

    todo_content_el.appendChild(todo_input_el);

    const todo_actions_el = document.createElement('div');
    todo_actions_el.classList.add('action-items');

    if (!todo.completed) {
      const todo_done_el = document.createElement('i');
      todo_done_el.classList.add('fa-solid', 'fa-check');

      const todo_edit_el = document.createElement('i');
      todo_edit_el.classList.add('fa-solid', 'fa-pen-to-square', 'edit');

      todo_done_el.addEventListener('click', () => {
        todo.completed = true;
        saveTodos(todos);
        renderTodos(todos); // Перерендер списку
      });

      todo_edit_el.addEventListener('click', () => {
        if (todo_edit_el.classList.contains('edit')) {
          todo_edit_el.classList.remove('edit', 'fa-pen-to-square');
          todo_edit_el.classList.add('save', 'fa-x');
          todo_input_el.removeAttribute('readonly');
          todo_input_el.focus();
        } else {
          todo_edit_el.classList.remove('save', 'fa-x');
          todo_edit_el.classList.add('edit', 'fa-pen-to-square');
          todo_input_el.setAttribute('readonly', 'readonly');
          todo.text = todo_input_el.value;
          saveTodos(todos);
        }
      });

      todo_actions_el.appendChild(todo_done_el);
      todo_actions_el.appendChild(todo_edit_el);
    }

    const todo_delete_el = document.createElement('i');
    todo_delete_el.classList.add('fa-solid', 'fa-trash');
    todo_delete_el.addEventListener('click', () => {
      const index = todos.indexOf(todo);
      todos.splice(index, 1);
      saveTodos(todos);
      renderTodos(todos); // Перерендер списку
    });

    todo_actions_el.appendChild(todo_delete_el);
    todo_el.appendChild(todo_actions_el);

    todoList.appendChild(todo_el);
  });
}

// Ініціалізація
document.addEventListener('DOMContentLoaded', () => {
  let todos = loadTodos(); // Завантаження завдань

  renderTodos(todos); // Відображення завдань

  const input = document.querySelector('#todo-input');
  document.querySelector('#submit').addEventListener('click', () => {
    const inputData = input.value.trim();
    if (inputData === '') return; // Пропустити порожні значення
    input.value = '';

    const newTodo = { text: inputData, completed: false };
    todos.push(newTodo);
    saveTodos(todos);
    renderTodos(todos);
  });
});
