import React, { Children } from 'react'
import { Link } from 'react-router-dom'

function Logo({onClick,src,alt}) {
  return (
    <div className='w-24 sm:w-24 md:w-24 lg:w-32'>
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