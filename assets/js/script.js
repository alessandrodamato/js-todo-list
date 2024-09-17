let todos = [
  {
    id: 1,
    content: 'fare i compiti',
    completed: false
  },
  {
    id: 2,
    content: 'fare la cacca',
    completed: true
  },
  {
    id: 3,
    content: 'cucinare',
    completed: false
  },
  {
    id: 4,
    content: 'leggere un libro',
    completed: true
  },
];

const todolist = document.getElementById('todolist');
const todo = document.getElementById('todo');
const buttons = document.querySelectorAll('.filter-btn');

let nextId = todos.length + 1;
let filteredTodos = [...todos];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    filterTodos(button.dataset.filter);
    setActiveButton(button);
  });
});

resetTodos();

todo.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    if (todo.value.trim().length > 2) {
      todos.push({
        id: nextId++,
        content: todo.value,
        completed: false
      });
      todo.value = '';
      filterTodos(document.querySelector('.filter-btn.active').dataset.filter);
    }
  }
});

function resetTodos() {
  todolist.innerHTML = '';
  getTodos(filteredTodos);
}

function getTodos(todosToDisplay) {
  todosToDisplay.slice().reverse().forEach(todoObj => {
    const li = document.createElement('li');
    li.className = todoObj.completed ? 'completed' : 'uncompleted';

    const check = document.createElement('span');
    check.className = 'check';
    check.addEventListener('click', function () {
      toggleTodo(todoObj.id);
    });

    const content = document.createElement('span');
    content.className = 'content';
    content.textContent = todoObj.content;

    const cross = document.createElement('span');
    cross.className = 'cross';
    cross.addEventListener('click', function () {
      removeTodo(todoObj.id);
    });

    li.appendChild(check);
    li.appendChild(content);
    li.appendChild(cross);

    todolist.appendChild(li);
  });
}

function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  filterTodos(document.querySelector('.filter-btn.active').dataset.filter);
}

function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  filterTodos(document.querySelector('.filter-btn.active').dataset.filter);
}

function filterTodos(type) {
  if (type === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (type === 'uncompleted') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else {
    filteredTodos = [...todos];
  }
  resetTodos();
}

function setActiveButton(activeButton) {
  buttons.forEach(button => button.classList.remove('active'));
  activeButton.classList.add('active');
}
