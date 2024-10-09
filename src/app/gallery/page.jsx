import React from 'react'
import Header from '../components/Header'
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Page = () => {
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14" style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
            <Header />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-11/12 max-w-6xl aspect-video relative rounded-lg overflow-hidden shadow-lg">
                    <img src="/BC.jpg" alt="Waterfall background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full max-w-5xl bg-black bg-opacity-70 p-8 rounded-lg">
                            <div className="flex justify-center space-x-4 mb-8">
                                <button className="px-6 py-2 bg-white rounded-full">Gallery</button>
                                <button className="px-6 py-2 bg-white rounded-full">Videos</button>
                                <button className="px-6 py-2 bg-white rounded-full">Recommendations</button>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                                {/* First row */}
                                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                                    <img src="/Poetherapy (1).png" alt="Art 1" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                                        <p className="text-white text-sm">Description of the art</p>
                                    </div>
                                </div>
                                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                                    <img src="/Lil Wayne (3).png" alt="Art 2" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                                        <p className="text-white text-sm">Description of the art</p>
                                    </div>
                                </div>
                                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                                    <img src="/Selena Gomez Quote 1.png" alt="Art 3" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                                        <p className="text-white text-sm">Description of the art</p>
                                    </div>
                                </div>

                                {/* Second row */}
                                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                                    <img src="/placeholder-4.jpg" alt="Art 4" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                                        <p className="text-white text-sm">Description of the art</p>
                                    </div>
                                </div>
                                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                                    <img src="/placeholder-5.jpg" alt="Art 5" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                                        <p className="text-white text-sm">Description of the art</p>
                                    </div>
                                </div>
                                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                                    <img src="/placeholder-6.jpg" alt="Art 6" className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
                                        <p className="text-white text-sm">Description of the art</p>
                                    </div>
                                </div>

            
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <div className="w-full">
                    {/* Player controls bar */}
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

                    {/* Main content area */}
                    <div className="bg-[#FFFBA0] p-4">
                        <div className="relative flex justify-between items-center">
                            <img
                                src="/FreshLink Logo OG 1.png"
                                alt="Hope"
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-14 mt-6 z-10"
                            />

                            {/* Left image */}
                            <div className="border-[15px] border-black bg-white w-[30%]">
                                <div className="p-2">
                                    <img src="/Poetherapy (1).png" alt="I will not take me away" className="w-full" />
                                </div>
                            </div>

                            {/* Middle image */}
                            <div className="border-[15px] border-black bg-white w-[35%]">
                                <div className="p-1">
                                    <img src="/Lil Wayne (3).png" alt="HEAL" className="w-full h-72 ml-1" />
                                </div>
                            </div>

                            {/* Right image */}
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
                            <Link href="https://facebook.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                                <FaFacebookF size={20} />
                            </Link>
                            <Link href="https://twitter.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                                <FaTwitter size={20} />
                            </Link>
                            <Link href="https://instagram.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white">
                                <FaInstagram size={20} />
                            </Link>
                        </div>
                    </div>

                    <div className="text-center text-white text-xs mt-10">
                        © Copyright Year
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Page;