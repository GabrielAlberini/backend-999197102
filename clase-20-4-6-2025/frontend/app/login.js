const form = document.querySelector("#register-form")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const inputUsername = document.getElementById("register-username")
  const inputEmail = document.getElementById("register-email")
  const inputPassword = document.getElementById("register-password")

  const newDataUser = { username: inputUsername.value, email: inputEmail.value, password: inputPassword.value }

  const response = await fetch("http://localhost:1234/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDataUser)
  })

  const data = await response.json()

  inputUsername.value = ""
  inputEmail.value = ""
  inputPassword.value = ""

  console.log(data)
})