import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Home } from './views/Home'
// import { Login } from './views/Login'
// import { Register } from './views/Register'
// import { Dashboard } from './views/Dashboard'
import { RouterApp } from './router/RouterApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)
