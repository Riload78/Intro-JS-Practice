/* 
Tenemos otro error que nuestro cliente nos pide arreglar.
El cliente está pidiendo un usuarioy nos dice que está usando el id correcto el 1. 
Pero que siempre le da undefined.
Nos apasado el código que tenemos que revisar y arreglar.
Para este problema crear un archivo llamado bugAsync.js con la solución. 
*/

function obtenerUsuario(id) {
  let usuario;

  if (id === 1) {
    usuario = { id: 1, nombre: 'John Doe' }
  }
  return usuario
}

setTimeout(() => {
  const usuario = obtenerUsuario(1)
  console.log(usuario)
}, 2000)
