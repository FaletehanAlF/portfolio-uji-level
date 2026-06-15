const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearAllBtn = document.getElementById("clearAll");
const taskCount = document.getElementById("taskCount");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

addBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", clearAll);

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateCount() {
  taskCount.textContent = `${todos.length} Tasks`;
}

function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = todo.text;

    text.addEventListener("click", () => {
      todo.done = !todo.done;
      saveTodos();
      renderTodos();
    });

    const actions = document.createElement("div");
    actions.className = "actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = () => editTodo(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Del";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteTodo(index);

    actions.append(editBtn, deleteBtn);
    li.append(text, actions);
    todoList.appendChild(li);
  });

  updateCount();
}

function addTodo() {
  const value = input.value.trim();
  if (!value) return;

  todos.push({ text: value, done: false });
  input.value = "";
  saveTodos();
  renderTodos();
}

function editTodo(index) {
  const newText = prompt("Edit task:", todos[index].text);
  if (newText !== null && newText.trim() !== "") {
    todos[index].text = newText.trim();
    saveTodos();
    renderTodos();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function clearAll() {
  if (!confirm("Delete all tasks?")) return;
  todos = [];
  saveTodos();
  renderTodos();
}

renderTodos();