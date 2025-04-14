// recibir el input
// procesar el input
// buscar la data en caso de que sea apto y tenga el permiso
// devolverle la data al usuario

// pedirle al usuario que indique que si quiere la lista de usuarios debe indicarlo mediante el comando "getUsers"
// validar credencial

import { usuarios } from "./usuarios.js"

const argumentos = process.argv.slice(2)
const accion = argumentos[0]

switch (accion) {
  case "getUsers":
    console.log(usuarios)
    break;

  case "getUser":
    const usuario = usuarios.find((u) => u.id === Number(argumentos[1]))
    if (usuario === undefined) {
      console.log("Usuario no encontrado...")
    } else {
      console.log(usuario)
    }
    break;

  case "createUser":
    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre: argumentos[1],
      email: argumentos[2],
      rol: argumentos[3]
    }
    usuarios.push(nuevoUsuario)
    console.log(usuarios)
    break;

  case "deleteUser":
    const idAEliminar = Number(argumentos[1])
    let usuarioBorrado = null

    const usuariosActualizados = usuarios.filter((u) => {
      if (u.id === idAEliminar) {
        usuarioBorrado = u // capturamos al que vamos a eliminar
        return false // lo excluimos del nuevo array
      }
      return true // los demás quedan
    })

    if (usuarioBorrado) {
      console.log("Usuario eliminado correctamente:")
      console.log(usuarioBorrado)
      console.log("Lista actualizada de usuarios:")
      console.log(usuariosActualizados)
    } else {
      console.log("Usuario no encontrado...")
    }
    break;

  default:
    console.log("401 Unauthorized")
    break;
}
