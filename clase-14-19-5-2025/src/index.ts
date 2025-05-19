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
app.use(express.json())
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

// POST - http://localhost:1235/api/books
app.post("/api/books", async (req, res): Promise<any> => {
  try {
    const body = req.body
    const { title, author, year } = body
    if (!title || !author || !year) return res.status(400).json({ success: false, message: "data invalida" })
    const newBook = new Book({ title, author, year })
    const savedBook = await newBook.save()
    res.status(201).json({ success: true, data: savedBook, message: "libro agregado con éxito" })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// DELETE - http://localhost:1235/api/books

app.delete("/api/books/:id", async (req, res): Promise<any> => {
  try {
    const id = req.params.id
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) return res.status(404).json({ success: false, message: "error al borrar el libro" })
    res.json({ success: deletedBook, message: "libro borrado con éxito" })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

app.patch("/api/books/:id", async (req, res): Promise<any> => {
  try {
    const { title, author, year } = req.body
    const updated = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year },
      { new: true }
    )
    if (!updated) return res.status(404).json({ success: false, message: "Libro no encontrado" })
    return res.json({ success: true, data: updated, message: "Libro actualizado" })
  } catch (err) {
    return res.status(500).json({ success: false, message: (err as Error).message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectMongodb()
})
