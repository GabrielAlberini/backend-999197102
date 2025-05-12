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

  } catch (error) {

  }
}

// obtener un usuario por su id
const getUserById = async (id: string) => {
  try {

  } catch (error) {

  }
}

// crear nuevo usuario
const createUser = async (newUserData: IUser) => {
  try {

  } catch (error) {

  }
}

// actualizar un usuario
const updateUser = async (id: string, data: Partial<IUser>) => {
  try {

  } catch (error) {

  }
}
// borrar un usuario
const deleteUser = async (id: string) => {
  try {

  } catch (error) {

  }
}

const main = async () => {
}

main()