import React from 'react'

/* import PortfolioCard from '../components/portfolio/PortfolioCard' */
import PortfolioHero from '../components/portfolio/PortfolioHero'
import Projects from '../components/portfolio/Projects'


function Portfolio() {
  return (
    <div className='bg-stone-300'>

      <PortfolioHero />
      <Projects />
  

    </div>
  )
}

export default Portfolio