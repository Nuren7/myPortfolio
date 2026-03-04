import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import "./css/Index.css"
import "./css/components/GoldComponents.css"
import "./css/components/Divider.css"
import "./css/animations/Fade.css"
import "./css/animations/Slide.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
)
