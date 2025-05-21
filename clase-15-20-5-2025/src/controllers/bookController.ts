import { Book } from "../models/bookModel"
import { Request, Response } from "express"

const getAllBooks = async (request: Request, response: Response): Promise<any> => {
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
}

const createBook = async (req: Request, res: Response): Promise<any> => {
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
}

const deleteBook = async (req: Request, res: Response): Promise<any> => {
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
}

const updateBook = async (req: Request, res: Response): Promise<any> => {
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
}

export { getAllBooks, createBook, deleteBook, updateBook }