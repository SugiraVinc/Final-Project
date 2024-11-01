'use client'
import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useRouter, useParams } from 'next/navigation';
import { useGetNoteByIdQuery, useUpdateNoteMutation } from '@/app/slices/userSlices/userApiSlice';
import toast from 'react-hot-toast';

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
                    <div className="bg-[#4AA9AD] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-black rounded-full" />
                            <div className="text-white">
                                <div className="text-sm">NF</div>
                                <div className="text-xs">The Search</div>
                            </div>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-4">
                            <div className="h-[2px] bg-black flex-1" />
                            <button className="text-[#1E90FF]">⟲</button>
                            <button className="text-[#1E90FF]">◀◀</button>
                            <button className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                                <span className="text-[#1E90FF]">▶</span>
                            </button>
                            <button className="text-[#1E90FF]">▶▶</button>
                            <button className="text-[#1E90FF]">⟳</button>
                            <div className="h-[2px] bg-black flex-1" />
                        </div>
                        <button className="text-[#1E90FF]">🔊</button>
                    </div>

                    <div className="bg-[#FFFBA0] p-4">
                        <div className="relative flex justify-between items-center">
                            <img
                                src="/FreshLink Logo OG 1.png"
                                alt="Hope"
                                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-14 mt-6 z-10"
                            />

                            <div className="border-[15px] border-black bg-white w-[30%]">
                                <div className="p-2">
                                    <img src="/Poetherapy (1).png" alt="I will not take me away" className="w-full" />
                                </div>
                            </div>

                            <div className="border-[15px] border-black bg-white w-[35%] ">
                                <div className="p-1">
                                    <img src="/Lil Wayne (3).png" alt="HEAL" className="w-full h-72 ml-1" />
                                </div>
                            </div>

                            <div className="border-[15px] border-black bg-white w-[30%]">
                                <div className="p-2">
                                    <img src="/Selena Gomez Quote 1.png" alt="Selena Gomez quote" className="w-full" />
                                </div>
                            </div>
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
    </>
  );
};

export default NotesInterface;