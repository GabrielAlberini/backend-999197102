import express from "express"
import { connectDb } from "./config/connectMongoDb"

import { productRouter } from "./routes/productRouter"
import { authRouter } from "./routes/authRouter"

import cors from "cors"

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/products", productRouter)
// auth -> authorization
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en funcionamiento en el puerto ${PORT}.`)
  connectDb()
})