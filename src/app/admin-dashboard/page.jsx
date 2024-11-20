import React from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import ImageFotter from '../components/ImageFotter';
import RealFooter from '../components/RealFooter';
import MusicPlayer from '../components/MusicFooter';

const DashboardHeader = () => {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-6 mt-10 flex flex-col items-center">
          {/* Centered clickable options */}
          <div className="grid grid-cols-2 grid-rows-2 gap-6 text-center items-center">
            <Link href="/review-content">
              <div className="bg-white text-black py-4 px-8 rounded-md shadow-lg hover:bg-gray-200">
                Review Content
              </div>
            </Link>
            <Link href="/safe-space-evaluation">
              <div className="bg-white text-black py-4 px-8 rounded-md shadow-lg hover:bg-gray-200">
                Safe Space Evaluation
              </div>
            </Link>
            {/* Positioned on the next row */}
            <Link href="/self-check-updates">
              <div className="bg-white text-black py-4 px-8 rounded-md shadow-lg hover:bg-gray-200 col-span-2">
                Self-check Updates
              </div>
            </Link>
          </div>
        </div>
      </div>
      <footer>
        <div className="w-full">
          <MusicPlayer />
          <ImageFotter />
        </div>
        <RealFooter />
      </footer>
    </>
  );
};

export default DashboardHeader;
