// bookRouter se encarga de validar método y url

// designar un controlador

import { Router } from "express"
import { Book } from "../models/bookModel"
import { getAllBooks, createBook, deleteBook, updateBook } from "../controllers/bookController"

// TODAS LA PETICIONES QUE LLEGAN AL ROUTER LLEGAN COMO
// HTTP://LOCALHOST:1235/API/BOOKS

const bookRouter = Router()
bookRouter.get("/", getAllBooks)
bookRouter.post("/", createBook)
bookRouter.delete("/:id", deleteBook)
bookRouter.patch("/:id", updateBook)

export { bookRouter }