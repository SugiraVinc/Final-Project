'use client';
import Header from '@/app/components/Header';
import ImageFotter from '@/app/components/ImageFotter';
import MusicPlayer from '@/app/components/MusicFooter';
import RealFooter from '@/app/components/RealFooter';
import React from 'react';
import { useGetSingleContentQuery } from '@/app/slices/userSlices/userApiSlice';
import { useParams } from 'next/navigation';

const DashboardHeader = () => {
  const params = useParams();
  const id = params.id;
  const { data: testimony } = useGetSingleContentQuery(id);

  // Render media (image or video)
  const renderMedia = (media, mediaType) => {
    if (media && mediaType === 'image') {
      return (
        <img
          src={media.url}
          alt={media.title}
          className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
        />
      );
    } else if (media && mediaType === 'video') {
      return (
        <video
          controls
          src={media.url}
          className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
        />
      );
    }
    return null;
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-6 mt-10">
          {testimony ? (
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">{testimony.data.title}</h2>
              <p className="text-lg mb-6">{testimony.data.description}</p>
              {renderMedia(testimony.data.media, testimony.data.mediaType)} {/* Display image or video */}
              <div className="mt-6">
                <p className="font-semibold">Room: {testimony.data.room}</p>
              </div>
            </div>
          ) : (
            <p className="text-white text-center">Loading content...</p>
          )}
        </div>
      </div>

      {/* Footer */}
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
