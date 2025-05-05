import { Schema, model } from "mongoose"
import { connectDb } from "./config/mongo"
connectDb()

interface Book {
  title: string,
  releaseYear: number,
  rating?: number
}

// query -> consulta -> peticion -> queryres -> respuesta de petición
interface QueryRes {
  success: boolean
  message: string
  data?: Book | Book[]
}

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  releaseYear: { type: Number, required: true },
  rating: { type: Number, required: true, default: 0 }
}, {
  versionKey: false
})

const Book = model("Book", bookSchema)

const createRes = (success: boolean, message: string, data?: Book | Book[]): QueryRes => {
  return data ? {
    success,
    message,
    data
  } : {
    success,
    message
  }
}

const getBooks = async () => {
  try {
    const books = await Book.find()
    return createRes(true, "get all books", books)
  } catch (error: any) {
    return createRes(false, error.message)
  }
}

const getBookById = async (id: string) => {
  try {
    const foundBook = await Book.findById(id)
    if (!foundBook) {
      return createRes(false, "error to find book")
    }
    return createRes(true, "found book by id", foundBook)
  } catch (error: any) {
    return createRes(false, error.message)
  }
}

const createBook = async (book: Book): Promise<QueryRes> => {
  try {
    const newBook = new Book(book)
    const addedBook = await newBook.save()
    return createRes(true, "book added successfully", addedBook)
  } catch (error: any) {
    return createRes(false, error.message)
  }
}

const updateBook = async (id: string, dataBook: Partial<Book>) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, dataBook, { new: true })
    if (!updateBook) {
      return createRes(false, "error updating the book")
    }
    return createRes(true, "book updated successfully", updatedBook as Book)
  } catch (error: any) {
    return createRes(false, error.message)
  }
}

const deleteBook = async (id: string) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    if (!deletedBook) {
      return createRes(false, "error to delete book")
    }
    return createRes(true, "book successfully deleted", deletedBook)
  } catch (error) {

  }
}

const main = async () => {
  const book = await updateBook("6818c4a141f153fcc8b7b33f", { rating: 10 })
  console.log(book)
}

main()