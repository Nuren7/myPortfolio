import React from 'react'

import PortfolioHero from '../components/portfolio/PortfolioHero'
import PortfolioInfo from '../components/portfolio/PortfolioInfo'





function Portfolio() {
  return (
    <div className='bg-stone-300 flex '>

      <PortfolioInfo />
      <PortfolioHero />

    </div>
  )
}

export default Portfolio