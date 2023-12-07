/* eslint-disable no-undef */
const Catalog = require('../ejercicio05')

describe('TDD Catalog Class', () => {
  test('should be defined', () => {
    expect(new Catalog()).toBeDefined()
  })
  test('add song test entry param must be a object, Trown error if not', () => {
    // const song = { name: 'Test 1', genre: 'Pop', duration: 2.34 }
    const song = 'aaaa'
    const catalog = new Catalog()
    expect(() => catalog.agregarCancion(song)).toThrow()
  })
  test('La función agregarCancion recibe un objeto de canción válido', () => {
    const cancion = {
      name: 'Canción 1',
      genre: 'Pop',
      duration: 2.34
    }
    const catalog = new Catalog()

    expect(() => catalog.agregarCancion(cancion)).not.toThrow() // Verifica que no lance una excepción
    expect(catalog.validateEntry(cancion)).toBe(true) // Verifica que la función devuelve el objeto esperado
  })

  test('La función agregarCancion lanza un error si el objeto no es válido', () => {
    const cancionInvalida = {
      name: 'Canción 1',
      genre: 'Pop'
      // duration falta en este objeto
    }
    const catalog = new Catalog()

    expect(() => catalog.agregarCancion(cancionInvalida)).toThrow() // Verifica que lance una excepción
  })
})
