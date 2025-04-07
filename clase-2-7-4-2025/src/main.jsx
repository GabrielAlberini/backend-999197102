import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Characters from './components/Characters/Characters.jsx'
import { Products } from './components/Products/Products.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Products />
  </StrictMode>,
)
