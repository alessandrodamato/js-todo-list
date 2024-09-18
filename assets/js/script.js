const todolist = document.getElementById('todolist');
const todo = document.getElementById('todo');
const buttons = document.querySelectorAll('.filter-btn');
const saveButton = document.getElementById('save-todos');
const saveMessage = document.getElementById('save-message');

let todos;
let filteredTodos;
let nextId;

getAllTodos();

buttons.forEach(button => {
  button.addEventListener('click', () => {
    filterTodos(button.dataset.filter);
    setActiveButton(button);
  });
});

saveButton.addEventListener('click', saveTodos);

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
      console.log(todos);
      
    }
  }
});

// FUNCTIONS //

function getAllTodos(){
  axios.get('http://localhost:8080/todo/get-all')
    .then(res => {
      todos = res.data.todos;
      filteredTodos = [...todos];
      nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
      resetTodos();
    })
    .catch(err => {
      console.log(err);
    })
}

function saveTodos(){
  axios.post('http://localhost:8080/todo/save', todos)
  .then(res => {
    printSaveMessage(res.data.message);
  })
  .catch(err => {
    console.log(err);
  })
}

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

function printSaveMessage(msg){
  saveMessage.innerHTML = msg;
  setTimeout(() => {
    saveMessage.innerHTML = '';
  }, 3000);
}
