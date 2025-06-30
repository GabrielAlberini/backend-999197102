import { useState } from "react"
import { Layout } from "../components/Layout"
import { validatePassword } from "../validators/validatePassword"
import { register } from "../services/auth"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!username || !email || !password) {
      setError("Necesitas rellenar todos los campos")
      return
    }

    // si el nombre de usuario tiene menos de 3 caracteres
    if (username.length < 3 || username.length > 12) {
      setError("El nombre debe tener al menos 3 caracteres y menos de 12 caracteres")
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
      const response = await register({ username, email, password })
      const data = await response.json()

      if (!response.ok) {
        setError("Usuario ya existente, debes elegir otro email")
      } else {
        // enviar confirmación de usuario al correo electronico
        setMessage(`Usuario creado con éxito, ID: ${data.data._id}`)
        setUsername("")
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        setError("Conexión del backend perdida");
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  }

  const handleVisibilityPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Layout>
      <h1>Registrate</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)}
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleVisibilityPassword}>Ver contraseña</button>
        <button>Enviar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </Layout>
  )
}

export { Register }