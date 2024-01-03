/*
Crea un archivo ejercicio1.js que tenga un objeto usuario con los siguientes campos:
- Nombre(el tuyo o inventado
- Apellidos(el tuyo o inventado)
- Una lista con los temas del bootcamp Node.js, Git y react con sus nombres y fechasde inicio de cada módulo.
  Fecha en formato “YYYY - MM - DD”
- Si estás en busqueda activa con un valor de verdadero o false

En este archivo queremos mostrar por pantalla la fecha de inicio del módulo de react
del objeto que hemos creado anteriormente
*/
const user = {
  name: 'Ricardo',
  lastname: 'López Alonso',
  bootcamp: [
    { subject: 'Js', date: '2023-01-01' },
    { subject: 'Html', date: '2023-02-01' },
    { subject: 'Css', date: '2023-04-01' },
    { subject: 'React', date: '2023-05-01' },
    { subject: 'Nodejs', date: '2023-06-01' },
    { subject: 'Express', date: '2023-07-01' },
    { subject: 'Mongoose', date: '2023-08-01' }
  ],
  isActive: false
}

/**
 * Get Subjet Date
 * @param {object} user
 * @param {string} subject
 */

const getDate = (user, subject) => {
  for (const key in user) {
    if (key === 'bootcamp') {
      const arraySubjects = user[key]
      for (const item of arraySubjects) {
        if (item.subject === subject) {
          return `La fecha de inicio del modulo de ${subject} es ${item.date}`
        }
      }
    }
  }
}

/**
 * Get Subjet Date with .find
 * @param {object} user
 * @param {string} subject
 */

const getDateFind = (user, subject) => {
  const data = user.bootcamp.find(bootcamp => bootcamp.subject === subject)
  return `La fecha de inicio del modulo de ${data.subject} es ${data.date}`
}

console.log(getDate(user, 'React'))

console.log(getDateFind(user, 'React'))
