const messages = document.querySelector(".messages")
const productsList = document.querySelector("#products-list")
const form = document.querySelector("form")

const fetchingProducts = async () => {
  try {
    const response = await fetch("http://localhost:1234/api/products", {
      method: "GET"
    })
    const responseData = await response.json()

    productsList.innerHTML = ""

    responseData.data.forEach((product) => {
      const li = document.createElement("li")
      li.textContent = product.name
      const button = document.createElement("button")
      button.textContent = "Borrar producto"
      button.addEventListener("click", () => {
        deleteProduct(product._id)
      })
      li.appendChild(button)
      productsList.appendChild(li)
    })
  } catch (err) {
    messages.textContent = err.message
    console.log(err)
  }
}

const deleteProduct = async (id) => {
  // Incorporar lógica para borrar el producto
  // Luego de borrar el producto, renderizar la lista nuevamente de productos actualizados
  console.log("Borrando producto", id)
}

const updateProduct = async (id, updates) => {
  // Incorporar lógica para actualziar el producto
  // Luego de actualziar el producto, renderizar la lista nuevamente de productos actualizados
}

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  const name = document.getElementById("name").value
  const price = document.getElementById("price").value
  const category = document.getElementById("category").value

  const newProduct = { name, price, category }

  try {
    const response = await fetch("http://localhost:1234/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    })

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    fetchingProducts()
  } catch (error) {
    messages.textContent = error.message
  }
})


fetchingProducts()