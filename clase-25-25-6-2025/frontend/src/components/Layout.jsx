import { useState } from "react"
import { Link } from "react-router-dom"

const Layout = ({ children }) => {
  const [user, setUser] = useState(true)
  return (
    <>
      <header>
        <nav>
          {
            !user && <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Registro</Link></li>
            </ul>
          }
          {
            user && <>
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <button onClick={() => setUser(!user)}>Cerrar sesión</button>
              </ul>
            </>
          }
        </nav>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>Sitio desarrollado por Gabriel Alberini | UTN</p>
      </footer>
    </>
  )
}

export { Layout }