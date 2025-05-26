import express from "express"
import { connect, model, Schema } from "mongoose"

process.loadEnvFile()

const PORT = process.env.PORT || 3000
const URI_DB = process.env.URI_DB || ""

const app = express()
app.use(express.json())

// Conexión a la base de datos
const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log("✅ Conectado a Mongo DB")
  } catch (error) {
    console.log("🛑 Error al conectarse a Mongo DB")
  }
}

// Esquema de usuario
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user", "guest"], default: "user" }
}, {
  versionKey: false,
  timestamps: true
})

const User = model("User", userSchema)

// GET todos los usuarios
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find()
    res.json({ success: true, data: users, message: "Usuarios obtenidos" })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
})

// GET usuario por ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" })
    }
    res.json({ success: true, data: user, message: "Usuario obtenido" })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
})

// POST crear usuario
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body)
    const savedUser = await newUser.save()
    res.status(201).json({ success: true, data: savedUser, message: "Usuario creado" })
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message })
  }
})

// PUT actualizar usuario
app.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" })
    }
    res.json({ success: true, data: updatedUser, message: "Usuario actualizado" })
  } catch (error) {
    res.status(400).json({ success: false, message: (error as Error).message })
  }
})

// DELETE eliminar usuario
app.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" })
    }
    res.json({ success: true, data: deletedUser, message: "Usuario eliminado" })
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message })
  }
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en funcionamiento en el puerto ${PORT}.`)
  connectDb()
})
