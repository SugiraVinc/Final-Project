import React from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
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
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-6 mt-10">
          {/* Centered clickable squares */}
          <div className="flex bg-[#4AA9AD] h-[800px] justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Square 1 */}
              <Link
                href="/contributor-dashboard/create-testimony"
                className="bg-[#4AA9AD] border-2 border-black w-40 h-40 md:w-48 md:h-48 rounded-md flex items-center justify-center text-white text-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                Testimonials
              </Link>
              {/* Square 2 */}
              <Link
                href="/contributor-dashboard/create-creative-pieces"
                className="bg-[#4AA9AD] border-2 border-black w-40 h-40 md:w-48 md:h-48 rounded-md flex items-center justify-center text-white text-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                Creative Pieces
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
