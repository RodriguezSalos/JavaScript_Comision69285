/*
1.-solicitar nombre
2.-dar bienvenida + nombre
3.-inicia loop:
4.-solicitar introducir opcion
5.-dependiendo de la opcion seleccionada es la operacion que va a realizar
6.-si se selecciona 6 - salir
7.-termina loop
8.-mostrar mensaje de despedida + nombre
*/

//1.-solicitar nombre
const nombre = prompt(
  "🤖 Hola buen dia!\nAntes de empezar por favor introduce tu nombre 📝:"
);
//2.-dar bienvenida + nombre
alert(`👋 Hola ${nombre}  😎👉Bienvenido `);
let primerNumero = ""; //Esta variable la declare global por que se va estar reasignando el valor
let segundoNumero = ""; //Esta variable la declare global por que se va estar reasignando el valor
let terminarOperacion = false;

//3.-inicia loop:
while (terminarOperacion == false) {
//4.-solicitar introducir opcion
  let consultaOpcion = parseInt(
    prompt(`📖 Introduce opcion deseada: 
            \n 1.-Consulta de tabla multiplicacion
            \n 2.-Ralizar suma
            \n 3.-Ralizar resta
            \n 4.-Ralizar multiplicacion
            \n 5.-Ralizar division
            \n 6.-Salir
            `)
  );

  opcionSeleccionada();

  function opcionSeleccionada() {
//5.-dependiendo de la opcion seleccionada es la operacion que va a realizar
    switch (consultaOpcion) {
      case 1:
        verTablamultiplicar()
        break;
      case 2:
        ingresarNumeros()
        alert(sumar())
        break;
      case 3:
        ingresarNumeros()
        alert(resta())
        break;
      case 4:
        ingresarNumeros()
        alert(multiplicaion())
        break;
      case 5:
        ingresarNumeros()
        alert(division())
        break;
      case 6:
//6.-si se selecciona 6 - salir
//7.-termina loop
        terminarOperacion = true;
        break;
      default:
        alert(
          `⚠ Has introducido '${consultaOpcion}' es opcion invalida! ⚠ \nIntroduce opciones del 1 al 6`
        );
        break;
    }
  }
  function verTablamultiplicar() {
    let validacion = false;
    let tablaMultiplicacion

    while (validacion != true) {
      tablaMultiplicacion = parseInt(
        prompt("introduce el numero de la tabla a consultar")
      );
      if (isNaN(tablaMultiplicacion)) {
        alert("⚠ Has introducido valor invalido! \n Introduce un numero ⚠");
        continue;
      }
      validacion = true;
    }

    const numTermina = 10;
    let numInicio = 1;
    let tabla = [];
    while (numInicio <= numTermina) {
      tabla.push(
        `${tablaMultiplicacion} x ${numInicio} = ` +
          tablaMultiplicacion * numInicio
      );
      numInicio++;
    }
    console.log(
      `Tabla de multiplicar "${tablaMultiplicacion}"'\n'` + tabla.join("\n")
    );
    alert(
      `👨‍🔬Tabla de multiplicar 👩‍🔬"${tablaMultiplicacion}"'\n'` + tabla.join("\n")
    );
  }
  function ingresarNumeros() {
    let validacion = false;

    while (validacion != true) {
      2;
      num1 = parseInt(prompt("Ingrese el primero numero"));
      if (isNaN(num1)) {
        alert(
          "⚠ Has introducido primer numero con valor invalido! \n Introduce un numero ⚠"
        );
        continue;
      }
      num2 = parseInt(prompt("Ingrese el segundo numero"));
      if (isNaN(num2)) {
        alert(
          "⚠ Has introducido segundo numero con valor invalido! ⚠ \n Vuelve introducir los numeros"
        );
        continue;
      } else {
        validacion = true;
      }
    }
  }
  function sumar(){
    return `La suma de ${num1} + ${num2} = ` + (num1 + num2)
  }
  function resta(){
    return `La resta de ${num1} - ${num2} = ` + (num1 - num2)
  }
  function multiplicaion(){
    return `La multiplicacion de ${num1} * ${num2} = ` + num1 * num2
  }
  function division(){
    return `La division de ${num1} / ${num2} = ` + num1 / num2
  }
}
//8.-mostrar mensaje de despedida + nombre
alert(`Que tengas un buen dia ${nombre} hasta luego!👋`);
