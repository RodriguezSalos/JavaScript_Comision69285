/*
1.-solicitar nombre + guardar nombre
2.-dar bienvenida + nombre
3.-dependiendo de la opcion seleccionada es la operacion que va a realizar
4.- se muestra resultado

*/
// Elementos del DOM
const n1 = document.getElementById("numero1");
const n2 = document.getElementById("numero2");
const resultado = document.getElementById("resultado");
const inputNombre = document.getElementById("nombreUsuario");
const btnGuardarNombre = document.getElementById("guardarNombre");
const saludo = document.getElementById("saludo-usuario");

// Cargar nombre guardado (si existe)
const nombreGuardado = localStorage.getItem("nombreUsuario");
if (nombreGuardado) {
  mostrarSaludo(nombreGuardado);
}

// Guardar nombre nuevo
btnGuardarNombre.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  if (nombre !== "") {
    localStorage.setItem("nombreUsuario", nombre);
    mostrarSaludo(nombre);
    inputNombre.value = "";
  }
});

// Mostrar saludo
function mostrarSaludo(nombre) {
  saludo.textContent = `¡Hola ${nombre}, bienvenido al simulador! 😎`;
}


document.getElementById("btnSumar").addEventListener("click", () => operar("sumar"));
document.getElementById("btnRestar").addEventListener("click", () => operar("restar"));
document.getElementById("btnMultiplicar").addEventListener("click", () => operar("multiplicar"));
document.getElementById("btnDividir").addEventListener("click", () => operar("dividir"));


let operaciones = [];

function operar(tipo) {
  const num1 = parseFloat(n1.value);
  const num2 = parseFloat(n2.value);
  let res = "";

  if (isNaN(num1) || isNaN(num2)) {
    resultado.textContent = "❌ Ingresa ambos números.";
    return;
  }

  switch (tipo) {
    case "sumar":
      res = num1 + num2;
      break;
    case "restar":
      res = num1 - num2;
      break;
    case "multiplicar":
      res = num1 * num2;
      break;
    case "dividir":
      res = num2 !== 0 ? num1 / num2 : "❌ División por cero";
      break;
  }

  const operacionObj = {
    num1,
    tipo,
    num2,
    resultado: res
  };

  operaciones.push(operacionObj);

  resultado.textContent = `${num1} ${simbolo(tipo)} ${num2} = ${res}`;
  renderOperaciones();
}

// Mostrar símbolo según tipo
const simbolo = (tipo) => ({
  sumar: "+",
  restar: "-",
  multiplicar: "×",
  dividir: "÷"
})[tipo];

// Mostrar operacion
function renderOperaciones() {
  const lista = document.getElementById("listaOperaciones");
  lista.innerHTML = "";

  operaciones.forEach(op => {
    const li = document.createElement("li");
    li.textContent = `${op.num1} ${simbolo(op.tipo)} ${op.num2} = ${op.resultado}`;
    lista.appendChild(li);
  });
}

// Boton reset
document.getElementById("btnReset").addEventListener("click", () => {
  n1.value = "";
  n2.value = "";
  inputNombre.value = "";
  resultado.textContent = "";
  saludo.textContent = "";
});
// Buscar operacionpor resultado usando find()
document.getElementById("btnBuscar").addEventListener("click", () => {
  const valorBuscado = parseFloat(document.getElementById("buscarResultado").value);
  const resultadoBusqueda = document.getElementById("resultadoBusqueda");

  if (isNaN(valorBuscado)) {
    resultadoBusqueda.textContent = "⚠ Ingresa un numero valido para buscar.";
    return;
  }

  const encontrada = operaciones.find(op => op.resultado === valorBuscado);

  if (encontrada) {
    resultadoBusqueda.textContent = `Encontrado: ${encontrada.num1} ${simbolo(encontrada.tipo)} ${encontrada.num2} = ${encontrada.resultado}`;
  } else {
    resultadoBusqueda.textContent = "❌ No se encontró ninguna operación con ese resultado.";
  }
});