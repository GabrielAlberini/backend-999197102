const registerForm = document.querySelector("#register-form")
const loginForm = document.querySelector("#login-form")

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  const username = document.getElementById("register-username").value
  const email = document.getElementById("register-email").value
  const password = document.getElementById("register-password").value
  const result = document.getElementById("result")

  const tieneCaracterEspecial = (str) => /[^A-Za-z0-9\s]/.test(str);

  const newDataUser = {
    username,
    email,
    password
  }

  // validaciones
  if (username.length < 4) {
    result.textContent = "El nombre de usuario debe contener al menos 4 caracteres"
    result.style.color = "red"
    return
  }

  if (!email.includes("@") || !email.includes(".")) {
    result.textContent = "Correo electronico invalido."
    response.style.color = "red"
    return
  }

  if (password.length < 6) {
    result.textContent = "La contraseña debe tener al menos 6 caracteres."
    result.style.color = "red"
    return
  }

  if (!tieneCaracterEspecial(password)) {
    result.textContent = "La contraseña debe tener al menos 1 caracter especial."
    result.style.color = "red"
    return
  }

  const response = await fetch("http://localhost:1234/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDataUser)
  })

  const data = await response.json()

  username.value = ""
  email.value = ""
  password.value = ""

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