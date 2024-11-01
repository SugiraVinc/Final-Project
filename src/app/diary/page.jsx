'use client'
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiSearch, FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { useGetNotesQuery, useDeleteNoteMutation} from '../slices/userSlices/userApiSlice';

const DashboardHeader = () => {
   const {data: note, refetch} = useGetNotesQuery()
   const [deleteNote] = useDeleteNoteMutation();


   useEffect(() => {
    if(note) {
      console.log(note.data.notes)
      refetch()
    }
   }, [note, refetch])

  const initialNotes = [
    {
      id: 1,
      title: "My First Diary Entry",
      content: "Today was a wonderful day filled with new experiences...",
      date: "2024-02-15",
      color: "bg-pink-100"
    },
    {
      id: 2,
      title: "Reflection",
      content: "Looking back on the past week, I've learned...",
      date: "2024-02-16",
      color: "bg-purple-100"
    },
    {
      id: 3,
      title: "Goals and Dreams",
      content: "My aspirations for the future include...",
      date: "2024-02-17",
      color: "bg-blue-100"
    }
  ];

  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

  // Handle search
  useEffect(() => {
    if(note) {
      const results = note &&  note.data.notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotes(results);
    }
  }, [searchTerm, note]);

  // Note Component
  const Note = ({ note }) => (
    <div className={`bg-purple-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-48 relative group`}>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        
        <Link href={`edit-diary/${note._id}`}>
        <button 
          className="p-1 hover:bg-white rounded-full transition-colors duration-200"
          
        >
          <FiEdit className="w-4 h-4 text-gray-600" />
        </button>
        </Link>
        <button 
          className="p-1 hover:bg-white rounded-full transition-colors duration-200"
          onClick={() => handleDelete(note._id)}
        >
          <FiTrash className="w-4 h-4 text-red-500" />
        </button>
      </div>
      
      <h3 className="font-semibold text-lg mb-2 pr-16">{note.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{note.content}</p>
      <div className="absolute bottom-4 left-4 text-xs text-gray-500">{note.createAt}</div>
    </div>
  );



 const handleDelete = async(id) => {
    try {
      await deleteNote(id).unwrap();
      refetch()
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };


  return (
    <>
      <div className="min-h-screen bg-cover bg-center bg-no-repeat p-8"
           style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
        <Header/>
        
        {/* Main container with black background */}
        <div className="mx-auto max-w-5xl bg-black/80 rounded-lg mt-10 p-6 relative h-[800px]">
          {/* My Safe Section positioned over black background */}
          <div className="absolute top-6 left-6 right-6 bg-gray-200 rounded-lg p-6 h-5/6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">My Safe</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors duration-200">
                  <span>Create note</span>
                  <Link href='create-diary'>
                    <FiPlus className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                className="w-full p-2 pl-10 rounded-full bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow duration-200" 
                placeholder="Search your notes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {note && filteredNotes.map(note => (
                <Note key={note._id} note={note} />
              ))}
            </div>

            {/* Empty State */}
            {note && note.data.notes.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-2">
                  {searchTerm ? 'No notes found matching your search.' : 'No notes yet.'}
                </p>
                <Link href="create-diary" 
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-200">
                  Create your first note
                </Link>
              </div>
            )}
          </div>
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
              <button className="text-[#1E90FF] hover:opacity-80 transition-opacity">⟲</button>
              <button className="text-[#1E90FF] hover:opacity-80 transition-opacity">◀◀</button>
              <button className="h-8 w-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors">
                <span className="text-[#1E90FF]">▶</span>
              </button>
              <button className="text-[#1E90FF] hover:opacity-80 transition-opacity">▶▶</button>
              <button className="text-[#1E90FF] hover:opacity-80 transition-opacity">⟳</button>
              <div className="h-[2px] bg-black flex-1" />
            </div>
            <button className="text-[#1E90FF] hover:opacity-80 transition-opacity">🔊</button>
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

              <div className="border-[15px] border-black bg-white w-[35%]">
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
              <Link href="https://facebook.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                <FaFacebookF size={20} />
              </Link>
              <Link href="https://twitter.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                <FaTwitter size={20} />
              </Link>
              <Link href="https://instagram.com" className="w-6 h-6 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity">
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

export default DashboardHeader;