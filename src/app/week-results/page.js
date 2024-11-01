'use client'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useGetTestQuery } from '../slices/userSlices/userApiSlice';

const DashboardHeader = () => {
  const {data: tests, refetch} = useGetTestQuery()

  const testResults = [
    { type: 'Math', score: 85, result: 'Pass', createdAt: '2023-10-01' },
    { type: 'Science', score: 75, result: 'Pass', createdAt: '2023-09-15' },
    { type: 'History', score: 65, result: 'Fail', createdAt: '2023-08-30' },
    { type: 'English', score: 90, result: 'Pass', createdAt: '2023-08-01' },
    { type: 'Physics', score: 55, result: 'Fail', createdAt: '2023-07-15' }
  ];

  useEffect(() => {
    if(tests) {
      refetch()
    }
  },[refetch, tests])

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  // Calculate the displayed items
  const paginatedResults = tests && tests.data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Pagination controls
  const totalPages = Math.ceil((tests && tests.data.length) / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
           style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
        <Header />

        <div className="mx-auto max-w-4xl rounded-lg bg-black/80 p-8 mt-10 flex justify-center items-center">
          {/* Main container */}
          <div className="w-full max-w-lg bg-[#D9D9D9] rounded-lg p-10 relative h-[500px]">
            {/* List of test results with pagination */}
            <div className="space-y-4">
              {tests && paginatedResults.map((test, index) => (
                <div key={index} className="bg-gray-200 hover:bg-gray-300 p-4 rounded-lg">
                  <p className="text-lg font-semibold">Type: {test.type}</p>
                  <p className="text-md">Score: {test.score}</p>
                  <p className="text-md">Result: {test.result}</p>
                  <p className="text-md">Date: {new Date(test.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className={`px-4 py-2 rounded ${currentPage === totalPages - 1 ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer remains unchanged */}
      <footer>
        <div className="w-full">
          <div className="bg-[#4AA9AD] px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded-full" />
              <div className="text-white">
                <div className="text-sm">NF</div>
                <div className="text-xs">The Search</div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center gap-4">
              <div className="h-[2px] bg-black flex-1" />
              <button className="text-[#1E90FF]">⟲</button>
              <button className="text-[#1E90FF]">◀◀</button>
              <button className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-[#1E90FF]">▶</span>
              </button>
              <button className="text-[#1E90FF]">▶▶</button>
              <button className="text-[#1E90FF]">⟳</button>
              <div className="h-[2px] bg-black flex-1" />
            </div>
            <button className="text-[#1E90FF]">🔊</button>
          </div>

          <div className="bg-[#FFFBA0] p-4">
            <div className="relative flex justify-between items-center">
              <img
                src="/FreshLink Logo OG 1.png"
                alt="Hope"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-14 mt-6 z-10"
              />
              <div className="border-[15px] border-black bg-white w-[30%]">
                <div className="p-2">
                  <img src="/Poetherapy (1).png" alt="I will not take me away" className="w-full" />
                </div>
              </div>
              <div className="border-[15px] border-black bg-white w-[35%] ">
                <div className="p-1">
                  <img src="/Lil Wayne (3).png" alt="HEAL" className="w-full h-72 ml-1" />
                </div>
              </div>
              <div className="border-[15px] border-black bg-white w-[30%]">
                <div className="p-2">
                  <img src="/Selena Gomez Quote 1.png" alt="Selena Gomez quote" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#4AA9AD] py-8"> 
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="text-center">
              <img src="/smile2.png" alt="Smile" className="w-7 h-7 mx-auto" />
            </div>
            <div className="flex space-x-6">
              <a href="https://facebook.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="https://twitter.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                <FaInstagram size={20} /> 
              </a>
            </div>
          </div>
          <div className="text-center text-white text-xs mt-10">
            © Copyright Year
          </div>
        </div>
      </footer>
    </>
  );
};

export default DashboardHeader;
