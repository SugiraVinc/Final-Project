'use client'
import Header from '@/app/components/Header';
import ImageFotter from '@/app/components/ImageFotter';
import MusicPlayer from '@/app/components/MusicFooter';
import RealFooter from '@/app/components/RealFooter';
import React from 'react';
import Link from 'next/link';

const DashboardHeader = () => {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-6 mt-10 flex flex-col items-center">
          {/* Centered clickable cards */}
          <div className="grid grid-cols-2 gap-6 text-center items-center">
            {/* Depression Card */}
            <div
              className="text-white py-8 px-6 rounded-lg shadow-lg"
              style={{ backgroundColor: '#62999D' }}
            >
              <h2 className="text-lg font-bold mb-4">Depression</h2>
              <Link href='/admin-dashboard/review-content/depression/testimony'>
              <p className="text-base italic mb-2">Testimonials</p>
              </Link>
              <Link href='/admin-dashboard/review-content/depression/creative-pieces'>
              <p className="text-base italic">Creative Pieces</p>
              </Link>
            </div>
            {/* Anxiety Card */}
            <div
              className="text-white py-8 px-6 rounded-lg shadow-lg"
              style={{ backgroundColor: '#62999D' }}
            >
              <h2 className="text-lg font-bold mb-4">Anxiety</h2>
              <Link href='/admin-dashboard/review-content/anxiety/testimony'>
              <p className="text-base italic mb-2">Testimonials</p>
              </Link>
              <Link href='/admin-dashboard/review-content/anxiety/creative-pieces'>
              <p className="text-base italic">Creative Pieces</p>
              </Link>
            </div>
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
