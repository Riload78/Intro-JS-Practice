/*
Nuestro cliente está intenando calcular el promedio de una lista de números pero nos diceque no funciona.
No nos da el error, solo este código que es el que tiene en producción.
Para este ejercicio tenemos que crear un archivo llamado bug.js con la solución.
*/

const calcularPromedio = (numeros) => {
  let sumaTotal = 0
  for (let i = 0; i < numeros.length; i++) {
    sumaTotal += numeros[i]
  }
  const promedio = sumaTotal / numeros.length
  return promedio
}

const listaNumeros = [1, 2, 3, 4, 5]
const promedioNumeros = calcularPromedio(listaNumeros)
console.log(promedioNumeros)
