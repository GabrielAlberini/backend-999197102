import express from "express"
import { Schema, model } from "mongoose"
import { connectMongodb } from "./config/mongo"
import cors from "cors"

process.loadEnvFile()

//1234
const PORT = process.env.PORT

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  year: { type: Number, required: true }
})

const Book = model("Book", bookSchema)

const app = express()
app.use(cors())

// obtener todos los libros
// http://localhost:1235/api/books
// request -> requerido
// response -> respuesta
app.get("/api/books", async (request, response): Promise<any> => {
  try {
    const books = await Book.find()
    return response.json({
      success: true,
      data: books,
      message: "Obteniendo todos los libros"
    })
  } catch (error) {
    const err = error as Error
    return response.json({
      success: false,
      message: err.message
    })
  }
})

// Método HTTP
// GET - POST - PATCH - DELETE

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectMongodb()
})
