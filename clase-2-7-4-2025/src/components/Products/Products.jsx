import { useEffect, useState } from "react"
import "./Products.css"

const Products = () => {
  const [products, setProducts] = useState([])
  const [newProducto, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: ""
  })

  const fetchingProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products")
    const products = await response.json()
    setProducts(products)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setNewProduct((prevValue) => (
      { ...prevValue, [name]: value }
    ))
  }

  const handleSubmit = async (evento) => {
    evento.preventDefault()
    console.log("Enviando formulario!")

    // CAPTURAR DATOS DEL FORM
    console.log(newProducto)

    // ENVIARLO AL BACKEND
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({ ...newProducto, price: Number(newProducto.price) }),
      headers: { "Content-Type": "application/json" }
    })

    const data = await response.json()
    console.log(data, "<-- nuevo producto")

    setProducts((prevProducts) => (
      [...prevProducts, data]
    ))

    setNewProduct({
      title: "",
      price: "",
      description: "",
      category: "",
      image: ""
    })
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  return (
    <div className="container">
      <h2>Productos</h2>
      <div className="grid">
        {
          products.map(product => (
            <div className="card" key={product.id}>
              <h2>{product.title}</h2>
              <img src={product.image} alt="" />
              <h3>Price: {product.price}</h3>
              <p>{product.description}</p>
            </div>
          ))
        }
      </div>
      <section>
        <h2>Añadir producto</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="Ingrese el nombre" onChange={handleChange} value={newProducto.title} />
          <input type="number" name="price" id="" placeholder="Ingrese el precio" onChange={handleChange} value={newProducto.price} />
          <input type="text" name="description" placeholder="Ingrese la descripción" onChange={handleChange} value={newProducto.description} />
          <input type="text" name="category" id="" placeholder="Ingrese la categoria" onChange={handleChange} value={newProducto.category} />
          <input type="text" name="image" placeholder="Ingrese la URL de la imagen" onChange={handleChange} value={newProducto.image} />

          <button>Agregar producto</button>
        </form>
      </section>
    </div>
  )
}

export { Products }