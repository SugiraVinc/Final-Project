'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLogOutMutation } from '../slices/userSlices/userApiSlice';
import { logOut } from '../slices/userSlices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [logout] = useLogOutMutation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logOut());
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-9/12 bg-gradient-to-r from-gray-100 to-white shadow-lg p-4 flex justify-between items-center rounded-lg mx-auto">
      {/* Logo */}
      <div className="flex items-center font-bold text-lg text-gray-800">
        <Link href="/" className="hover:text-blue-600 transition duration-200">
          Murugo
        </Link>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <button
          className="text-2xl text-gray-600 hover:text-blue-600 transition duration-200"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } absolute top-28 z-50 left-1/2 transform -translate-x-1/2 w-[80%] bg-white shadow-lg rounded-lg md:static md:transform-none md:top-auto md:left-auto md:w-auto md:flex md:items-center md:space-x-4 text-sm`}
      >
        {userInfo ? (
          <div
            className="relative md:inline-block px-4 md:px-0"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              className="flex items-center space-x-2 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="text-sm font-semibold">{userInfo && userInfo.name}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  showDropdown ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 transition-all duration-200 ease-in-out transform opacity-100 scale-100">
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  <FiUser className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="block md:inline text-sm font-semibold px-4 md:px-0 text-gray-800 hover:text-blue-600 transition duration-200"
          >
            LOGIN
          </Link>
        )}
        {userInfo && userInfo.isContributor && (
          <Link
            href="/contributor-dashboard"
            className="block md:inline text-sm font-semibold px-4 md:px-0 text-gray-800 hover:text-blue-600 transition duration-200"
          >
            Dashboard
          </Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <Link
            href="/admin-dashboard"
            className="block md:inline text-sm font-semibold px-4 md:px-0 text-gray-800 hover:text-blue-600 transition duration-200"
          >
            Admin Dashboard
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
