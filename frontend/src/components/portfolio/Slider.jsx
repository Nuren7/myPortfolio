import React from 'react'

export default function Slider({projects, activeIndex}) {

  const nextIndex = (activeIndex + 1) % projects.length
  const prevIndex = (activeIndex - 1 + projects.length) % projects.length 
  return (
    <div className='slideC'>
      {projects.map((project , index) =>  { 

        let position = ""

        if (index === activeIndex) position = "active"
        else if (index === prevIndex) position = "prev"
        else if (index === nextIndex) position = "next"

        return (
          <img 
            key={project.id}
            className={`slide ${position}`}
            src={project.image}
            alt={project.title}/>
        )
    
        })}



    </div>
  )
}
