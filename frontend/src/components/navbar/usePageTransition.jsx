import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function usePageTransition() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function goTo(url) {
    let duration = 2000; 

    if (url === '/portfolio') {
      duration = 2500; 
    }
    setLoading(true);
    setTimeout(() => {
      navigate(url);
      setLoading(false);
    }, duration);
  }

  return {
    goTo,
    loading
  }
}

export default usePageTransition