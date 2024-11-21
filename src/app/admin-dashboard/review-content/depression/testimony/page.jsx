'use client';
import Header from '@/app/components/Header';
import ImageFotter from '@/app/components/ImageFotter';
import MusicPlayer from '@/app/components/MusicFooter';
import RealFooter from '@/app/components/RealFooter';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useGetAllTestimonyQuery, useDeleteTestimonyMutation } from '@/app/slices/userSlices/userApiSlice';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Importing icons

const DashboardHeader = () => {
  const { data: testimonies, refetch } = useGetAllTestimonyQuery();
  const [deleteTestimony] = useDeleteTestimonyMutation()

  useEffect(() => {
    if(testimonies) {
     refetch()
    }
  }, [testimonies])

  // Delete function (you can replace this with actual delete logic later)
  const handleDelete = async(id) => {
    try {
      await deleteTestimony(id).unwrap()
      refetch()
    } catch (error) {
      console.log(error)
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
          {testimonies && testimonies.data ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full bg-[#D9D9D9] rounded-lg shadow-lg">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Room</th>
                    <th className="px-4 py-2 text-left">Description</th>
                    <th className="px-4 py-2 text-left">Action</th> {/* New Action column */}
                  </tr>
                </thead>
                <tbody>
                  {testimonies.data.filter((cont) => cont.room === 'Depression').map((testimony) => (
                      <tr key={testimony._id} className="cursor-pointer border-b border-gray-300 hover:bg-gray-200">
                        <td className="px-4 py-2">{testimony.title}</td>
                        <td className="px-4 py-2">{testimony.room}</td>
                        <td className="px-4 py-2">
                          {testimony.description.slice(0, 50)}...
                        </td>
                        <td className="px-4 py-2 flex justify-start gap-4">
                          <Link href={`/admin-dashboard/review-content/depression/testimony/${testimony._id}`}>
                            <FiEdit className="text-blue-600 cursor-pointer hover:text-blue-800" />
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(testimony._id);
                            }}
                          >
                            <FiTrash2 className="text-red-600 cursor-pointer hover:text-red-800" />
                          </button>
                        </td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-white text-center">Loading testimonies...</p>
          )}
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
