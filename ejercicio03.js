const datos = [
  {
    id: 1,
    nombre: 'Juan',
    habilidades: ['JavaScript', 'HTML', 'CSS'],
    proyectos: [
      { id: 1, nombre: 'Proyecto 1' },
      { id: 2, nombre: 'Proyecto 2' }
    ]
  },
  {
    id: 2,
    nombre: 'María',
    habilidades: ['Python', 'SQL', 'Django'],
    proyectos: [
      { id: 3, nombre: 'Proyecto 3' },
      { id: 4, nombre: 'Proyecto 4' }
    ]
  },
  {
    id: 3,
    nombre: 'Pedro',
    habilidades: ['Java', 'Spring', 'Hibernate'],
    proyectos: [
      { id: 5, nombre: 'Proyecto 5' },
      { id: 6, nombre: 'Proyecto 6' }
    ]
  }
]

/**
 * Get develops who works with JS
 * @param {object} data
 * @returns {object}
 */

const getDevelopJs = (data) => {
  for (const dev of data) {
    const abilityes = dev.habilidades
    for (const ability of abilityes) {
      if (ability === 'JavaScript') {
        return dev
      }
    }
  }
}

/**
 * Return proyects list
 * @param {object} data
 * @returns {object}
 */

const nameProyects = (data) => {
  const proyectList = []
  for (const dev of data) {
    const proyects = dev.proyectos
    for (const project of proyects) {
      proyectList.push(project.nombre)
    }
  }
  return proyectList
}

const devJs = getDevelopJs(datos)
console.log(devJs)

const listProyects = nameProyects(datos)
console.log(listProyects)
