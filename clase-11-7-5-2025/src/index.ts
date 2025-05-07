// crear la conexión y luego para crear el modelo
import { Schema, model, connect } from "mongoose"

process.loadEnvFile()

const URI_DB = process.env.URI_DB || ""

const connectMongoDb = async () => {
  try {
    await connect(URI_DB)
    console.log("✅ Conectado a MongoDB")
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB')
  }
}

interface IFilm {
  title: string
  year: number
  rating: number
  gender: string
}

const filmSchema = new Schema({
  title: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  gender: { type: String, required: true }
}, {
  versionKey: false
})

const Film = model("Film", filmSchema)

// Crear un nuevo documento en la base de datos.
const addNewFilm = async (newFilm: IFilm) => {
  try {
    const { title, year, rating, gender } = newFilm
    if (!title || !year || !rating || !gender) {
      return { success: false, error: "invalid data" }
    }

    const newFileToDb = new Film({ title, year, rating, gender })
    await newFileToDb.save()
    return {
      success: true,
      data: newFileToDb,
      message: "movie added successfully"
    }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Obtener todos los documentos de la colección.
const getFilms = async () => {
  try {
    const films = await Film.find()
    return {
      success: true,
      data: films,
      message: "films successfully recovered"
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

// Obtener un documento por su ID.
const getFilm = async (id: string) => {
  try {
    const foundFilm = await Film.findById(id)
    if (!foundFilm) {
      return {
        success: false,
        message: "film not found"
      }
    }

    return {
      success: true,
      data: foundFilm,
      messge: "film successfully recovered"
    }
  } catch (error) {

  }
}

// Actualizar un documento existente.
const updateFilm = async (id: string, newData: Partial<IFilm>) => {
  try {
    const updatedFilm = await Film.findByIdAndUpdate(id, newData, { new: true })
    if (!updatedFilm) return { succes: false, message: "film not found" }

    return {
      success: true,
      data: updatedFilm,
      message: "film successfully updated"
    }
  } catch (error: any) {
    return {
      success: false,
      error: error.message
    }
  }
}

// Eliminar un documento por su ID.
const deleteFilm = async (id: string) => {
  try {
    const deletedFilm = await Film.findByIdAndDelete(id)
    if (!deletedFilm) return { success: false, mesage: "film not found" }
    return {
      success: true,
      data: deletedFilm,
      message: "film successfully deleted"
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message
    }
  }
}


const main = async () => {
  connectMongoDb()

  // const savedFilm = await addNewFilm({ title: "La sustancia", year: 2022, rating: 7.2, gender: "acción" })
  const films = await getFilms()
  // const film = await getFilm("681b618b78f0a72ea181f43c")
  // const updatedFilmd = await updateFilm("681b618b78f0a72ea181f43b", { rating: 10 })
  // const deletedFilm = await deleteFilm("681b618b78f0a72ea181f43b")

  console.log(films)
}

main()
