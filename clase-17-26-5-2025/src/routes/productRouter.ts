import { Router } from "express"
import { getAllProducts } from "../controllers/productController"

const productRouter = Router()

// manejar las peticiones para los productos
productRouter.get("/", getAllProducts)

export { productRouter }