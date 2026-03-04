import React from 'react'
import { Link } from "react-router-dom"

import Button from './Button'  
import Logo from './Logo'



function Navbar() {


  return (
    <nav className="
      navbar-style">
    
      <Logo to="/" src="/my_logo.png" alt="my_logo" />

      <ul className="flex gap-4 list-none">
        <li><Button to="/portfolio">portfolio</Button></li>
        <li><Button to="/about">about me</Button></li>
        <li><Button to="/contact">contact</Button></li>
      </ul>


    </nav>
  )
}

export default Navbar
