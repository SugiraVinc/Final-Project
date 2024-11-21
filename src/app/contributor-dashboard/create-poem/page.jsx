'use client'
import Header from '@/app/components/Header';
import ImageFotter from '@/app/components/ImageFotter';
import MusicPlayer from '@/app/components/MusicFooter';
import RealFooter from '@/app/components/RealFooter';
import React, { useState } from 'react';
import { useCreatePoemMutation } from '@/app/slices/userSlices/userApiSlice';
import toast from 'react-hot-toast';

const DashboardHeader = () => {
  // State to handle form input
  const [createPoem, {isLoading}] = useCreatePoemMutation()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    room: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      await createPoem(formData).unwrap()   
      toast.success("created successfully") 
    } catch (err) {
      console.log(err)
      toast.error(err.data.message)
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
          <h1 className="text-center text-white text-2xl font-bold mb-6">CREATE POEM</h1>
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#D9D9D9] rounded-lg p-6 shadow-md mx-auto max-w-3xl"
          >
            {/* Title Field */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-black font-semibold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter a title"
                className="w-full rounded-md border border-gray-300 p-3"
              />
            </div>
            
            {/* Description Field */}
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-black font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter a description"
                className="w-full rounded-md border border-gray-300 p-3 resize-none"
                rows={4}
              />
            </div>
            
            {/* Room Selection Field */}
            <div className="mb-4">
              <label
                htmlFor="room"
                className="block text-black font-semibold mb-2"
              >
                Select a Room
              </label>
              <select
                id="room"
                name="room"
                value={formData.room}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-3 bg-white"
              >
                <option value="" disabled>
                  Choose a room
                </option>
                <option value="Anxiety">Anxiety</option>
                <option value="Depression">Depression</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
            >
              {isLoading? "Submitting...": "Submit"}
            </button>
          </form>
        </div>
      </div>
      <footer>
        <div className="w-full">
          <MusicPlayer />
          <ImageFotter />
        </div>
        <RealFooter />
      </footer>
    </>
  );
};

export default DashboardHeader;
