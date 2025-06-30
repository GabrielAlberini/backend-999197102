// averiguar como usar una variable de entorno en un proyecto de vite/react

// reemplazar por la variable de entorno con la misma data
const BASE_API = "http://localhost:1234/api"

const getProducts = async () => {
  const response = await fetch(BASE_API + "/products")
  return response
}

const createProduct = async ({ name, price, category }) => {
  const response = await fetch(BASE_API + "/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, category })
  })
  return response
}

const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_API}/products/${id}`, {
    method: "DELETE"
  })
  return response
}

export { getProducts, createProduct, deleteProduct }