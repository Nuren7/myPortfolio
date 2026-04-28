import React from 'react'

function AboutHero() {
  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-stone-300 font-pixelify text-center p-6">

        <h1 className="text-4xl font-bold mb-4">
          404
        </h1>

        <h2 className="text-xl font-semibold mb-2">
          Page Under Construction
        </h2>

        <p className="text-sm mb-6">
          This area is still being built. Come back soon 👷
        </p>

        <a
          href="/"
          className="px-4 py-2 border-2 border-black bg-white hover:scale-105 transition"
        >
          Go Home
        </a>

    </div>
  )
}

export default AboutHero