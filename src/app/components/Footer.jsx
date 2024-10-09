import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
    const partners = [
        { name: 'Ikizere', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'RBC', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { name: 'Ministry of Health', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
      ];
  return (
    <footer>
        <div className="bg-black text-white py-12 min-h-[400px]">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-bold mb-12 text-purple-400">Partners</h2>
            <div className="grid grid-cols-4 gap-8">
              <div className="text-center">
                <img src="/smile.png" alt="Placeholder" className="w-8 h-8 mx-auto mb-4" />
                <h3 className="font-bold mb-2 text-white">Solid Minds</h3>
                <p className="text-sm text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
  )
}

export default Footer
