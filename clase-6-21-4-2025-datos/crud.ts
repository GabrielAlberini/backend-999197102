// crear un usario
// obtener usuarios
// borrar usuario

import fileSystem from "node:fs"
import crypto from "node:crypto"

// Crear interface de usuario y tipar sistema

const readDatabase = () => {
  const dataInBaffer = fileSystem.readFileSync("./users.json", "utf-8")
  const users = JSON.parse(dataInBaffer)
  return users
}

const writeDatabase = (newData: any) => {
  fileSystem.writeFileSync("./users.json", JSON.stringify(newData))
  return "Base de datos actualizada!"
}

const createUser = (name: string, password: string) => {
  const newUser = {
    id: crypto.randomUUID(),
    name,
    password
  }

  const users = readDatabase()
  // lista de usuarios en su ultima versión (con el usuario creado agregado)
  users.push(newUser)
  writeDatabase(users)
  console.log("Usuario creado con éxito")
}

const getUsers = (email: string, pass: string) => {
  const emailInDb = "gabi@gmail.com"
  const passInDb = "pepe123"

  if (email === emailInDb && pass === passInDb) {
    return readDatabase()
  } else {
    return "Credenciales incorrectas"
  }
}

// Comunicar que el usuario no éxiste en caso de que no se encuentre mediante su ID
const deleteUser = (id: string) => {
  const users = readDatabase()

  // Validar que el usuario exista en la base de datos antes de borrarlo
  const foundUser = users.find((user: any) => user.id === id)

  if (foundUser === undefined) {
    return "Usuario no encontrado"
  }

  const newUsers = users.filter((user: any) => user.id !== id)
  writeDatabase(newUsers)
  return "Usuario borrado con éxito"
}


console.log(getUsers("gabi@gmail.com", "pepe123"))