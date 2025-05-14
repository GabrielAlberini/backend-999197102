import { connect, Schema, model } from "mongoose"
process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

// las función asincrónicas retornan una promesa: se resuelve pasado un tiempo
// si la función se resuelve de forma deseada se ejecuta el TRY
// si la función NO se resuelve de forma deseada se ejecuta el CATCH
const connectMongoDb = async () => {
  try {
    await connect(URI_DB)
    console.log("✅ Conectado a Mongo DB con éxito")
  } catch (error) {
    console.log("❌ Error al conectarse a Mongo DB")
  }
}

connectMongoDb()

// un schema es un contrato, TODA petición pasa de antemano por el modelo de datos
// que valida la estructa de todo tipo de información que se dirige a la base de datos
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, {
  versionKey: false
})

const User = model("User", userSchema)

interface IUser {
  username: string
  password: string
  email: string
}

// obtener todos los usuarios
const getAllUser = async () => {
  try {
    const users = await User.find()
    return {
      success: true,
      data: users,
      message: "obetener todos los usuarios"
    }
  } catch (error) {
    // el error es una instancia de la clase Error
    const e = error as Error
    return {
      success: false,
      error: e.message
    }
  }
}

// obtener un usuario por su id
const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      return {
        success: false,
        message: "usuario no encontrado"
      }
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      error: e.message
    }
  }
}

// crear nuevo usuario
const createUser = async (newUserData: IUser) => {
  try {
    // validar newUserData
    const { username, password, email } = newUserData

    const newUser = new User({ username, password, email })

    await newUser.save()

    return {
      success: true,
      data: newUser,
      message: "usuario creado con éxito"
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      error: e.message
    }
  }
}

// actualizar un usuario
const updateUser = async (id: string, data: Partial<IUser>) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
    if (updatedUser) {
      return {
        success: false,
        message: "usuario no encontrado"
      }
    }
    return {
      success: true,
      data: updatedUser,
      message: "usuario actualizado con éxito"
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      error: e.message
    }
  }
}
// borrar un usuario
const deleteUser = async (id: string) => {
  try {
    const deletedUser = await User.findByIdAndDelete(id)
    if (!deletedUser) {
      return {
        success: false,
        message: "usuario no encontrado"
      }
    }
    return {
      success: true,
      data: deletedUser._id,
      message: "usuario borrado con éxito"
    }
  } catch (error) {
    const e = error as Error
    return {
      success: false,
      error: e.message
    }
  }
}

const main = async () => {
  const users = await getAllUser()
  // const user = await getUserById("6821fd1225f")
  // const user = await createUser({ username: "maria", email: 1, password: "maria123" })
  // const user = await updateUser("6821ffc0f44bddfb549e2679", { email: "pablonuevo@gmial.com" })
  // const user = await deleteUser("6821ffc0f44bddfb549e2679")
  console.log(users)
}

main()