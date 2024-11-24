'use client'
import React from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import MusicFooter from '../components/MusicFooter';
import ImageFotter from '../components/ImageFotter';
import RealFooter from '../components/RealFooter';


const Page = () => {
    const {userInfo} = useSelector(state => state.auth)

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14" style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-11/12 max-w-6xl min-h-screen relative rounded-lg overflow-hidden shadow-lg">
                    <img 
                        src="/BC.jpg" 
                        alt="Waterfall background" 
                        className="w-full h-full object-cover absolute inset-0 mt-20 h-[700px] rounded-lg md:mt-0 md:h-full md:rounded-none" 
                    />
                    <div className="relative flex items-center justify-center py-20">
                        <div className="w-full max-w-md bg-black bg-opacity-70 p-8 md:p-16 rounded-lg mx-auto min-h-[700px] flex flex-col justify-center">

                            {/* Replacing the previous text and button section with the new buttons */}

                            <div className="space-y-4">
                                <Link href='/anxiety-room/understand-anxiety'>
                                <button className="w-full mb-3 bg-gray-200 text-black py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300">
                                    Understand anxiety
                                </button>
                                </Link>
                                
                                <Link href='/anxiety-room/testimony'>
                                <button className="w-full bg-gray-200 text-black py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300">
                                    Testimony
                                </button>
                                </Link>
                                
                                <Link href='/anxiety-room/creative-pieces'>
                                <button className="w-full mt-3 bg-gray-200 text-black py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300">
                                    Creative Pieces
                                </button>
                                </Link>
                               
                               
                                {userInfo ? (
                                          <Link href='/anxiety-room/self-check-anxiety'>
                                    <button className="w-full mt-3 bg-gray-200 text-black py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300">
                                            Anxiety Self-check
                                      </button>
                                          </Link>
                                  ) : (
                                      <button 
                                          onClick={() => toast.error('Please login to access the Depression Self-check')}
                                          className="w-full bg-gray-300 text-black py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300"
                                      >
                                          Anxiety Self-check
                                      </button>
                                  )}       
                            </div>

                            {/* Safe Space button */}
                            <Link href='/chat'>
                                <button className="w-full mt-6 bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
                                    Safe Space
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <div className="w-full">
                    <MusicFooter/>
                    <ImageFotter/>                    
                </div>
                <RealFooter/>               
            </footer>
        </div>
    )
}

export default Page;
