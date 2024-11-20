import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Link from 'next/link';

const LandingPage = () => {
  const topics = [
    { name: 'DEPRESSION', link: '/depression-room' }, 
    { name: 'ANXIETY', link: '/anxiety-room' },
    { name: 'SAFE SPACE', link: '/chat' }
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat pt-14"
      style={{
        backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')`,
      }}
    >
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center items-center"
        >
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={topic.link}
              className="bg-white w-full sm:w-64 md:w-72 h-64 sm:h-80 md:h-96 flex items-center justify-center text-center border-[10px] sm:border-[12px] md:border-[15px] border-black"
            >
              <span className="text-lg sm:text-xl md:text-2xl font-bold">
                {topic.name}
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
