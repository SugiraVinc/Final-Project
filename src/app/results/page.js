'use client'
import React from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const DashboardHeader = () => {
  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 sm:p-6 md:p-8"
           style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
        <Header />

        <div className="mx-auto max-w-4xl rounded-lg bg-black/80 p-4 sm:p-6 md:p-8 mt-4 sm:mt-6 md:mt-10 flex justify-center items-center">
          {/* Main container */}
          <div className="w-full md:w-[1000px] max-w-lg bg-[#D9D9D9] rounded-lg p-4 sm:p-6 md:p-10 relative min-h-[500px] md:h-[600px]">
            {/* Title */}
            <div className="text-center text-sm sm:text-lg md:text-xl font-semibold bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 md:mb-10">
              Here are Your Past Self-Check Result Lists
            </div>

            {/* List of buttons */}
            <div className="space-y-4 md:space-y-6">
                <Link href='/week-results' className="block">
                  <button className="w-full bg-gray-200 hover:bg-gray-300 text-left py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg font-semibold">
                    Last Week
                  </button>
                </Link>

              <button className="w-full bg-gray-200 hover:bg-gray-300 text-left py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg font-semibold">
                Previous Months
              </button>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-left py-3 md:py-4 px-4 md:px-6 rounded-lg text-base md:text-lg font-semibold">
                Three Months Ago
              </button>
            </div>

            <button className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white text-black font-semibold py-2 sm:py-3 px-4 sm:px-8 rounded-lg hover:bg-gray-200 text-sm sm:text-base">
              Take a New Check
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="w-full">
          <div className="bg-[#4AA9AD] px-2 sm:px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-4 sm:w-6 h-4 sm:h-6 bg-black rounded-full" />
              <div className="text-white">
                <div className="text-xs sm:text-sm">NF</div>
                <div className="text-[10px] sm:text-xs">The Search</div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center gap-2 sm:gap-4 px-2 sm:px-4">
              <div className="h-[2px] bg-black flex-1 hidden sm:block" />
              <button className="text-[#1E90FF] text-sm sm:text-base">⟲</button>
              <button className="text-[#1E90FF] text-sm sm:text-base">◀◀</button>
              <button className="h-6 w-6 sm:h-8 sm:w-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-[#1E90FF]">▶</span>
              </button>
              <button className="text-[#1E90FF] text-sm sm:text-base">▶▶</button>
              <button className="text-[#1E90FF] text-sm sm:text-base">⟳</button>
              <div className="h-[2px] bg-black flex-1 hidden sm:block" />
            </div>
            <button className="text-[#1E90FF] text-sm sm:text-base">🔊</button>
          </div>

          <div className="bg-[#FFFBA0] p-2 sm:p-4">
            <div className="relative flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <img
                src="/FreshLink Logo OG 1.png"
                alt="Hope"
                className="sm:absolute top-0 left-1/2 transform -translate-x-1/2 sm:-translate-y-1/2 h-10 sm:h-14 mt-2 sm:mt-6 z-10"
              />
              <div className="border-[8px] sm:border-[15px] border-black bg-white w-full sm:w-[30%]">
                <div className="p-1 sm:p-2">
                  <img src="/Poetherapy (1).png" alt="I will not take me away" className="w-full" />
                </div>
              </div>
              <div className="border-[8px] sm:border-[15px] border-black bg-white w-full sm:w-[35%]">
                <div className="p-1">
                  <img src="/Lil Wayne (3).png" alt="HEAL" className="w-full h-48 sm:h-72 ml-1" />
                </div>
              </div>
              <div className="border-[8px] sm:border-[15px] border-black bg-white w-full sm:w-[30%]">
                <div className="p-1 sm:p-2">
                  <img src="/Selena Gomez Quote 1.png" alt="Selena Gomez quote" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#4AA9AD] py-4 sm:py-8"> 
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-center">
              <img src="/smile2.png" alt="Smile" className="w-5 sm:w-7 h-5 sm:h-7 mx-auto" />
            </div>
            <div className="flex space-x-4 sm:space-x-6">
              <Link href="https://facebook.com" className="w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center text-white">
                <FaFacebookF size={16} className="sm:text-[20px]" />
              </Link>
              <Link href="https://twitter.com" className="w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center text-white">
                <FaTwitter size={16} className="sm:text-[20px]" />
              </Link>
              <Link href="https://instagram.com" className="w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center text-white">
                <FaInstagram size={16} className="sm:text-[20px]" />
              </Link>
            </div>
          </div>
          <div className="text-center text-white text-[10px] sm:text-xs mt-6 sm:mt-10">
            © Copyright Year
          </div>
        </div>
      </footer>
    </>
  );
};

export default DashboardHeader;