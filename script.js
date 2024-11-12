// Load tasks from local storage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText) {
    const task = { text: taskText, completed: false };
    saveTask(task);
    renderTask(task);
    taskInput.value = ""; // Clear input
  }
}

function renderTask(task, index = null) {
  const taskList = document.getElementById("taskList");
  
  const taskItem = document.createElement("li");
  taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
  taskItem.innerHTML = `
    <span class="${task.completed ? "completed" : ""}" onclick="toggleTask(${index})">${task.text}</span>
    <div>
      <button class="btn btn-sm btn-warning mr-2" onclick="editTask(${index})">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
    </div>
  `;

  if (index === null) {
    taskList.appendChild(taskItem);
  } else {
    taskList.replaceChild(taskItem, taskList.children[index]);
  }
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function loadTasks() {
  const tasks = getTasks();
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Clear list
  tasks.forEach((task, index) => renderTask(task, index));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const taskText = prompt("Edit task:", tasks[index].text);
  if (taskText !== null && taskText.trim() !== "") {
    tasks[index].text = taskText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}
