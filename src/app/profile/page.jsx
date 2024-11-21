'use client'
import React, { useState } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { useDeleteUserMutation, useLogOutMutation, useSetContributorMutation } from '../slices/userSlices/userApiSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut } from '../slices/userSlices/authSlice';
import MusicFooter from '../components/MusicFooter';
import ImageFotter from '../components/ImageFotter';
import RealFooter from '../components/RealFooter';
import toast from 'react-hot-toast';

const DashboardHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const [isDeleting, setIsDeleting] = useState(false);

  const [deleteUser] = useDeleteUserMutation();
  const [logoutApi] = useLogOutMutation();
  const [setContribute, {isLoading}] = useSetContributorMutation()

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

  const handleSetContribute = async() => {
try {
  await setContribute().unwrap()
  router.push('/contributor-dashboard')
  toast.success("You are now a contributor!")
} catch (error) {
  console.log(error)
  toast.error('something is wrong')
}
  }
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
              onClick={handleSetContribute}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded flex items-center gap-2 text-sm"
              >
                {isLoading? "contribute..":"Contribute"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
                <div className="w-full">
                    <MusicFooter/>
                    <ImageFotter/>                    
                </div>
                <RealFooter/>               
            </footer>
    </>
  );
};

export default DashboardHeader;