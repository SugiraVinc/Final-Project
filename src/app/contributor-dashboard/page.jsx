'use client';
import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { usePostContentMutation, useGetContentQuery } from '../slices/userSlices/userApiSlice';

const DashboardHeader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const [postContent] = usePostContentMutation()
  const {data: getContent, refetch } = useGetContentQuery()


  useEffect(() => {
    if(getContent) {
      refetch()
    }
  }, [getContent, refetch])

  const rooms = [
    { id: 1, name: 'Depression', image: '/path/to/depression_image.jpg' },
    { id: 2, name: 'Anxiety', image: '/path/to/anxiety_image.jpg' },
    { id: 3, name: 'Bipolar', image: '/path/to/bipolar_image.jpg' },
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
      formData.append('image', selectedFile);
      formData.append('room', selectedRoom.name);

      const res = await postContent(formData).unwrap()
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
        className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-6 mt-10">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              {/* Upload and Choose Room Button Logic */}
              <div className="relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*,video/*,audio/*"
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2 text-sm group"
                  required
                />
              </div>

              {/* Choose Room Dropdown */}
              <select
                value={selectedRoom ? selectedRoom.name : ''}
                onChange={(e) => handleRoomSelect({ name: e.target.value })}
                className="block appearance-none w-48 bg-[#E5E7EB] border h-10 border-[#E5E7EB] hover:border-gray-500 px-2 py-1 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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

            {/* Table content area with pagination */}
            <div className="mt-4 bg-gray-100 rounded-lg w-full h-[500px] p-6 overflow-auto">
              <table className="w-full text-left bg-white rounded-lg shadow-md">
                <thead>
                  <tr className="bg-[#4AA9AD] text-white">
                    <th className="p-4">Image</th>
                    <th className="p-4">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {getContent && getContent.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((room, index) => (
                    <tr key={index} className="border-b hover:bg-gray-200">
                      <td className="p-4">
                        <img src={room.image.url} alt={room.room} className="w-16 h-16 object-cover rounded-md" />
                      </td>
                      <td className="p-4 text-gray-800">{room.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-2 bg-[#4AA9AD] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-2 bg-[#4AA9AD] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="mt-2 text-red-500 font-medium">{errorMessage}</div>
            )}
            <div className="mt-4 self-end">
              <button type="submit" className="px-4 py-2 bg-[#4AA9AD] text-white rounded hover:bg-[#3b8b8f]">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <footer>
        {/* Footer content */}
        <div className="bg-[#4AA9AD] px-4 py-2 flex items-center justify-between">
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
          <div className="text-center text-white text-xs mt-10">© Copyright Year</div>
        </div>
      </footer>
    </>
  );
};

export default DashboardHeader;