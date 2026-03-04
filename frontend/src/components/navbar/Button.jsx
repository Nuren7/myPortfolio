import React from 'react'
import { Link } from 'react-router-dom'

function Button({ to, children }) {
  
  return (
    <Link
      to={to}
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