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

resetTodos();

todo.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    if (todo.value.trim().length > 2) {
      todos.push({
        id: todos.length + 1,
        content: todo.value,
        completed: false
      });
      resetTodos();
    }
    todo.value = '';
  }
});

// FUNCTIONS // 

function resetTodos() {
  todolist.innerHTML = '';
  getTodos();
}

function getTodos() {

  todos.reverse().forEach(todoObj => {

    const li = document.createElement('li');
    li.className = todoObj.completed ? 'completed' : 'uncompleted';

    const check = document.createElement('span');
    check.className = 'check';
    check.addEventListener('click', function () {
      toggleTodo(todoObj.id);
    })

    const content = document.createElement('span');
    content.className = 'content';
    content.textContent = todoObj.content;

    const cross = document.createElement('span');
    cross.className = 'cross';

    cross.addEventListener('click', function (){
      removeTodo(todoObj.id);
    })

    li.appendChild(check);
    li.appendChild(content);
    li.appendChild(cross);

    todolist.appendChild(li);

  });

  console.log(todos.reverse());

}

function removeTodo(id){
  todos = todos.filter(todo => todo.id !== id);
  resetTodos();
}

function toggleTodo(id){
  todos.map(todo => {
    if(todo.id === id){
      todo.completed = !todo.completed;
    }
  });
  resetTodos();
}