const registerForm = document.querySelector("#register-form")
const loginForm = document.querySelector("#login-form")

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const inputUsername = document.getElementById("register-username")
  const inputEmail = document.getElementById("register-email")
  const inputPassword = document.getElementById("register-password")
  const result = document.getElementById("result")

  const newDataUser = {
    username: inputUsername.value,
    email: inputEmail.value,
    password: inputPassword.value
  }

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
  if (data.success) {
    result.textContent = data.message
    result.style.color = "green"
  } else {
    result.textContent = "Error al crear usuario, email existente"
    result.style.color = "red"
  }
})

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const loginEmail = document.getElementById("login-email").value
  const loginPassword = document.getElementById("login-password").value
  const loginMessage = document.getElementById("loginMessage")

  const tieneCaracterEspecial = (str) => /[^A-Za-z0-9\s]/.test(str);

  if (!loginEmail.includes("@") || !loginEmail.includes(".")) {
    loginMessage.textContent = "Correo electronico invalido."
    loginMessage.style.color = "red"
    return
  }

  if (loginPassword.length < 6) {
    loginMessage.textContent = "La contraseña debe tener al menos 6 caracteres."
    loginMessage.style.color = "red"
    return
  }

  if (!tieneCaracterEspecial(loginPassword)) {
    loginMessage.textContent = "La contraseña debe tener al menos 1 caracter especial."
    loginMessage.style.color = "red"
    return
  }

  console.log({ email: loginEmail, password: loginPassword })

  const response = await fetch("http://localhost:1234/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    headers: { "Content-Type": "application/json" }
  })

  const data = await response.json()

  if (!data.success) {
    loginMessage.textContent = "Error al logear al usuario. Credenciales invalidas."
    loginMessage.style.color = "red"
    return
  }

  loginMessage.textContent = "Usuario logeado con éxito"
  loginMessage.style.color = "green"
})