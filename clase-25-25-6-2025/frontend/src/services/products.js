// averiguar como usar una variable de entorno en un proyecto de vite/react

// reemplazar por la variable de entorno con la misma data
const BASE_API = "http://localhost:1234/api"

const getProducts = async () => {
  const response = await fetch(BASE_API + "/products")
  return response
}

export { getProducts }