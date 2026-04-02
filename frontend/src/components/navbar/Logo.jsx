import React, { Children } from 'react'
import { Link } from 'react-router-dom'

function Logo({onClick,src,alt}) {
  return (
    <div className='w-10 md:w-12 lg:w-14'>
    <Link onClick={onClick} className='inline-flex items-center group'>
      
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