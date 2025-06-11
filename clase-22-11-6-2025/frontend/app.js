const message = document.querySelector(".message")
const productsList = document.querySelector("#products-list")
const form = document.querySelector("form")
const submitButton = form.querySelector("button")
const name = document.getElementById("name")
const price = document.getElementById("price")
const category = document.getElementById("category")

const BASE_URL_API = "http://localhost:1234/api/products"

let isEditing = false
let idToEdit = null

const fetchingProducts = async () => {
  try {
    const response = await fetch(BASE_URL_API, {
      method: "GET"
    })

    const responseData = await response.json()

    productsList.innerHTML = ""

    responseData.data.forEach((product) => {
      const li = document.createElement("li")
      li.textContent = product.name
      const divButton = document.createElement("div")
      const deleteButton = document.createElement("button")
      deleteButton.textContent = "Borrar"
      const updateButton = document.createElement("button")
      updateButton.textContent = "Actualizar"
      deleteButton.addEventListener("click", () => {
        deleteProduct(product._id)
      })
      updateButton.addEventListener("click", () => {
        handleUpdateDataProduct(product)
      })
      divButton.appendChild(updateButton)
      divButton.appendChild(deleteButton)
      li.appendChild(divButton)
      productsList.appendChild(li)
    })
  } catch (err) {
    message.textContent = err.message
    console.log(err)
  }
}

const deleteProduct = async (id) => {
  // Incorporar lógica para borrar el producto
  // Luego de borrar el producto, renderizar la lista nuevamente de productos actualizados
  if (confirm("Realmente quieres borrar esta tarea?")) {
    await fetch(`${BASE_URL_API}/${id}`, {
      method: "DELETE"
    })
    fetchingProducts()
  }
}

const handleUpdateDataProduct = async (product) => {
  // Incorporar lógica para actualziar el producto
  // Luego de actualziar el producto, renderizar la lista nuevamente de productos actualizados
  submitButton.textContent = "Actualizar producto"

  name.value = product.name
  price.value = product.price
  category.value = product.category

  isEditing = true
  idToEdit = product._id
}

const handleSubmit = async (event) => {
  event.preventDefault()
  let response;
  const dataProduct = { name: name.value, price: price.value, category: category.value }


  try {
    if (!isEditing) {
      response = await fetch("http://localhost:1234/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataProduct)
      })
    } else {
      submitButton.textContent = "Agregar producto"

      response = await fetch(`${BASE_URL_API}/${idToEdit}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataProduct)
      })

      isEditing = false
      idToEdit = null
    }

    name.value = ""
    price.value = ""
    category.value = ""

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message)
    }

    fetchingProducts()
  } catch (error) {
    message.textContent = error.message
  }
}

form.addEventListener("submit", handleSubmit)

fetchingProducts()