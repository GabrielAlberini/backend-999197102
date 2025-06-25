import { useState } from "react"
import { Layout } from "../components/Layout"
import { validatePassword } from "../validators/validatePassword"
import { login } from "../services/auth"

const Login = () => {
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visibilityPass, setVisibilityPass] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Necesitas rellenar todos los campos")
      return
    }

    // si la contraseña tiene menos de 4 caracteres
    if (password.length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres")
      return
    }

    // si el email no tiene un @
    if (!email.includes("@")) {
      setError("Debes incluir un correo electónico valido")
      return
    }

    // si la contraseña tiene al menos un caracter especial
    if (!validatePassword(password)) {
      setError("Debes incluir un caracter especial en la contraseña")
      return
    }

    try {
      const response = await login({ email, password })

      if (!response.ok) {
        setError("Credenciales invalidas...")
        return
      }

      const data = await response.json()

      // obteniendo el token para que el frontend sepa quien es el user logueado
      // CREAR CONTEXTO
      console.log(data)

      setEmail("")
      setPassword("")
      setMessage("Usuario logueado...")
    } catch (error) {

    }
  }

  return (
    <Layout>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type={visibilityPass ? "text" : "password"}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="button" onClick={() => setVisibilityPass(!visibilityPass)}>Ver contraseña</button>
        <button>Enviar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </Layout>
  )
}

export { Login }