import { usuarios } from "./usuarios.js"

// Función para mostrar todos los usuarios
const mostrarUsuarios = () => {
  console.log(usuarios)
}

// Función para buscar un usuario por id
const obtenerUsuario = (id) => {
  const usuario = usuarios.find((u) => u.id === id)
  if (!usuario) {
    console.log("Usuario no encontrado...")
  } else {
    console.log(usuario)
  }
}

// Función para crear un nuevo usuario
const crearUsuario = (nombre, email, rol) => {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email,
    rol
  }
  usuarios.push(nuevoUsuario)
  console.log("Nuevo usuario creado:", nuevoUsuario)
}

// Función para eliminar un usuario
const eliminarUsuario = (id) => {
  let usuarioBorrado = null
  const usuariosActualizados = usuarios.filter((u) => {
    if (u.id === id) {
      usuarioBorrado = u
      return false
    }
    return true
  })

  if (usuarioBorrado) {
    console.log("Usuario eliminado correctamente:", usuarioBorrado)
    console.log("Lista actualizada de usuarios:", usuariosActualizados)
  } else {
    console.log("Usuario no encontrado...")
  }
}

// Función para validar argumentos
const validarArgumentos = (args) => {
  if (!args || args.length < 2) {
    console.log("Argumentos insuficientes.")
    return false
  }
  return true
}

const argumentos = process.argv.slice(2)
const accion = argumentos[0]

// Validación de acción
if (!validarArgumentos(argumentos)) {
  console.log("401 Unauthorized")
} else {
  switch (accion) {
    case "getUsers":
      mostrarUsuarios()
      break

    case "getUser":
      const idUsuario = Number(argumentos[1])
      obtenerUsuario(idUsuario)
      break

    case "createUser":
      const [, nombre, email, rol] = argumentos
      crearUsuario(nombre, email, rol)
      break

    case "deleteUser":
      const idAEliminar = Number(argumentos[1])
      eliminarUsuario(idAEliminar)
      break

    default:
      console.log("401 Unauthorized")
      break
  }
}
