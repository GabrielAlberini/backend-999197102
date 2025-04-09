// recibir el input
// procesar el input
// buscar la data en caso de que sea apto y tenga el permiso
// devolverle la data al usuario

// pedirle al usuario que indique que si quiere la lista de usuarios debe indicarlo mediante el comando "getUsers"
// validar credencial

import { usuarios } from "./usuarios.js"

const argumentos = process.argv.slice(2)

if (argumentos[0] === "getUsers") {
  console.log(usuarios)
} else if (argumentos[0] === "getUser") {
  const usuario = usuarios.find((u) => u.id === Number(argumentos[1]))
  if (usuario === undefined) {
    console.log("Usuario no encontrado...")
  } else {
    console.log(usuario)
  }
} else if (argumentos[0] === "createUser") {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: argumentos[1],
    email: argumentos[2],
    rol: argumentos[3]
  }
  usuarios.push(nuevoUsuario)
  console.log(usuarios)
} else {
  console.log("401 Unauthorized")
}