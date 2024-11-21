'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLogOutMutation } from '../slices/userSlices/userApiSlice';
import { logOut } from '../slices/userSlices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi'; // For mobile menu icons

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
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
    <header className="w-9/12 bg-white p-4 flex justify-between items-center mx-auto">
      {/* Logo */}
      <div className="flex items-center font-bold">
        <Link href="/">
          Murugo
        </Link>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden">
        <button
          className="text-2xl"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />} {/* Toggle Menu Icon */}
        </button>
      </div>

      {/* Navigation Links */}
      <nav
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } absolute top-28 left-1/2 transform -translate-x-1/2 w-[80%] bg-white shadow-lg md:static md:transform-none md:top-auto md:left-auto md:w-auto md:flex md:items-center md:space-x-4 text-sm`}
      >
        {userInfo ? (
          <div
            className="relative md:inline-block px-4 md:px-0"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <p className="text-sm font-semibold cursor-pointer">{userInfo && userInfo.name}</p>
            {showDropdown && (
              <div className="absolute top-full  bg-white border border-gray-300 rounded-md shadow-lg min-w-[120px]">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="block md:inline text-sm font-semibold px-4 md:px-0"
          >
            LOGIN
          </Link>
        )}
        <Link
          href="/self-check"
          className="block md:inline text-sm font-semibold px-4 md:px-0"
        >
          SELF CHECK
        </Link>
        {userInfo && userInfo.isContributor && (
          <Link
            href="/contributor-dashboard"
            className="block md:inline text-sm font-semibold px-4 md:px-0"
          >
            Dashboard
          </Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <Link
            href="/admin-dashboard"
            className="block md:inline text-sm font-semibold px-4 md:px-0"
          >
           Admin  Dashboard
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
