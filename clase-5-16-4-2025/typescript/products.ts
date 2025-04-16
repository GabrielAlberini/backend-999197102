import crypto from "node:crypto"

interface Product {
  id: string
  name: string
  price: number
  stock: boolean
  colors?: string[]
}

// UUID -> universal unique identiquer
// 67ffb596-5c8c-8013-882b-f17222fd3dfd

// un id tiene que tenes las siguientes caracteristicas:
// debe ser único
// no puede cambiar
// no se puede repetir

const createProduct = (id: string, name: string, price: number, stock: boolean): Product => {
  return { id, name, price, stock }
}

const pc = createProduct(crypto.randomUUID(), "PC", 1000, true)
const mobile = createProduct(crypto.randomUUID(), "Xiaomi", 200, false)
const table = createProduct(crypto.randomUUID(), "XL Table", 400, true)

const product4 = {
  id: crypto.randomUUID(),
  name: "mouse",
  price: 45,
  stock: true,
  colors: ["red", "black"]
}

const products: Product[] = [pc, mobile, table, product4]

console.log(products)

const foundProduct = products.find(product => product.name === "chair")

if (foundProduct) {
  console.log(`La ${foundProduct.name}, tiene un costo de $${foundProduct.price}.`)
} else {
  console.log(`Producto no existente...`)
}