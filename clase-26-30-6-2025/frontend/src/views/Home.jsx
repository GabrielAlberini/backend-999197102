import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { getProducts, deleteProduct } from "../services/products"
import { useAuth } from "../context/AuthContext"

const Home = () => {
  const [products, setProducts] = useState([])

  const { user } = useAuth()

  const fetchProducts = async () => {
    const response = await getProducts()
    const responseToJson = await response.json()

    if (response.ok) {
      setProducts(responseToJson.data)
    }
  }

  const handleClick = async (id) => {
    if (confirm("Esta seguro que quieres borrar el producto?")) {
      const response = await deleteProduct(id)
      if (!response.ok) {
        alert("Error al borrar producto.")
      } else {
        alert("Producto borrado con éxito.")
        fetchProducts()
      }
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
              <p><b>Nombre:</b> {product.name}</p>
              <p><b>Precio:</b> {product.price}</p>
              <p><b>Categoria:</b> {product.category}</p>
              {
                user && <div className="cont-button-product">
                  <button onClick={() => handleClick(product._id)}>Borrar</button>
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