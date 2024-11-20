import Header from '@/app/components/Header';
import ImageFotter from '@/app/components/ImageFotter';
import MusicPlayer from '@/app/components/MusicFooter';
import RealFooter from '@/app/components/RealFooter';
import React from 'react';

const DashboardHeader = () => {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />
        {/* Content Section */}
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-8 mt-10 text-white">
          <h1 className="text-center text-2xl md:text-3xl font-bold mb-6">
            What is Anxiety?
          </h1>
          <p className="text-center text-sm md:text-base mb-6">
            Anxiety is a common and serious mental disorder that negatively affects 
            how you feel, think, act, and perceive the world.
          </p>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            What are the Symptoms of Anxiety?
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>poor concentration</li>
            <li>feelings of excessive guilt or low self-worth</li>
            <li>hopelessness about the future</li>
            <li>thoughts about dying or suicide</li>
            <li>disrupted sleep</li>
            <li>changes in appetite or weight</li>
            <li>feeling very tired or low in energy</li>
          </ul>
          <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-4">
            Why Art in Mental Health?
          </h2>
          <p className="text-sm md:text-base">
            Art is what keeps life’s momentum on balance, allowing us to express 
            ourselves through someone else’s creation. While we find ourselves buried 
            in our worlds, we run to art, we listen to music, we read poetry, we focus 
            on portraits, we go to see nature, and more. Art is the pillar for which we 
            stand and lay foundation before we burn out.
          </p>
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
