import React from 'react'
import { Link } from "react-router-dom"
import { useState } from 'react'

import Button from './Button'  
import Logo from './Logo'
import usePageTransition from './usePageTransition'
import WelcomeLoader from './WelcomeLoader'



function Navbar() {

  const { goTo, loading } = usePageTransition();
  const [pageName, setPageName] = useState("")

  return (
    <>

    <WelcomeLoader active={loading} pageName={pageName}/>
      <nav className="
        navbar-style">

        <Logo onClick={() => {setPageName("Home");goTo('/');}} src="/my_logo.png" alt="my_logo" />

        <ul className="flex gap-4 list-none">
          <li><Button onClick={() => {setPageName("Portfolio");goTo('/');}} >portfolio</Button></li>
          <li><Button onClick={() => {setPageName("About me");goTo('/');}}>about me</Button></li>
          <li><Button onClick={() => {setPageName("Contact");goTo('/');}}>contact</Button></li>
        </ul>

      </nav>
    </>
  )
}

export default Navbar
