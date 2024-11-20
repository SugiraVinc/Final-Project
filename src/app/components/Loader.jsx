import React from 'react'

const Loader = () => {
  return (
    <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <div className="flex flex-col items-center">
          <div className="animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-lg text-white font-semibold">Loading awesome content for you...</p>
        </div>
      </div>
  )
}

export default Loader
