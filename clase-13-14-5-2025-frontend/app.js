// document.getElementById('movieForm').addEventListener('submit', function (e) {
//   e.preventDefault();

//   const title = document.getElementById('title').value.trim();
//   const rating = parseFloat(document.getElementById('rating').value);
//   const password = document.getElementById('password').value;

//   let errors = [];

//   // Validar título
//   if (title.length < 2) {
//     errors.push('El título debe tener al menos 2 caracteres.');
//   }

//   // Validar rating
//   if (isNaN(rating) || rating < 0 || rating > 10) {
//     errors.push('El rating debe ser un número entre 0 y 10.');
//   }

//   // Validar contraseña
//   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
//   if (!passwordRegex.test(password)) {
//     errors.push('La contraseña debe tener al menos 6 caracteres, incluyendo una letra y un número.');
//   }

//   if (errors.length > 0) {
//     alert(errors.join('\n'));
//     return;
//   }

//   // Si todo está bien
//   console.log('Título:', title);
//   console.log('Rating:', rating);
//   console.log('Contraseña:', password);
//   alert('Película agregada correctamente ✅');
// });

const list = document.getElementById("booksList")

const fetchingBooks = async () => {
  const response = await fetch("http://localhost:1235/api/books")
  const responseToJson = await response.json()

  list.innerHTML = ""

  responseToJson.data.forEach((book) => {
    const li = document.createElement("li")
    li.textContent = book.title
    list.appendChild(li)
  })
}


fetchingBooks()