import React from 'react'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'

import Button from './Button'  
import Logo from './Logo'
import usePageTransition from './usePageTransition'
import WelcomeLoader from './WelcomeLoader'



function Navbar() {

  const { goTo, loading } = usePageTransition();
  const [pageName, setPageName] = useState("")
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    if (loading) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowNavbar(false)
    } else {
      const timer = setTimeout(() => {
        setShowNavbar(true)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [loading]) 

  return (
    <>

    <WelcomeLoader active={loading} pageName={pageName}/>

    {showNavbar && (
      <nav className="
        navbar-style animate-slide-In-Down">

        <Logo onClick={() => {setPageName("Home");goTo('/');}} src="/my_logo.png" alt="my_logo" />

        <ul className="flex gap-4 list-none">

          <li>
            <Button 
            onClick={() => {setPageName("Portfolio");goTo('/portfolio');}}>
              portfolio
            </Button>
          </li>
          <li>
            <Button 
              onClick={() => {setPageName("About me");goTo('/about');}}>
                about me
            </Button>
          </li>
          <li>
            <Button 
              onClick={() => {setPageName("Contact");goTo('/contact');}}>
                contact
              </Button>
            </li>

        </ul>

      </nav>
    )}

    </>
  )
}

export default Navbar
