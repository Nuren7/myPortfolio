import React from 'react'
import { Routes, Route } from "react-router-dom"

import './css/index.css'

import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import Contact from './pages/Contact'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Admin from './components/portfolio/Admin'
import ProtectedRoute from './components/portfolio/ProtectedRoute';

function App() {
  return (
    <>  
    
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    
    </>
  )
}

export default App