import React from 'react'

import PortfolioHero from '../components/portfolio/PortfolioHero'
import Projects from '../components/portfolio/Projects'
import Fullstack from '../components/portfolio/Fullstack'
import PortfolioScroll from '../components/portfolio/PortfolioScroll'


function Portfolio() {
  return (
    <div className='bg-stone-300'>

      <PortfolioScroll />
      <PortfolioHero />
      <Projects />
      <Fullstack />
  

    </div>
  )
}

export default Portfolio