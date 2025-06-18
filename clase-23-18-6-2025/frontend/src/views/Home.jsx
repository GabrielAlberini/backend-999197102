import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"

const Home = () => {
  const [products, setProducts] = useState([])

  // realizar la petición fetch
  // mostrar en el home la lista de productos

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:1234/api/products")
    const responseToJson = await response.json()

    setProducts(responseToJson.data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  console.log(products)

  return (
    <Layout>
      <h1>Bienvenido a nuestra tienda de productos artesanales</h1>
      <p>Descubrí nuestra selección exclusiva de productos únicos hechos a mano. Calidad y diseño en cada detalle.</p>
      <section>
        {
          products.map(product => (
            <div>
              <p><b>ID:</b> {product._id}</p>
              <p><b>Nombre:</b> {product.name}</p>
              <p><b>Precio:</b> {product.price}</p>
              <p><b>Categoria:</b> {product.category}</p>
              <div>
                <button>Actualizar</button>
                <button>Borrar</button>
              </div>
            </div>
          ))
        }
      </section>
    </Layout>
  )
}

export { Home }