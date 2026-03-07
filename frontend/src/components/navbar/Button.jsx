import React from 'react'
import { Link } from 'react-router-dom'

function Button({ onClick ,children }) {
  
  return (
    <Link
      onClick={onClick}
      className="
        btn-link
        slow-underline
      "
    >
      {children}
    </Link>
  )
}

export default Button