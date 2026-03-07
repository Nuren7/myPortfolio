import React from 'react'

function WelcomeLoader({active}) {

  return (
    <div className={`
    fixed inset-0 z-50 flex items-center justify-center
    bg-black text-4xl text-white font-bold
    transition-opacity duration-500 ease-out pointer-events-none
    ${active ? "opacity-100" : "opacity-0"}
    `}
    >
      <h1>Welcome</h1>

    </div>
  )
}

export default WelcomeLoader