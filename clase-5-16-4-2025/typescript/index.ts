// una interface funciona como molde
// una irnterface es un CONTRATO
interface User {
  id: number
  firstName: string
  lastName: string
  course: string
  rol?: "estudiante" | "tutor" | "profesor"
}

const user1: User = {
  id: 1,
  firstName: "Maria",
  lastName: "Cacere",
  course: "Backend Web",
  rol: "estudiante"
}

const { id, firstName, lastName, course } = user1

console.log(`Hola soy ${firstName} ${lastName} y participo en el curso de ${course}`)

const crearUsuario = (
  id: number,
  firstName: string,
  lastName: string,
  course: string,
  rol: User["rol"]
): User => {
  // usar los parametros para crear el usuario
  const newUser = { id, firstName, lastName, course, rol }
  return newUser
}

const idUser2 = 2
const firstName2 = "Pablo"
const lastName2 = "Caparelli"
const course2 = "Frontend Web"
const rol2 = "tutor"

// los argumentos son los datos pasados a la función
const usuario2 = crearUsuario(idUser2, firstName2, lastName2, course2, rol2)
console.log(usuario2)