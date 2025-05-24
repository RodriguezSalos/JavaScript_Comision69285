document.addEventListener('DOMContentLoaded', async () => {
  await initTasks();            // Carga las tareas desde localStorage
  await cargarCategorias();     // Carga las categorías desde categorias.json
  await cargarPrioridades();    // Carga las prioridades desde prioridades.json
  renderTasks();                // Muestra todas las tareas cargadas
});

//Cargando categorías
async function cargarCategorias() {
  try {
    const res = await fetch('db/categorias.json'); // Hace petición al archivo
    const categorias = await res.json();           // Convierte la respuesta en JSON
    const select = document.getElementById('taskCategory'); // Obtiene el select

    // Recorre las categorías y crea opciones en el select
    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.nombre;
      option.textContent = cat.nombre;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Error al cargar categorías:", err);
  }
}

//Cargando prioridades
async function cargarPrioridades() {
  try {
    const res = await fetch('db/prioridades.json');
    const prioridades = await res.json();
    const select = document.getElementById('taskPriority');

    prioridades.forEach(p => {
      const option = document.createElement('option');
      option.value = p.nivel;
      option.textContent = p.nivel.charAt(0).toUpperCase() + p.nivel.slice(1);
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Error al cargar prioridades:", err);
  }
}

//tareas actuales
function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = ''; // Limpia tareas anteriores

  const tasks = getTasks(); // Obtiene las tareas actuales desde taskController

  // Recorre cada tarea y crea un <li> con contenido
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // Contenido de la tarea - tachado completadas)
    li.innerHTML = `
      <span class="${task.completed ? 'text-decoration-line-through' : ''}">
        ${task.name} - <em>${task.priority}</em> | <strong>${task.category}</strong>
      </span>
      <div>
        <button class="btn btn-success btn-sm me-2" data-action="toggle" data-id="${task.id}">☑</button>
        <button class="btn btn-danger btn-sm" data-action="delete" data-id="${task.id}">🗑️</button>
      </div>
    `;

    taskList.appendChild(li); // Agrega la tarea al <ul>
  });
}

// Captura el formulario para agregar nueva tarea
const taskForm = document.getElementById('taskForm');
taskForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Previene que recargue la página

  // Toma valores del formulario
  const name = document.getElementById('taskName').value.trim();
  const priority = document.getElementById('taskPriority').value;
  const category = document.getElementById('taskCategory').value;

  // Verificar que todos los campos estén completos
  if (name && priority && category) {
    addTask(name, priority, category);

    // Muestra notificación con Toastify
    Toastify({
      text: "Tarea agregada",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#28a745"
    }).showToast();

    taskForm.reset(); // Limpia los campos del form
    renderTasks();    // Vuelve a renderizar la lista actualizada
  }
});

// Escucha clicks en los botones dentro de la lista de tareas
const taskList = document.getElementById('taskList');
taskList.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);        // Obtiene el ID de la tarea
  const action = e.target.dataset.action;        // Sabe si es "delete" o "toggle"

  //Eliminar tarea con confirmación SweetAlert
  if (action === 'delete') {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(id);   // Borra tarea del array + localStorage
        renderTasks();    // Refresca la lista
        Swal.fire('Eliminado', 'La tarea ha sido eliminada.', 'success');
      }
    });
  } 
  // Alterna estado de completado
  else if (action === 'toggle') {
    toggleTaskCompletion(id); // Cambia el estado completed
    renderTasks();            // Redibuja la lista
  }
});


