import React from 'react'
import { Link } from "react-router-dom"

import Button from './Button'  
import Logo from './Logo'



function Navbar() {


  return (
    <nav className="
      fixed top-0 left-0 z-50 flex justify-between items-center
       bg-transparent w-full
       px-4 sm:px-8 lg:px-16 p-6 ">
    
      <Logo to="/" src="/my_logo.png" alt="my_logo" />

      <ul className="flex gap-4 list-none">
        <a 
          href="/resume.pdf" 
          download="resume.pdf" 
          target="_blank"
          rel='noopener noreferrer'
          className="no-underline"
          >
          <Button as="span">download cv</Button>
        </a>
        <li><Button to="/portfolio">portfolio</Button></li>
        <li><Button to="/about">about me</Button></li>
      </ul>


    </nav>
  )
}

export default Navbar
