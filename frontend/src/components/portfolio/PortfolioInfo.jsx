import { useState, useEffect } from 'react'

function PortfolioInfo() {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const words = [
      "Click Me! ↓",
      "Explore My Projects!"
    ]
  
  
    const [text, setText] = useState("")       
    const [isDeleting, setIsDeleting] = useState(false) 
    const [wordIndex, setWordIndex] = useState(0)      
    const [charIndex, setCharIndex] = useState(0)       
  
    
    useEffect(() => {
    
      const currentWord = words[wordIndex]
  
      
      const typingSpeed = isDeleting ? 50 : 120
      const pauseAtEnd = 1000 
  
      const timer = setTimeout(() => {
        if (!isDeleting) {
      
          setText(currentWord.slice(0, charIndex + 1)) 
          setCharIndex(prev => prev + 1)
          
          if (charIndex + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), pauseAtEnd)
          }
        } else {
  
          setText(currentWord.slice(0, charIndex - 1)) 
          setCharIndex(prev => prev - 1)
  
          if (charIndex - 1 === 0) {
            setIsDeleting(false)
            setWordIndex(prev => (prev + 1) % words.length) 
          }
        }
      }, typingSpeed)
  
      return () => clearTimeout(timer)
  
    }, [charIndex, isDeleting, wordIndex, words])
  
  return (
        
    <div className="hidden md:flex fixed inset-0  items-center justify-end px-10 text-right">
      <h1 className="portfolio-info text-stone-500">
        {text}
        <span className="hero-title animate-blink">⌷</span> 
      </h1>
    </div>   
    
  )
}

export default PortfolioInfo