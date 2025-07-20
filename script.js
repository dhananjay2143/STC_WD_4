let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskTime = document.getElementById("taskTime");

  const taskText = taskInput.value.trim();
  const taskDate = taskTime.value;

  if (taskText === "" || taskDate === "") {
    alert("Please enter task and select date/time.");
    return;
  }

  const task = {
    text: taskText,
    date: new Date(taskDate),
    completed: false
  };

  tasks.push(task);
  taskInput.value = "";
  taskTime.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";
    taskInfo.innerHTML = `<strong>${task.text}</strong><small>${task.date.toLocaleString()}</small>`;

    const actionBtns = document.createElement("div");
    actionBtns.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.className = "complete";
    completeBtn.onclick = () => toggleComplete(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);

    actionBtns.appendChild(completeBtn);
    actionBtns.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(actionBtns);
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function sortTasks() {
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  renderTasks();
}
