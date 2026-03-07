import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

function usePageTransition() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function goTo(url) {
    setLoading(true);
    setTimeout(() => {
      navigate(url);
      setLoading(false);
    }, 500);
  }

  return {
    goTo,
    loading
  }
}

export default usePageTransition