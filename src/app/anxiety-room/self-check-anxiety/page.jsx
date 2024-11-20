import React from 'react'
import Header from '@/app/components/Header';
import Link from 'next/link';
import MusicFooter from '@/app/components/MusicFooter';
import ImageFotter from '@/app/components/ImageFotter';
import RealFooter from '@/app/components/RealFooter';

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
                            <Link href='/anxiety-room/self-check-anxiety/self-check-anxiety-form'>
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
                    <MusicFooter/>
                    <ImageFotter/>                    
                </div>
                <RealFooter/>               
            </footer>
        </div>
    )
}

export default Page;