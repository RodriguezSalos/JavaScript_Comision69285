let tasks = [];

async function initTasks() {
  try {
    const localTasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = Array.isArray(localTasks) ? localTasks : [];
  } catch (error) {
    console.error("Error cargando tareas:", error);
    tasks = [];
  }
}


function addTask(name, priority, category) {
  const task = {
    id: Date.now(),       // ID único
    name,
    priority,
    category,
    completed: false      // Siempre inicia como pendiente
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return task;
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskCompletion(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return tasks;
}
