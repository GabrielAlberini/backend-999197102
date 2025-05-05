import { connect } from "mongoose"
process.loadEnvFile()

const connectDb = async () => {
  try {
    const URI_DB = process.env.URI_DB || ""
    await connect(URI_DB)
    console.log("Conectado éxitosamente a mongodb")
  } catch (error: any) {
    console.log("No se puede conectar a mongodb:", error.message)
  }
}

export { connectDb }