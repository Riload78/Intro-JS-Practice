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
  2: { name: 'Canción 3', genre: 'Soul', duration: 3.67 },
  3: { name: 'Canción 3', genre: 'Soul' }
}

class Catalog {
  constructor () {
    this.catalog = []
  }

  getCatalog () {
    if (!this.catalog.length) {
      console.log('No hay canciones')
    } else {
      for (const i in this.catalog) {
        const song = this.catalog[i]
        console.log(`Nombre: ${song.name}, Genero: ${song.genre}, Duracion: ${song.duration}`)
      };
    }
  }

  setCatalog (value) {
    this.catalog = value
  }

  agregarCancion (data) {
    if (this.validateEntry(data)) {
      const newId = Object.keys(this.catalog).length
      const newObj = { ...data, id: newId }
      this.catalog.push(newObj)
    } else {
      throw new Error('El dato no contiene el formato correcto')
    }
  }

  listarCanciones () {
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

  calcularPromedioDuración () {
    let promedio = 0
    let duration = 0
    for (const item of this.catalog) {
      duration += item.duration
    }
    promedio = duration / this.catalog.length
    console.log('Promedio:', promedio)
  }

  eliminarCancion (id) {
    const deleteSong = this.catalog.filter(song => song.id === id)
    if (deleteSong.length) {
      const updateSongs = this.catalog.filter(song => song.id !== id)
      this.setCatalog(updateSongs)
    } else {
      console.log('No existe la canción que quieres eliminar')
    }
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
myCatalog.agregarCancion(songs[1])
myCatalog.listarCanciones()
myCatalog.buscarPorGenero('Pop')
myCatalog.listarCanciones()
myCatalog.eliminarCancion(0)
myCatalog.listarCanciones()
myCatalog.agregarCancion(songs[2])
myCatalog.listarCanciones()
myCatalog.calcularPromedioDuración()
myCatalog.getCatalog()

// Add song with wrong format force throw error
// myCatalog.agregarCancion(songs[3])

console.log('************************************')
// Acceso a la clase a traves del prototype
console.log(typeof (Catalog))
console.log(Catalog.prototype.agregarCancion)
console.log(Object.getOwnPropertyNames(Catalog.prototype))

module.exports = Catalog
