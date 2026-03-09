const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("task-list");
let tasks = loadTasks();
let item = [];
updateTaskList();
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addTask();
});

function addTask() {
  const todoText = todoInput.value.trim();
  if (todoText.length > 0) {
    const todoObject = {
      text: todoText,
      completed: false

    };
    tasks.push(todoObject);
    updateTaskList();
    saveTasks();
    todoInput.value = "";
  }
}
function createTaskElement(task, taskIndex) {
  const todoLi = document.createElement("li");
  const todoText = task.text;
  todoLi.className = "todo";
  const todoId = "task-" + taskIndex;
  todoLi.innerHTML = `
          <input id="${todoId}" type="checkbox">
          <label class="task-label" for="${todoId}">
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path>
            </svg>
          </label>
          <label class="todo-text" for="${todoId}">${todoText}</label>
          <button class="delete-button">
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm16₀ ₀h8₀v₋₃₆₀h₋₈₀v₃₆₀ZM₂₈₀₋₇₂₀v₅₂₀₋₅₂₀Z"></path>
            </svg>
          </button>
        `;
  const deleteButton = todoLi.querySelector(".delete-button");
  deleteButton.addEventListener("click", ()=>{
    deleteTodoItem(taskIndex);
  });
  const checkbox = todoLi.querySelector("input");
  checkbox.addEventListener("change",()=>{
    tasks[taskIndex].completed = checkbox.checked;
    saveTasks();
  });
  checkbox.checked = task.completed;
  return todoLi;
}
function updateTaskList() {
  todoList.innerHTML = "";
  tasks.forEach((task, taskIndex) => {
    todoItem = createTaskElement(task, taskIndex);
    todoList.append(todoItem);
  });
}
function saveTasks() {
  const tasksJson = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksJson);
}
function loadTasks() {
  const tasksJson = localStorage.getItem("tasks") || "[]";
  return JSON.parse(tasksJson);
}
function deleteTodoItem(taskIndex) {
  tasks = tasks.filter((_, index) => index !== taskIndex);
  saveTasks();
  updateTaskList();
  
}