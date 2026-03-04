import React from 'react'

function HeroImage() {
  return (
     <div className="flex w-full h-screen z-10">
      <img
        src="/img_of_me3.png"
        alt="Portrait of me"
        className="hero-image animate-slide-In-Up"
      />
    </div>

  )
}

export default HeroImage