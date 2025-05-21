// crear el servidor http
// será el input del sistema backend

// designar petición al router correcto

import express from "express"

import { connectMongodb } from "./config/mongo"
import cors from "cors"
import { bookRouter } from "./routes/bookRouter"

process.loadEnvFile()

//1234
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/books", bookRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor en escucha en el puerto http://localhost:${PORT}`)
  connectMongodb()
})
