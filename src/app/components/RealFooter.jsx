import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const RealFooter = () => {
  return (
    <div className="bg-[#4AA9AD] py-8">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Logo Section */}
        <div className="text-center">
          <img src="/smile2.png" alt="Smile" className="w-7 h-7 mx-auto" />
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center sm:justify-end space-x-6">
          <Link
            href="https://facebook.com"
            className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-gray-200 transition-colors"
          >
            <FaFacebookF size={20} />
          </Link>
          <Link
            href="https://twitter.com"
            className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-gray-200 transition-colors"
          >
            <FaTwitter size={20} />
          </Link>
          <Link
            href="https://instagram.com"
            className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-gray-200 transition-colors"
          >
            <FaInstagram size={20} />
          </Link>
        </div>
      </div>

      {/* Footer Text */}
      <div className="text-center text-white text-xs mt-6">
        © {new Date().getFullYear()} Your Company Name
      </div>
    </div>
  );
};

export default RealFooter;
