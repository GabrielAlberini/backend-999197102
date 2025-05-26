import express from "express"
import { productRouter } from "./routes/productRouter"
import { connectDb } from "./config/connectMongoDb"

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()

app.use("/api/products", productRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en funcionamiento en el puerto ${PORT}.`)
  connectDb()
})