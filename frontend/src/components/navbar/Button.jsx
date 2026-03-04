import React from 'react'
import { Link } from 'react-router-dom'

function Button({ to, children }) {
  
  return (
    <Link
      to={to}
      className="
        flex
        font-medium
        text-lg 
        text-stone-500 
        px-1 
        transition-colors 
        duration-500
        hover:text-gray-400
        hover:opacity-80
        slow-underline
      ">
      {children}
    </Link>
  )
}

export default Button
