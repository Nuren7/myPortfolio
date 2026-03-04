import React from 'react'

import HeroImage from './HeroImage'
import HeroName from './HeroName'

function Hero() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <HeroImage />
      <HeroName />

    </div>
  )
}

export default Hero