import { connectDB } from "./config/mongo"
import { Schema, model } from "mongoose"

// código asíncrono
// async function
connectDB()

// definir un esquema
// luego para cada acción del crud, una función

// un esquema es un molde, es una forma de validar los datos que enviamos a mongodb
// es decir un usuario debería tener: name, email y age

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
}, {
  versionKey: false
})

const User = model("User", userSchema)

// el módel sirve tambien para validar todas nuestras peticiones

// crear usuario
const createUser = async (name: string, email: string, age: number) => {
  const user = new User({ name, email, age })
  await user.save()
  console.log("Usuario creado:", user)
}

const getUsers = async () => {
  const users = await User.find()
  console.log(users)
}

const deleteUser = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id)
  console.log(deletedUser)
}

// cuál es el usuario a actualizar -> id
// qué es lo que voy a actualizar -> objeto con las nuevas actualizaciones

// {
//   age: "28"
// }

interface DataUser { name: string; email: string; age: number }

const updateUser = async (id: string, data: Partial<DataUser>) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
  console.log(updatedUser)
}

updateUser("68122d4ece0c2c701c44cd3d", { age: 28 })