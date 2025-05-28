import express from "express"
import { productRouter } from "./routes/productRouter"
import { connectDb } from "./config/connectMongoDb"
import cors from "cors"

process.loadEnvFile()

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/products", productRouter)

app.listen(PORT, () => {
  console.log(`✅ Servidor HTTP en funcionamiento en el puerto ${PORT}.`)
  connectDb()
})