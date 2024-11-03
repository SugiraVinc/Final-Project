'use client'
import React, { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useDeleteUserMutation, useLogOutMutation } from '../slices/userSlices/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut } from '../slices/userSlices/authSlice';

const DashboardHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteUser] = useDeleteUserMutation();
  const [logoutApi] = useLogOutMutation();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        setIsDeleting(true);
        
        // Delete user account
        await deleteUser(userInfo._id).unwrap();
        
        // Logout user from backend
        await logoutApi().unwrap();
        
        // Clear Redux state
        dispatch(logOut());
        
        // Navigate to login page
        router.push('/login');
      } catch (err) {
        console.error('Error during account deletion:', err);
        alert('Failed to delete account. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>

        <Header />
        <div className="mx-auto max-w-5xl rounded-lg bg-black/80 p-6 mt-10 h-[600px] flex flex-col justify-between">
          {/* Top buttons */}
          <div className="flex justify-between items-center">
            <div className="relative">
              <Link href='diary'>
                <button
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2 text-sm group"
                >
                  <span>My Diary</span>
                </button>
              </Link>
            </div>

            <div className="relative">
              <Link href='results'>
                <button
                  className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2 text-sm"
                >
                  My progress
                </button>
              </Link>
            </div>
          </div>

          {/* Bottom buttons */}
          <div className="flex justify-between items-center">
            <div className="relative">
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2 text-sm ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isDeleting ? 'Deleting...' : 'Delete My Account'}
              </button>
            </div>

            <div className="relative">
              <button
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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
    </>
  );
};

export default DashboardHeader;