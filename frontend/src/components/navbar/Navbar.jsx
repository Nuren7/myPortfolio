import React from 'react'
import { Link } from "react-router-dom"

import Button from './Button'  
import Logo from './Logo'
import usePageTransition from './usePageTransition'
import WelcomeLoader from './WelcomeLoader'


function Navbar() {

  const { goTo, loading } = usePageTransition();

  return (
    <>

    <WelcomeLoader active={loading} />
      <nav className="
        navbar-style">

        <Logo onClick={() => goTo('/')} src="/my_logo.png" alt="my_logo" />

        <ul className="flex gap-4 list-none">
          <li><Button onClick={() => goTo('/portfolio')}>portfolio</Button></li>
          <li><Button onClick={() => goTo('/about')}>about me</Button></li>
          <li><Button onClick={() => goTo('/contact')}>contact</Button></li>
        </ul>

      </nav>
    </>
  )
}

export default Navbar
