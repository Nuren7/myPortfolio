import React from 'react'
import { Routes, Route } from "react-router-dom"

import './css/index.css'

import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import Portfolio from './pages/Portfolio'
import About from './pages/About'
import Admin from './components/portfolio/Admin'
import ProtectedRoute from './components/portfolio/ProtectedRoute';

function App() {
  return (
    <>  
    
      <Navbar />
      <main className='min-h-screen'>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
      </Routes>
    </main>
    </>
  )
}

export default App