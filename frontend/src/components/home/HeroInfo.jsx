import React from 'react'
import { useState, useEffect } from "react"

function HeroInfo() {
  const words = [
    "Hi, I'm Nuren a FullStack Developer",
    "Here are some of my passions",
    "Frontend Developing",
    "React JSX TailwindCSS",
    "Backend Developing",
    "Node.js Express MongoDB",
    "AWS SQL NoSQL",
    "Cybersecurity",
    "Ethical Hacking Penetration Testing Kali Linux"
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
    
    <div className="fixed inset-0 flex items-center justify-end px-10 text-right">
      <h1 className="hero-title font-montserrat text-stone-500">
        {text}
        <span className="hero-title animate-blink">|</span> 
      </h1>
    </div>
  )
}

export default HeroInfo