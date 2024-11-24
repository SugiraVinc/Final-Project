'use client';
import React, { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import { useGetAllContentQuery, useGetAllPoemQuery } from '../../slices/userSlices/userApiSlice';
import MusicFooter from '@/app/components/MusicFooter';
import ImageFotter from '@/app/components/ImageFotter';
import RealFooter from '@/app/components/RealFooter';
import Link from 'next/link';

const Page = () => {
    const { data: content, refetch } = useGetAllContentQuery();
    const { data: poem, refetch: refetchPoem } = useGetAllPoemQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showVideos, setShowVideos] = useState(false);
    const [showPoems, setShowPoems] = useState(false);
    const [currentPageContent, setCurrentPageContent] = useState(1);
    const [currentPagePoem, setCurrentPagePoem] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    // Responsive items per page
    const ITEMS_PER_PAGE = isMobile ? 3 : 6;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (content) {
            refetch();
            refetchPoem();
        }
    }, [content, refetch, refetchPoem]);

    const handleVideoClick = (media) => {
        setSelectedMedia(media);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedia(null);
    };

    // Get filtered content data
    const filteredContent = content?.data.filter(
        (cont) => 
            cont.room === 'Depression' && 
            (showVideos ? cont.mediaType === 'video' : cont.mediaType === 'image')
    ) || [];

    // Get filtered poem data
    const filteredPoems = poem?.data.filter(
        (poemItem) => poemItem.room === 'Depression'
    ) || [];

    // Pagination logic for content
    const paginatedContent = filteredContent.slice(
        (currentPageContent - 1) * ITEMS_PER_PAGE,
        currentPageContent * ITEMS_PER_PAGE
    );

    // Pagination logic for poem
    const paginatedPoems = filteredPoems.slice(
        (currentPagePoem - 1) * ITEMS_PER_PAGE,
        currentPagePoem * ITEMS_PER_PAGE
    );

    const handleNextPage = () => {
        if (showPoems) {
            if (currentPagePoem < Math.ceil(filteredPoems.length / ITEMS_PER_PAGE)) {
                setCurrentPagePoem(currentPagePoem + 1);
            }
        } else {
            if (currentPageContent < Math.ceil(filteredContent.length / ITEMS_PER_PAGE)) {
                setCurrentPageContent(currentPageContent + 1);
            }
        }
    };

    const handlePreviousPage = () => {
        if (showPoems) {
            if (currentPagePoem > 1) {
                setCurrentPagePoem(currentPagePoem - 1);
            }
        } else {
            if (currentPageContent > 1) {
                setCurrentPageContent(currentPageContent - 1);
            }
        }
    };

    const resetPagination = () => {
        setCurrentPageContent(1);
        setCurrentPagePoem(1);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14"
            style={{
                backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')`,
            }}
        >
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-11/12 max-w-6xl min-h-[900px] relative rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/BC.jpg"
                        alt="Waterfall background"
                        className="w-full h-full object-cover absolute inset-0 mt-2 h-full rounded-lg md:mt-0 md:h-full md:rounded-none"
                    />
                    <div className="absolute inset-0 flex flex-col items-center">
                        {/* Navigation Bar - Added z-10 to ensure visibility */}
                        <div className="sticky top-0  bg-[#8BA6A9] text-white py-2 px-4 flex gap-4 md:gap-8 justify-center mb-4 mx-auto z-10 w-full md:w-96 mt-0 md:mt-4">
                            <span
                                className={`cursor-pointer text-sm md:text-base ${!showVideos && !showPoems ? 'underline' : ''}`}
                                onClick={() => {
                                    setShowVideos(false);
                                    setShowPoems(false);
                                    resetPagination();
                                }}
                            >
                                Gallery
                            </span>
                            <span>-</span>
                            <span
                                className={`cursor-pointer text-sm md:text-base ${showVideos ? 'underline' : ''}`}
                                onClick={() => {
                                    setShowVideos(true);
                                    setShowPoems(false);
                                    resetPagination();
                                }}
                            >
                                Videos
                            </span>
                            <span
                                className={`cursor-pointer text-sm md:text-base ${showPoems ? 'underline' : ''}`}
                                onClick={() => {
                                    setShowVideos(false);
                                    setShowPoems(true);
                                    resetPagination();
                                }}
                            >
                                Poems
                            </span>
                        </div>

                        {/* Content Display - Wrapped in a container with padding-bottom */}
                        <div className="relative w-full px-2 md:px-4 pb-20">
                            {!showPoems ? (
                                // Media Grid
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:p-4">
                                    {paginatedContent.map((cont) => (
                                        <div
                                            key={cont._id}
                                            className="flex flex-col aspect-square w-full md:w-60 h-48 md:h-60 mx-auto"
                                        >
                                            <div
                                                className="relative h-40 md:h-52 overflow-hidden rounded-lg shadow-md group"
                                                onClick={() =>
                                                    cont.mediaType === 'video' &&
                                                    handleVideoClick(cont.media)
                                                }
                                            >
                                                {cont.mediaType === 'video' ? (
                                                    <video
                                                        src={cont.media.url}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        muted
                                                    />
                                                ) : (
                                                    <img
                                                        src={cont.media.url}
                                                        alt=""
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <Link
                                                href={`/depression-room/creative-pieces/content/${cont._id}`}
                                                className="mt-2 text-center"
                                            >
                                                <h3 className="text-white text-sm font-medium bg-[#8BA6A9] py-1 px-3 rounded-full shadow-sm">
                                                    {cont.title}
                                                </h3>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Poems Grid
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 md:p-4">
                                    {paginatedPoems.map((poemItem) => (
                                        <Link
                                            key={poemItem._id}
                                            href={`/depression-room/creative-pieces/${poemItem._id}`}
                                            className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {poemItem.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mt-2">
                                                {poemItem.description.slice(0, 50)}...
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Pagination Controls - Now positioned at the bottom with fixed width */}
                            <div className="fixed bottom-4 left-0 right-0 flex justify-center w-full px-4 z-10">
                                <div className="bg-gray-800/70 rounded-full px-4 py-2 flex gap-4">
                                    <button
                                        className="text-white bg-gray-600 px-6 py-2 rounded-full shadow hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handlePreviousPage}
                                        disabled={showPoems ? currentPagePoem === 1 : currentPageContent === 1}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        className="text-white bg-gray-600 px-6 py-2 rounded-full shadow hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={handleNextPage}
                                        disabled={
                                            showPoems
                                                ? currentPagePoem >= Math.ceil(filteredPoems.length / ITEMS_PER_PAGE)
                                                : currentPageContent >= Math.ceil(filteredContent.length / ITEMS_PER_PAGE)
                                        }
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal for Video */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={closeModal}
                >
                    <button
                        className="absolute top-4 right-4 bg-gray-200 text-gray-700 rounded-full p-2 hover:bg-gray-300 cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeModal();
                        }}
                    >
                        ✖
                    </button>
                    <div
                        className="relative bg-white rounded-lg shadow-lg p-4 w-11/12 max-w-3xl max-h-[80vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedMedia && (
                            <div className="flex justify-center items-center">
                                <video
                                    src={selectedMedia.url}
                                    controls
                                    autoPlay
                                    className="w-full max-h-[60vh] rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <footer>
                <div className="w-full">
                    <MusicFooter />
                    <ImageFotter />
                </div>
                <RealFooter />
            </footer>
        </div>
    );
};

export default Page;