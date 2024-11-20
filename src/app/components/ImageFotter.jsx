import React from 'react';

const ImageFotter = () => {
  return (
    <div className="bg-[#FFFBA0] p-4">
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Centered Logo */}
        <img
          src="/FreshLink Logo OG 1.png"
          alt="Hope"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-14 mt-6 z-10"
        />

        {/* Left Image */}
        <div className="border-[15px] border-black bg-white w-full md:w-[30%]">
          <div className="p-2">
            <img src="/Poetherapy (1).png" alt="I will not take me away" className="w-full" />
          </div>
        </div>

        {/* Center Image */}
        <div className="border-[15px] border-black bg-white w-full md:w-[35%]">
          <div className="p-1">
            <img
              src="/Lil Wayne (3).png"
              alt="HEAL"
              className="w-full h-auto md:h-72 ml-0 md:ml-1"
            />
          </div>
        </div>

        {/* Right Image */}
        <div className="border-[15px] border-black bg-white w-full md:w-[30%]">
          <div className="p-2">
            <img src="/Selena Gomez Quote 1.png" alt="Selena Gomez quote" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageFotter;
