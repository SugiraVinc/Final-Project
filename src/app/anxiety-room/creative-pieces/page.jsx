'use client'
import React, { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import { useGetAllContentQuery } from '../../slices/userSlices/userApiSlice';
import MusicFooter from '@/app/components/MusicFooter';
import ImageFotter from '@/app/components/ImageFotter';
import RealFooter from '@/app/components/RealFooter';

const Page = () => {
    const { data: content, refetch } = useGetAllContentQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [showVideos, setShowVideos] = useState(false); 

    useEffect(() => {
        if (content) {
            refetch();
        }
    }, [content, refetch]);

    const handleVideoClick = (media) => {
        setSelectedMedia(media);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedia(null);
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
                                className={`cursor-pointer ${!showVideos ? 'underline' : ''}`}
                                onClick={() => setShowVideos(false)}
                            >
                                Gallery
                            </span>
                            <span>-</span>
                            <span
                                className={`cursor-pointer ${showVideos ? 'underline' : ''}`}
                                onClick={() => setShowVideos(true)}
                            >
                                Videos
                            </span>
                            <span>Recommendations</span>
                        </div>

                        {/* Media Grid */}
                        <div className="grid grid-cols-3 gap-4 p-4">
                            {content &&
                                content.data
                                    .filter((cont) => cont.room === "Anxiety")
                                    .filter((cont) =>
                                        showVideos
                                            ? cont.mediaType === 'video'
                                            : cont.mediaType === 'image'
                                    )
                                    .map((cont) => (
                                        <div
                                            key={cont._id}
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
                                            <div className="mt-2 text-center">
                                                <h3 className="text-white text-sm font-medium bg-[#8BA6A9] py-1 px-3 rounded-full shadow-sm">
                                                    {cont.title}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal for Video */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={closeModal} // Close modal on backdrop click
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
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
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
