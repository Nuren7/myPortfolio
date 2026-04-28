import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import "./css/index.css"
import "./css/components/navbar/Navbar.css"
import "./css/components/WelcomeLoader.css"
import "./css/components/Home/Hero.css"

/* PORTFOLIO */
import "./css/components/portfolio/Admin.css"
import "./css/components/portfolio/Layout.css"
import "./css/components/portfolio/Windows.css"
import "./css/components/portfolio/Responsive.css" 
import "./css/components/portfolio/Icons.css"


import "./css/animations/Fade.css"
import "./css/animations/Slide.css"
import "./css/animations/InfiniteScroll.css"
import "./css/animations/Typing.css"
import "./css/animations/Blink.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
)
