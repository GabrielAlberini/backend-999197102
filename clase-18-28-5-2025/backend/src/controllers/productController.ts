import { Request, Response } from "express"
import { Product } from "../models/productModel"

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Product.find()
    res.json({
      success: true,
      message: "obteniendo los productos",
      data: products
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const addNewProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body
    const newProduct = new Product(body)
    await newProduct.save()

    res.status(201).json({
      success: true,
      message: "producto creado con éxito",
      data: newProduct,
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

export { getAllProducts, addNewProduct }