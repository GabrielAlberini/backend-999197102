// Terminar de debbugear el metedo patch

const form = document.querySelector("form")
const btnSubmit = document.getElementById("btn-submit")
const section = document.getElementById("booksList")
const titleInput = document.getElementById("title")
const authorInput = document.getElementById("author")
const yearInput = document.getElementById("year")


let isEditing = false

const fetchingBooks = async () => {
  try {
    // por defecto el fetch es GET
    const response = await fetch("http://localhost:1235/api/books")
    const responseToJson = await response.json()

    section.innerHTML = ""

    responseToJson.data.reverse().forEach((book) => {
      const div = document.createElement("div")
      div.classList.add("book")
      div.innerHTML =
        `<h2>${book.title}</h2>
        <p><b>Autor</b>: ${book.author}</p>
        <p><b>Año de estreno</b>: ${book.year}</p>
        <div class="cont-btn">
          <button onclick="updateBook('${book._id}', '${book.title}', '${book.author}', '${book.year}')" class="btn-update">Actualizar libro</button>
          <button onclick="deleteBook('${book._id}')" class="btn-delete">Borrar libro</button>
        </div>
        `
      section.appendChild(div)
    })
  } catch (error) {
    const div = document.createElement("div")
    div.classList.add("error")
    div.innerHTML = "<h2 style='color: red; text-align: center;'>Error al traer los libros</h2>"
    section.insertAdjacentElement('afterend', div)
    console.log("Error al traer los datos")
  }
}

const addNewBook = async (e) => {
  e.preventDefault()
  try {
    if (isEditing === false) {
      const newBook = {
        title: titleInput.value,
        author: authorInput.value,
        year: Number(yearInput.value)
      }

      const response = await fetch("http://localhost:1235/api/books", {
        method: "POST",
        body: JSON.stringify(newBook),
        headers: { "Content-Type": "application/json" }
      })

      titleInput.value = ""
      authorInput.value = ""
      yearInput.value = ""

      await fetchingBooks()
    } else {
      const id = updateBook()

      const updateBook = {
        title: titleInput.value,
        author: authorInput.value,
        year: Number(yearInput.value)
      }

      const response = await fetch("http://localhost:1235/api/books/" + id, {
        method: "PATCH",
        body: JSON.stringify(updateBook),
        headers: { "Content-Type": "application/json" }
      })

      titleInput.value = ""
      authorInput.value = ""
      yearInput.value = ""

      isEditing = false
      await fetchingBooks()
    }
  } catch (error) {
    console.log(error)
  }
}

// DELETE - http://localhost:1235/api/books/682b324baabc5faa1acfa09b

const deleteBook = async (id) => {
  try {
    if (confirm("Esta seguro de que quieres borrar este libro?")) {
      const response = await fetch("http://localhost:1235/api/books/" + id, {
        method: "DELETE"
      })
      fetchingBooks()
    }
  } catch (error) {
    console.log(error)
  }
}

const updateBook = (id, title, author, year) => {
  isEditing = true
  btnSubmit.textContent = "Editar libro"

  titleInput.value = title
  authorInput.value = author
  yearInput.value = year

  return id
}

form.addEventListener("submit", addNewBook)

fetchingBooks()

