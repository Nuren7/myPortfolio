import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

import "./css/Index.css"
import "./css/components/navbar/Navbar.css"
import "./css/components/WelcomeLoader.css"
import "./css/components/portfolio/PortfolioHero.css"
import "./css/components/Home/Hero.css"


import "./css/animations/Fade.css"
import "./css/animations/Slide.css"
import "./css/animations/InfiniteScroll.css"
import "./css/animations/Typing.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>,
)
