import React, { Children } from 'react'
import { Link } from 'react-router-dom'

function Logo({to,src,alt}) {
  return (
    <div className='w-[9%]'>
    <Link to= {to} className='inline-flex items-center group'>
      
      <img  
        src = {src}
        alt = {alt}
        className="
          h-auto
          object-contain
          transition-all
          duration-500
          group-hover:scale-110
          group-hover:opacity-60
        "> 
      </img>
    
    </Link>
    </div>
  )
}

export default Logo