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

    const ITEMS_PER_PAGE = 6;

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

    // Pagination logic for content
    const paginatedContent = content?.data.slice(
        (currentPageContent - 1) * ITEMS_PER_PAGE,
        currentPageContent * ITEMS_PER_PAGE
    );

    // Pagination logic for poem
    const paginatedPoems = poem?.data.slice(
        (currentPagePoem - 1) * ITEMS_PER_PAGE,
        currentPagePoem * ITEMS_PER_PAGE
    );

    const handleNextContentPage = () => {
        if (content && currentPageContent < Math.ceil(content.data.length / ITEMS_PER_PAGE)) {
            setCurrentPageContent(currentPageContent + 1);
        }
    };

    const handlePreviousContentPage = () => {
        if (currentPageContent > 1) {
            setCurrentPageContent(currentPageContent - 1);
        }
    };

    const handleNextPoemPage = () => {
        if (poem && currentPagePoem < Math.ceil(poem.data.length / ITEMS_PER_PAGE)) {
            setCurrentPagePoem(currentPagePoem + 1);
        }
    };

    const handlePreviousPoemPage = () => {
        if (currentPagePoem > 1) {
            setCurrentPagePoem(currentPagePoem - 1);
        }
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
                <div className="w-11/12 max-w-6xl aspect-video relative rounded-lg overflow-hidden shadow-lg">
                    <img
                        src="/BC.jpg"
                        alt="Waterfall background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {/* Navigation Bar */}
                        <div className="w-96 bg-[#8BA6A9] text-white py-2 px-4 flex gap-8 justify-center mb-4">
                            <span
                                className={`cursor-pointer ${!showVideos && !showPoems ? 'underline' : ''}`}
                                onClick={() => {
                                    setShowVideos(false);
                                    setShowPoems(false);
                                    setCurrentPageContent(1);
                                }}
                            >
                                Gallery
                            </span>
                            <span>-</span>
                            <span
                                className={`cursor-pointer ${showVideos ? 'underline' : ''}`}
                                onClick={() => {
                                    setShowVideos(true);
                                    setShowPoems(false);
                                    setCurrentPageContent(2);
                                }}
                            >
                                Videos
                            </span>
                            <span
                                className={`cursor-pointer ${showPoems ? 'underline' : ''}`}
                                onClick={() => {
                                    setShowVideos(false);
                                    setShowPoems(true);
                                }}
                            >
                                Poems
                            </span>
                        </div>

                        {/* Media Grid */}
                        {!showPoems && (
                            <div className="relative">
                                <div className="grid grid-cols-3 gap-4 p-4">
                                    {paginatedContent &&
                                        paginatedContent
                                            .filter((cont) => cont.room === 'Depression')
                                            .filter((cont) =>
                                                showVideos
                                                    ? cont.mediaType === 'video'
                                                    : cont.mediaType === 'image'
                                            )
                                            .map((cont) => (
                                                <div
                                                    key={cont._id}
                                                   // Replace with desired link
                                                    className="flex flex-col aspect-square w-60 h-60 cursor-pointer"
                                                >
                                                    <div
                                                        className="relative h-52 overflow-hidden rounded-lg shadow-md group"
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
                                                      href={`/content/${cont._id}`}
                                                     className="mt-2 text-center">
                                                        <h3 className="text-white text-sm font-medium bg-[#8BA6A9] py-1 px-3 rounded-full shadow-sm">
                                                            {cont.title}
                                                        </h3>
                                                    </Link>
                                                </div>
                                            ))}
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="text-white bg-gray-600 px-3 py-1 rounded shadow hover:bg-gray-700"
                                        onClick={handlePreviousContentPage}
                                        disabled={currentPageContent === 1}
                                    >
                                        ←
                                    </button>
                                    <button
                                        className="text-white bg-gray-600 px-3 py-1 rounded shadow hover:bg-gray-700"
                                        onClick={handleNextContentPage}
                                        disabled={
                                            content &&
                                            currentPageContent >=
                                                Math.ceil(content.data.length / ITEMS_PER_PAGE)
                                        }
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Poems Grid */}
                        {showPoems && (
                            <div className="relative">
                                <div className="grid grid-cols-3 gap-4 p-4">
                                    {paginatedPoems &&
                                        paginatedPoems
                                            .filter((poemItem) => poemItem.room === 'Depression')
                                            .map((poemItem) => (
                                                <Link
                                                    key={poemItem._id}
                                                    href={`/depression-room/creative-pieces/${poemItem._id}`} // Replace with desired link
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

                                {/* Pagination Controls */}
                                <div className="flex justify-between mt-4">
                                    <button
                                        className="text-white bg-gray-600 px-3 py-1 rounded shadow hover:bg-gray-700"
                                        onClick={handlePreviousPoemPage}
                                        disabled={currentPagePoem === 1}
                                    >
                                        ←
                                    </button>
                                    <button
                                        className="text-white bg-gray-600 px-3 py-1 rounded shadow hover:bg-gray-700"
                                        onClick={handleNextPoemPage}
                                        disabled={
                                            poem &&
                                            currentPagePoem >= Math.ceil(poem.data.length / ITEMS_PER_PAGE)
                                        }
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Modal for Video */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
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
