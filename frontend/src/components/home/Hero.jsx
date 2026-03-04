import React from 'react'

import HeroImage from './HeroImage'
import HeroName from './HeroName'
import HeroInfo from './HeroInfo'

function Hero() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <HeroImage />
      <HeroName />
      <HeroInfo />

    </div>
  )
}

export default Hero