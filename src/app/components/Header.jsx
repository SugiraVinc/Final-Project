'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLogOutMutation } from '../slices/userSlices/userApiSlice'

const Header = () => {
  const [user, setUser] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
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
            onMouseEnter={() => setShowLogout(true)}
            onMouseLeave={() => setShowLogout(false)}
          >
            <p className="text-sm font-semibold cursor-pointer">{user.name}</p>
            {showLogout && (
              <button 
                onClick={handleLogout}
                className="absolute top-4 left-0 mt-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md shadow text-sm"
              >
                Logout
              </button>
            )}
          </div>
        ) : (
          <Link href="/login" className="text-sm font-semibold">LOGIN</Link>
        )}
        <Link href="/self-check" className="text-sm font-semibold">SELF CHECK</Link>
      </nav>
    </header>
  );
};

export default Header;
