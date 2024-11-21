'use client';
import React from 'react';
import { useGetSinglePoemQuery } from '@/app/slices/userSlices/userApiSlice';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import MusicFooter from '@/app/components/MusicFooter';
import ImageFotter from '@/app/components/ImageFotter';
import RealFooter from '@/app/components/RealFooter';
import Loader from '@/app/components/Loader';

const Page = () => {
  const params = useParams();
  const id = params.id;
  const { data: poem } = useGetSinglePoemQuery(id);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-4 sm:p-6 lg:p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />

        <div className="mx-auto max-w-7xl rounded-lg bg-black/80 p-4 sm:p-6 lg:p-8 mt-10 h-auto flex flex-col space-y-8">
          {poem && poem.data ? (
            <div className="p-6 bg-[#D9D9D9] rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{poem.data.title}</h1>
              <p className="text-gray-700 text-base">{poem.data.description}</p>
            </div>
          ) : (
            <p className="text-white text-center"><Loader/></p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="w-full">
          <MusicFooter />
          <ImageFotter />
        </div>
        <RealFooter />
      </footer>
    </>
  );
};

export default Page;
