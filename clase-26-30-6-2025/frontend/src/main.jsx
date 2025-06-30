import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp'

import "./index.css"
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  </StrictMode>,
)
