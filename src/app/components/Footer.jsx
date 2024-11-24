import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  const partners = [
    {
      name: 'Ikizere',
      description: (
        <>
          <p>Gasabo, City of Kigali</p>
          <p>P.O Box: 423 Kigali Rwanda</p>
          <p>Email: ndera.hospital@moh.gov.rw</p>
          <p>Tel: +250 781 447 928</p>
        </>
      ),
    },
    { 
      name: 'RBC', 
      description: (
        <>
          <p>Call Center: 114</p>
          <p>Ambulance: 912</p>
          <p>Email: info@rbc.gov.rw</p>
        </>
      ),
    },
    { name: 'Ministry of Health', 
      description: (
        <>
          <p>Call Center: 114</p>
          <p>Email: info@moh.gov.rw</p>
        </>)
     },
  ];
  
  

  return (
    <footer>
      {/* Partners Section */}
      <div className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold mb-12 text-purple-400">Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <img src="/smile.png" alt="Placeholder" className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2 text-white">Solid Minds</h3>
              <p className="text-sm text-white">
                Email: info@solidminds.rw <br />
                Tel: +250 788 503 528 <br />
                PO Box 1204 Kigali
              </p>
            </div>
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <img src="/smile.png" alt="Smile" className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-bold mb-2 text-white">{partner.name}</h3>
                <p className="text-sm text-white">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-[#4AA9AD] py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <Link href="/" className="text-center">
            <img src="/smile2.png" alt="Smile" className="w-7 h-7 mx-auto" />
          </Link>

          <div className="flex justify-center sm:justify-end space-x-6">
            <Link href="https://facebook.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-gray-300">
              <FaFacebookF size={20} />
            </Link>
            <Link href="https://twitter.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-gray-300">
              <FaTwitter size={20} />
            </Link>
            <Link href="https://instagram.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:text-gray-300">
              <FaInstagram size={20} />
            </Link>
          </div>
        </div>

        <div className="text-center text-white text-xs mt-6">
          © {new Date().getFullYear()} Your Company Name
        </div>
      </div>
    </footer>
  );
};

export default Footer;
