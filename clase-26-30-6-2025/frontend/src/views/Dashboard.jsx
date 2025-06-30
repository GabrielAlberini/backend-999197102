import { useState } from "react"
import { Layout } from "../components/Layout"
import { createProduct } from "../services/products"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [category, setCategory] = useState("sin categoria")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)

    if (!name || !price || category === "sin categoria") {
      setError("Debes seleccionar valores validos.")
      return
    }

    try {
      const response = await createProduct({ name, price, category })

      if (!response.ok) {
        setError("Error al almacenar el producto.")
        return
      }

      const serverRes = await response.json()

      setName("")
      setPrice(0)
      setCategory("sin categoria")
      setMessage("Producto agregado con éxito ID: " + serverRes.data._id)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  return (
    <Layout>
      <h1>Panel de administración</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre del producto:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="price">Precio del producto:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <label htmlFor="category">Selecciona una categoria de producto:</label>
        <select
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="sin categoria">Sin categoria</option>
          <option value="almacen">Almacen</option>
          <option value="limpieza">Limpieza</option>
        </select>
        <button>Agregar producto</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </Layout>
  )
}

export { Dashboard }