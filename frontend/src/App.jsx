import React from 'react'
import { Routes, Route } from "react-router-dom"

import './css/index.css'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <>  
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} /> 
      </Routes>
    
    </>
  )
}

export default App