import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import Link from 'next/link';

const LandingPage = () => {
  const topics = [
    { name: 'DEPRESSION', link: '/depression-room' }, 
    { name: 'ANXIETY', link: '/anxiety-room' },
    { name: 'BIPOLAR', link: '/bipolar' },
    { name: 'LONELINESS', link: '/loneliness' },
    { name: 'SOLITUDE', link: '/solitude' },
    { name: 'SAFE SPACE', link: '/chat' }
  ];


  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat pt-14" style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
      <Header/>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8 justify-items-center items-center">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={topic.link} 
              className="bg-white w-72 h-96 flex items-center justify-center text-center border-[15px] border-black"
            >
              <span className="text-2xl font-bold">{topic.name}</span>
            </Link>
          ))}
        </div>
      </main>

    <Footer/>
    </div>
  );
};

export default LandingPage;
