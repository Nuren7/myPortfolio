import React from 'react'
import { Link } from 'react-router-dom'

function Button({ onClick ,children }) {
  
  return (
    <Link
      onClick={onClick}
      className="
        btn-link
        text-stone-500 
        hover:opacity-50
      "
    >
      {children}
    </Link>
  )
}

export default Button