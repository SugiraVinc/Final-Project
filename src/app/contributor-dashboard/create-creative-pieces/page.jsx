'use client';
import React, { useState, useRef, useEffect } from 'react';
import Header from '@/app/components/Header';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { usePostContentMutation, useGetContentQuery } from '@/app/slices/userSlices/userApiSlice';

const DashboardHeader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const fileInputRef = useRef(null);
  const [postContent, {isLoading}] = usePostContentMutation()
  const {data: getContent, refetch } = useGetContentQuery()

  useEffect(() => {
    if(getContent) {
      refetch()
    }
  }, [getContent, refetch])

  const rooms = [
    { id: 1, name: 'Depression' },
    { id: 2, name: 'Anxiety' },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((getContent && getContent.data.length) / itemsPerPage);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('Selected file:', file.name);
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select a file');
      return;
    }

    if (!selectedRoom) {
      setErrorMessage('Please select a room');
      return;
    }

    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('upload', selectedFile);
      formData.append('room', selectedRoom.name);
      formData.append('description', description);
      formData.append('title', title);

      await postContent(formData).unwrap()
      toast.success('Data sent successfully');
      refetch()
     
    } catch (err) {
      console.error('Error uploading file and room data:', err);
      toast.error(err?.data?.message);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-4 md:p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-4 md:p-6 mt-10">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
              {/* Upload and Choose Room Button Logic */}
              <div className="relative w-full md:w-auto">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*,video/*,audio/*"
                  className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2 text-sm group"
                  required
                />
              </div>

              <Link href='/contributor-dashboard/create-poem'>
              <div
                className="block text-center appearance-none w-24 bg-[#E5E7EB] border h-10 border-[#E5E7EB] hover:border-gray-500 px-2 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                
              >
               Poem
              </div>
              </Link>
              <select
                value={selectedRoom ? selectedRoom.name : ''}
                onChange={(e) => handleRoomSelect({ name: e.target.value })}
                className="w-full md:w-48 block appearance-none bg-[#E5E7EB] border h-10 border-[#E5E7EB] hover:border-gray-500 px-2 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="" className="text-red">Select Room</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="title" className="text-white text-lg">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-3 rounded-lg bg-[#E5E7EB] border border-[#4AA9AD] focus:outline-none focus:ring-2 focus:ring-[#4AA9AD] text-lg"
                placeholder="Enter the title here"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="description" className="text-white text-lg">Full Story</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-3 rounded-lg bg-[#E5E7EB] border border-[#4AA9AD] focus:outline-none focus:ring-2 focus:ring-[#4AA9AD] text-lg"
                placeholder="Enter a Full Story here"
                rows="4"
                required
              />
            </div>

            {/* Table content area with pagination */}
            <div className="mt-4 bg-gray-100 rounded-lg w-full h-[500px] p-2 md:p-6 overflow-auto">
              <div className="min-w-full overflow-x-auto">
                <table className="w-full text-left bg-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-[#4AA9AD] text-white">
                      <th className="p-2 md:p-4">Image</th>
                      <th className="p-2 md:p-4">Room</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getContent &&
                      getContent.data
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((room, index) => (
                          <tr key={index} className="border-b hover:bg-gray-200">
                            <td className="p-2 md:p-4">
                              {room.mediaType === "video" ? (
                                <video
                                  src={room.media.url}
                                  controls
                                  className="w-24 md:w-32 h-24 md:h-32 object-cover rounded-md"
                                >
                                  Your browser does not support the video tag.
                                </video>
                              ) : (
                                <img
                                  src={room.media.url}
                                  alt={room.room}
                                  className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
                                />
                              )}
                            </td>
                            <td className="p-2 md:p-4 text-gray-800">{room.room}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="w-full md:w-auto px-4 py-2 bg-[#4AA9AD] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-700 text-sm md:text-base">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="w-full md:w-auto px-4 py-2 bg-[#4AA9AD] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mt-2 text-red-500 font-medium">{errorMessage}</div>
            )}
            <div className="mt-4 self-end">
              <button type="submit" className="w-full md:w-auto px-4 py-2 bg-[#4AA9AD] text-white rounded hover:bg-[#3b8b8f]">
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <div className="bg-[#4AA9AD] px-4 py-4 md:py-2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded-full" />
              <div className="text-white">
                <div className="text-sm">NF</div>
                <div className="text-xs">The Search</div>
              </div>
            </div>
            <div className="flex space-x-6">
              <Link href="https://facebook.com" className="text-white">
                <FaFacebookF size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-white">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://instagram.com" className="text-white">
                <FaInstagram size={20} />
              </Link>
            </div>
            <div className="text-white text-xs md:mt-0">© Copyright Year</div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default DashboardHeader;