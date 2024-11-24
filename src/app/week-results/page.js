'use client'
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useGetTestQuery } from '../slices/userSlices/userApiSlice';
import ImageFotter from '../components/ImageFotter';
import RealFooter from '../components/RealFooter';
import MusicFooter from '@/app/components/MusicFooter';


const DashboardHeader = () => {
  const {data: tests, refetch} = useGetTestQuery()

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
      <div className="min-h-screen bg-cover bg-center bg-no-repeat p-4 sm:p-6 md:p-8"
           style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
        <Header />

        <div className="mx-auto max-w-4xl rounded-lg bg-black/80 p-4 sm:p-6 md:p-8 mt-4 sm:mt-6 md:mt-10 flex justify-center items-center">
          {/* Main container */}
          <div className="w-full max-w-lg bg-[#D9D9D9] rounded-lg p-4 sm:p-6 md:p-10 relative min-h-[400px] sm:min-h-[450px] md:h-[500px] overflow-y-auto">
            {/* List of test results with pagination */}
            <div className="space-y-3 sm:space-y-4">
              {tests && paginatedResults.map((test, index) => (
                <div key={index} className="bg-gray-200 hover:bg-gray-300 p-3 sm:p-4 rounded-lg">
                  <p className="text-base sm:text-lg font-semibold">Type: {test.type}</p>
                  <p className="text-sm sm:text-md">Score: {test.score}</p>
                  <p className="text-sm sm:text-md">Result: {test.result}</p>
                  <p className="text-sm sm:text-md">Date: {new Date(test.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded ${currentPage === 0 ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded ${currentPage === totalPages - 1 ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
              >
                Next
              </button>
            </div>
          </div>
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