let tasks = []

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput")

  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask()
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput")
  const addTaskButton = document.getElementById("addTaskButton")

  taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTask()
    }
  })

  addTaskButton.addEventListener("click", () => {
    addTask()
  })
})

function addTask() {
  const taskInput = document.getElementById("taskInput")
  const taskDescription = taskInput.value.trim()

  if (taskDescription) {
    tasks.push({
      id: Date.now(),
      description: taskDescription,
      completed: false
    })
    taskInput.value = ""
    renderTasks()
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId)
  renderTasks()
}

function toggleTaskStatus(taskId) {
  const task = tasks.find((task) => task.id === taskId)
  if (task) {
    task.completed = !task.completed
    renderTasks()
  }
}

function renderTasks() {
  const taskList = document.getElementById("taskList")
  taskList.innerHTML = ""

  tasks.forEach((task) => {
    const listItem = document.createElement("li")
    listItem.className = task.completed ? "completed" : ""

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    checkbox.onclick = () => toggleTaskStatus(task.id)

    const taskText = document.createElement("span")
    taskText.className = "task-text"
    taskText.textContent = task.description

    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>`
    deleteButton.onclick = () => deleteTask(task.id)
    deleteButton.style.border = "none"
    deleteButton.style.background = "none"
    deleteButton.style.cursor = "pointer"

    listItem.appendChild(checkbox)
    listItem.appendChild(taskText)
    listItem.appendChild(deleteButton)

    taskList.appendChild(listItem)
  })
}
