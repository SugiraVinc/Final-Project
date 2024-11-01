import React from 'react'
import Header from '../components/Header'
import Link from 'next/link';

import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Page = () => {

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14" style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-11/12 max-w-6xl aspect-video relative rounded-lg overflow-hidden shadow-lg">
                    <img src="/BC.jpg" alt="Waterfall background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full max-w-md bg-black bg-opacity-70 p-8 rounded-lg">
                            {/* White background text box */}
                            <div className="bg-white p-6 mb-8 rounded-lg">
                                <p className="text-black text-lg">
                                    This general mental health self-check is designed to help you understand
                                    your current mental health status. It is a score based test and will help us to
                                    recommend tips, creative artworks, and actionable practices. This will only
                                    take three minutes and will change your life big time.
                                </p>
                            </div>

                            {/* Separated button */}
                            <Link href='/self-check-depression-form'>
                            <button className="w-full bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
                                Take a check
                            </button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <div className="w-full">
                    {/* Player controls bar */}
                    <div className="bg-[#4AA9AD] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-black rounded-full" />
                            <div className="text-white">
                                <div className="text-sm">NF</div>
                                <div className="text-xs">The Search</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-4">
                            <div className="h-[2px] bg-black flex-1" />
                            <button className="text-[#1E90FF]">⟲</button>
                            <button className="text-[#1E90FF]">◀◀</button>
                            <button className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                                <span className="text-[#1E90FF]">▶</span>
                            </button>
                            <button className="text-[#1E90FF]">▶▶</button>
                            <button className="text-[#1E90FF]">⟳</button>
                            <div className="h-[2px] bg-black flex-1" />
                        </div>
                        <button className="text-[#1E90FF]">🔊</button>
                    </div>

                    {/* Main content area */}
                    <div className="bg-[#FFFBA0] p-4">
                        <div className="relative flex justify-between items-center">
                            <img
                                src="/FreshLink Logo OG 1.png"
                                alt="Hope"
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-14 mt-6 z-10"
                            />

                            {/* Left image */}
                            <div className="border-[15px] border-black bg-white w-[30%]">
                                <div className="p-2">
                                    <img src="/Poetherapy (1).png" alt="I will not take me away" className="w-full" />
                                </div>
                            </div>

                            {/* Middle image - adjusted to be only slightly smaller */}
                            <div className="border-[15px] border-black bg-white w-[35%] ">
                                <div className="p-1">
                                    <img src="/Lil Wayne (3).png" alt="HEAL" className="w-full h-72 ml-1" />
                                </div>
                            </div>

                            {/* Right image */}
                            <div className="border-[15px] border-black bg-white w-[30%]">
                                <div className="p-2">
                                    <img src="/Selena Gomez Quote 1.png" alt="Selena Gomez quote" className="w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#4AA9AD] py-8"> 
          <div className="container mx-auto px-4 flex justify-between items-center">
    
            <div className="text-center">
              <img src="/smile2.png" alt="Smile" className="w-7 h-7 mx-auto" />
            </div>

            <div className="flex space-x-6">
              <Link href="https://facebook.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                <FaFacebookF size={20} />
              </Link>
              <Link href="https://twitter.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://instagram.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                <FaInstagram size={20} /> 
              </Link>
            </div>
          </div>

          <div className="text-center text-white text-xs mt-10">
            © Copyright Year
          </div>
        </div>
            </footer>
        </div>
    )
}

export default Page;