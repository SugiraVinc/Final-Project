'use client'
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Link from 'next/link';
import { FiSearch, FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import { useGetNotesQuery, useDeleteNoteMutation} from '../slices/userSlices/userApiSlice';
import ImageFotter from '../components/ImageFotter';
import RealFooter from '../components/RealFooter';
import MusicFooter from '@/app/components/MusicFooter';

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

  useEffect(() => {
    if(note) {
      const results = note &&  note.data.notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNotes(results);
    }
  }, [searchTerm, note]);

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
      
      <h3 className="font-semibold text-lg mb-2 pr-16 line-clamp-1">{note.title}</h3>
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
      <div className="min-h-screen bg-cover bg-center bg-no-repeat p-2 sm:p-4 md:p-8"
           style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
        <Header/>
        
        <div className="mx-auto max-w-5xl bg-black/80 rounded-lg mt-4 sm:mt-6 md:mt-10 p-3 sm:p-4 md:p-6 relative h-[800px]">
          <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 right-3 sm:right-4 md:right-6 bg-gray-200 rounded-lg p-3 sm:p-4 md:p-6 h-[90%] sm:h-[92%] md:h-5/6 overflow-y-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-4">
              <h2 className="text-lg sm:text-xl font-semibold">My Safe</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors duration-200">
                  <span className="text-sm sm:text-base">Create note</span>
                  <Link href='create-diary'>
                    <FiPlus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative mb-4 sm:mb-6">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                className="w-full p-2 pl-10 rounded-full bg-white focus:ring-2 focus:ring-blue-300 focus:outline-none transition-shadow duration-200 text-sm sm:text-base" 
                placeholder="Search your notes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {note && filteredNotes.map(note => (
                <Note key={note._id} note={note} />
              ))}
            </div>

            {note && note.data.notes.length === 0 && (
              <div className="text-center py-6 sm:py-10">
                <p className="text-gray-500 mb-2 text-sm sm:text-base">
                  {searchTerm ? 'No notes found matching your search.' : 'No notes yet.'}
                </p>
                <Link href="create-diary" 
                  className="text-blue-500 hover:text-blue-600 transition-colors duration-200 text-sm sm:text-base">
                  Create your first note
                </Link>
              </div>
            )}
          </div>
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

export default DashboardHeader;