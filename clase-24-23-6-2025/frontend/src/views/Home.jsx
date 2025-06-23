import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"

const Home = () => {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])

  // realizar la petición fetch
  // mostrar en el home la lista de productos

  const fetchProducts = async () => {
    const response = await fetch("http://localhost:1234/api/products")
    const responseToJson = await response.json()

    if (response.ok) {
      setProducts(responseToJson.data)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <Layout>
      <h1>Bienvenido a nuestra tienda de productos artesanales</h1>
      <p>Descubrí nuestra selección exclusiva de productos únicos hechos a mano. Calidad y diseño en cada detalle.</p>
      <section>
        {
          products.map(product => (
            <div key={product._id}>
              <p><b>ID:</b> {product._id}</p>
              <p><b>Nombre:</b> {product.name}</p>
              <p><b>Precio:</b> {product.price}</p>
              <p><b>Categoria:</b> {product.category}</p>
              {
                user && <div>
                  <button>Actualizar</button>
                  <button>Borrar</button>
                </div>
              }
            </div>
          ))
        }
      </section>
    </Layout>
  )
}

export { Home }