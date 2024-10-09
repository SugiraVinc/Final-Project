import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14" style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-11/12 max-w-6xl aspect-video relative rounded-lg overflow-hidden shadow-lg">
          <img src="/BC.jpg" alt="Waterfall background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-md bg-black bg-opacity-70 p-8 rounded-lg">
              <h2 className="text-4xl font-bold mb-2 text-white text-center">Register</h2>
              <p className="text-gray-300 mb-6 text-center">Create a new account</p>
              <form className="space-y-4">
                <div className="bg-white rounded-sm overflow-hidden flex items-center">
                  <span className="text-gray-400 ml-3 mr-2">👤</span>
                  <input type="text" placeholder="Username" className="w-full py-3 px-2 focus:outline-none" />
                </div>
                <div className="bg-white rounded-sm overflow-hidden flex items-center">
                  <span className="text-gray-400 ml-3 mr-2">✉️</span>
                  <input type="email" placeholder="Email" className="w-full py-3 px-2 focus:outline-none" />
                </div>
                <div className="bg-white rounded-sm overflow-hidden flex items-center">
                  <span className="text-gray-400 ml-3 mr-2">🔑</span>
                  <input type="Strong Password" placeholder="Password" className="w-full py-3 px-2 focus:outline-none" />
                </div>
                <button type="submit" className="w-full bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">Register</button>
              </form>
              <div className="mt-4 flex justify-between text-sm text-gray-300">
                <Link href="#" className="hover:text-white">Already have an account?</Link>
                <Link href="/login" className="hover:text-white">Login Now</Link>
              </div>
              <div className="mt-4">
                <button className="w-full bg-white text-black py-3 rounded-full font-semibold flex items-center justify-center hover:bg-gray-200 transition duration-300">
                  <span className="mr-2 text-green-500 font-bold">G</span>
                  Register with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Page