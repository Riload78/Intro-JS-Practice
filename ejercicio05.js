/*
Ejercicio 5:
Catálogo Musical
Imagina que estás creando un sistema de gestión para un catálogo musical.
Cada canción tiene las siguientes propiedades:
    Nombre de la Canción
    Género
    Duración(en minutos)

Implementa un programa que permita realizar las siguientes operaciones:
    * Agregar Canción: Permite al usuario ingresar información sobre una nueva canción yagrégala al catálogo.
    * Listar Canciones: Muestra en la consola la información detallada de todas las cancionesen el catálogo.
                    Si el catálogo está vacío, imprime un mensaje indicando que no hay canciones.
    * Buscar Canciones por Género: Pide al usuario que ingrese un género y muestra en la consola todas las canciones de ese género.
    * Calcular Promedio de Duración: Calcula y muestra en la consola el promedio de laduración de todas las canciones en el catálogo. (opcional)
*/

const songs = {
  0: { name: 'Canción 1', genre: 'Pop', duration: 2.34 },
  1: { name: 'Canción 2', genre: 'Rock', duration: 1.89 },
  2: { name: 'Canción 3', genre: 'Soul', duration: 3.67 }
}

class Catalog {
  constructor () {
    this.catalog = []
  }

  getCatalog () {
    // return this.catalog
    if (!this.catalog.length) {
      console.log('No hay canciones')
    } else {
      for (const i in this.catalog) {
        const song = this.catalog[i]
        console.log(`Nombre: ${song.name}, Genero: ${song.genre}, Duracion: ${song.duration
          }`)
      };
    }
  }

  setCatalog (value) {
    this.catalog = value
  }

  agregarCancion (data) {
    if (this.validateEntry(data)) {
      // find new ID
      const newId = Object.keys(this.catalog).length
      // create object with data and id
      const newObj = { ...data, id: newId }
      console.log(newObj)
      // add to catalog
      this.catalog.push(newObj)
    } else {
      throw new Error('El dato no contiene el formato correcto')
    }
  }

  listarCanciones () {
    console.log('Entro en listar')
    if (!Object.values(this.catalog).length) {
      console.log('No hay canciones')
    } else {
      console.log('lista canciones:', this.catalog)
    }
  }

  buscarPorGenero (genero) {
    const filterSongs = this.catalog.filter(song => song.genre === genero)
    console.log('listbyGender:', filterSongs)
  }

  calcularPromedioDuración (data) {
    console.log('Entro en promedio')
  }

  eliminarCancion (id) {

  }

  validateEntry (data) {
    if (typeof (data) !== 'object') throw new Error('El dato debe de ser un objeto')
    const structure = ['name', 'genre', 'duration']
    let isValid = true
    for (const field of structure) {
      if (!(field in data)) {
        isValid = false
      }
    }
    return isValid
  }
}

const myCatalog = new Catalog()

myCatalog.agregarCancion(songs[0])
myCatalog.listarCanciones()
myCatalog.buscarPorGenero()
myCatalog.calcularPromedioDuración()
myCatalog.agregarCancion(songs[1])
myCatalog.listarCanciones()
myCatalog.getCatalog()
myCatalog.buscarPorGenero('Pop')
console.log('************************************')
// Acceso a la clase a traves del prototype
console.log(typeof (Catalog))
console.log(Catalog.prototype.agregarCancion)
console.log(Object.getOwnPropertyNames(Catalog.prototype))

module.exports = Catalog
