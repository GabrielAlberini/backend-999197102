import { Router } from "express"
import { addNewProduct, getAllProducts } from "../controllers/productController"

const productRouter = Router()

// manejar las peticiones para los productos
productRouter.get("/", getAllProducts)
productRouter.post("/", addNewProduct)

export { productRouter }