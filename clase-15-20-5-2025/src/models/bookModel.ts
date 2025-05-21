// define el esquema de datos para la base de datos

import { Schema, model } from "mongoose"

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  year: { type: Number, required: true }
})

const Book = model("Book", bookSchema)

export { Book }