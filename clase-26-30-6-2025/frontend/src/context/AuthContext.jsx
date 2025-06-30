import { createContext, use, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const handleToken = (token) => {
    if (token !== undefined) {
      localStorage.setItem("token", token)
    }
    setToken(token)
    setUser(jwtDecode(token))
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, handleToken, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }