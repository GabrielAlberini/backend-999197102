import mongoose from "mongoose"

// función encargada de conectarme con la base de datos
const connectDB = async () => {
  await mongoose.connect("mongodb://localhost:27017/utn-backend-30-4")
  console.log("Conectado a mongodb con éxito")
}

export { connectDB }