'use client';
import React from 'react';
import { useGetAllContentQuery } from '@/app/slices/userSlices/userApiSlice';
import MusicFooter from '@/app/components/MusicFooter';
import ImageFotter from '@/app/components/ImageFotter';
import RealFooter from '@/app/components/RealFooter';
import Header from '@/app/components/Header';

const DashboardHeader = () => {
  const { data: content } = useGetAllContentQuery();

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-4 md:p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />

        {/* Blog Section */}
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-4 md:p-6 mt-6 md:mt-10 h-auto flex flex-col space-y-6">
          {content?.data
            ?.filter((cont) => cont.room === 'Anxiety')
            .map((post, index) => (
              <div
                key={index}
                className="p-4 md:p-6 bg-white bg-opacity-60 rounded-lg shadow-lg"
              >
                <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 md:mb-4">
                  {post.title}
                </h2>
                <p className="text-sm md:text-base text-gray-700">
                  {post.description.slice(0, 200)}...
                </p>
                <a
                  href={`/anxiety-room/testimony/${post._id}`}
                  className="inline-block mt-4 px-4 py-2 md:px-6 md:py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 hover:underline transition-all duration-200"
                >
                  Read More
                </a>
              </div>
            ))}
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

export default DashboardHeader;
