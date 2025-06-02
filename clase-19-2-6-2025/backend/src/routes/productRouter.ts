import { Router } from "express"
import { addNewProduct, getAllProducts, deleteProduct, updateProduct } from "../controllers/productController"

const productRouter = Router()

// manejar las peticiones para los productos
productRouter.get("/", getAllProducts)
productRouter.post("/", addNewProduct)
productRouter.delete("/:id", deleteProduct)
productRouter.patch("/:id", updateProduct)

export { productRouter }