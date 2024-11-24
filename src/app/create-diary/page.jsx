'use client'
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCreateNoteMutation } from '../slices/userSlices/userApiSlice';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import ImageFotter from '../components/ImageFotter';
import MusicFooter from '@/app/components/MusicFooter';
import RealFooter from '../components/RealFooter';

const NotesInterface = () => {
  const [createNote] = useCreateNoteMutation();
  const router = useRouter();
  const [noteData, setNoteData] = useState({
    title: '',
    content: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote(noteData).unwrap();
      router.push('/diary');
      toast.success('note created successfully')

    } catch (error) {
      console.error('Failed to create note:', error);
     
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Link href='/diary'>
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <span className="text-lg">Notes</span>
              </div>
              <button 
                type="submit" 
                className="px-4 py-1 bg-gray-200 text-black rounded hover:bg-gray-300 transition-colors"
              >
                Save
              </button>
            </div>

            {/* Note Title */}
            <div className="mb-4">
              <input
                type="text"
                name="title"
                value={noteData.title}
                onChange={handleChange}
                placeholder="Note Title"
                required
                className="bg-transparent text-2xl font-semibold w-full outline-none"
              />
            </div>

            {/* Main Note Content */}
            <textarea
              name="content"
              value={noteData.content}
              onChange={handleChange}
              placeholder="Main note"
              required
              className="w-full h-[calc(100vh-200px)] bg-white text-black p-4 rounded resize-none"
            />
          </form>
        </div>
      </div>

      <footer>
        <div className="w-full">
          <MusicFooter />
          <ImageFotter />                    
        </div>
        <RealFooter />               
      </footer>
    </>
  );
};

export default NotesInterface;