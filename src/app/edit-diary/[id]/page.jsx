'use client'
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useGetNoteByIdQuery, useUpdateNoteMutation } from '@/app/slices/userSlices/userApiSlice';
import toast from 'react-hot-toast';
import ImageFotter from '@/app/components/ImageFotter';
import RealFooter from '@/app/components/RealFooter';
import MusicFooter from '@/app/components/MusicFooter';

const NotesInterface = () => {
  const router = useRouter();
  const params = useParams();
  const noteId = params.id;

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  // Fetch note data
  const { data: note, isLoading } = useGetNoteByIdQuery(noteId);

  const [updateNote] = useUpdateNoteMutation();
  useEffect(() => {
    if (note) {
      setFormData({
        title: note.data.note.title,
        content: note.data.note.content
      });
    }
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateNote({
        id: noteId,
        ...formData
      }).unwrap();
      router.push('/diary'); 
      toast.success('Edited successfully')
    } catch (err) {
      console.error('Failed to update note:', err);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-black text-white p-4">Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-black text-white p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Link href="/diary">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <span className="text-lg">Notes</span>
            </div>
            <button 
              onClick={handleSubmit}
              className="px-4 py-1 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Save
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Note Title"
              className="bg-transparent text-2xl font-semibold w-full outline-none"
            />
          </div>

          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Main note"
            className="w-full h-[calc(100vh-200px)] bg-white text-black p-4 rounded resize-none"
          />
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