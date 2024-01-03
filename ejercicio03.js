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
  let result
  for (const dev of data) {
    const abilityes = dev.habilidades
    for (const ability of abilityes) {
      if (ability === 'JavaScript') {
        result = dev
      }
    }
  }
  return result
}

/**
 * Get develops who works with JS with Find
 * @param {object} data
 * @returns {object}
 */

const getDevelopJsMap = (data) => {
  const result = data.find(item => item.habilidades.includes('JavaScript'))
  return result
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

/**
 * Return proyects list
 * @param {object} data
 * @returns {object}
 */
const nameProjectsMap = (data) => {
  const result = []
  const proyectList = data.map(item => item.proyectos)
  const proyectArr = result.concat(...proyectList)
  const proyectNames = proyectArr.map(proyect => proyect.nombre)
  return proyectNames
}

const devJs = getDevelopJs(datos)
console.log(devJs)

const devJsFind = getDevelopJsMap(datos)
console.log(devJsFind)

const listProyects = nameProyects(datos)
console.log(listProyects)

const listProyectsMap = nameProjectsMap(datos)
console.log(listProyectsMap)
