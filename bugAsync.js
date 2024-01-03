/*
Tenemos otro error que nuestro cliente nos pide arreglar.
El cliente está pidiendo un usuarioy nos dice que está usando el id correcto el 1.
Pero que siempre le da undefined.
Nos apasado el código que tenemos que revisar y arreglar.
Para este problema crear un archivo llamado bugAsync.js con la solución.

function obtenerUsuarioCall (id) {
  let usuario
  setTimeout(() => {
    if (id === 1) {
      usuario = { id: 1, nombre: 'John Doe' }
    }
  }, 2000)
  return usuario
}
const usuario = obtenerUsuario(1)
console.log(usuario)
*/

function obtenerUsuario (id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        const usuario = { id: 1, nombre: 'John Doe' }
        resolve(usuario)
      } else {
        reject(new Error('El usuario no existe'))
      }
    }, 2000)
  })
}

obtenerUsuario(1)
  .then(usuario => {
    console.log(usuario)
  })
  .catch(error => {
    throw new Error(error)
  })
