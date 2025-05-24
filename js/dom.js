//cargando archivos
document.addEventListener('DOMContentLoaded', async () => {
  await cargarCategorias();   
  await cargarPrioridades();
});

async function cargarCategorias() {
  try {
    const res = await fetch('db/categorias.json');
    const categorias = await res.json();
    const select = document.getElementById('categoria'); 

    // Recorre las categorías 
    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.nombre;//donde toma la info que viene del json 
      option.textContent = cat.nombre;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Error al cargar categorías:", err);
  }
}

async function cargarPrioridades() {
  try {
    const res = await fetch('db/prioridades.json');
    const prioridades = await res.json();
    const select = document.getElementById('prioridad');

    // Recorre prioridades 
    prioridades.forEach(p => {
      const option = document.createElement('option');
      option.value = p.nivel;
      option.textContent = p.nivel;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Error al cargar prioridades:", err);
  }
}