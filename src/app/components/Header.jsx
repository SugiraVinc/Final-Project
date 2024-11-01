'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLogOutMutation } from '../slices/userSlices/userApiSlice'

const Header = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const [logout] = useLogOutMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = async() => {
    try {
      localStorage.removeItem('userInfo');
      setUser(null);
      await logout();
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-9/12 bg-white p-4 flex justify-between items-center mx-auto">
      <div className="flex items-center">
        <Link href="/"><img src="/logo.png" alt="Logo" className="w-5 h-5" /></Link>
      </div>
      <nav className="flex items-center space-x-4">
        {user ? (
          <div 
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <p className="text-sm font-semibold cursor-pointer">{user.name}</p>
            {showDropdown && (
              <div className="absolute top-4 left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg min-w-[120px]">
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
          <Link href="/login" className="text-sm font-semibold">LOGIN</Link>
        )}
        <Link href="/self-check" className="text-sm font-semibold">SELF CHECK</Link>
        {user && user.isContributor && (
          <Link href="/contributor-dashboard" className="text-sm font-semibold">Dashboard</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;