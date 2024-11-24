'use client';
import React, { useState } from 'react';
import {
  useGetSingleContentQuery,
  useCreateCommentMutation,
  useGetCommentQuery,
  useCreateLikeMutation,
  useGetLikeQuery,
} from '@/app/slices/userSlices/userApiSlice';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import MusicFooter from '@/app/components/MusicFooter';
import ImageFotter from '@/app/components/ImageFotter';
import RealFooter from '@/app/components/RealFooter';
import { FaLink } from 'react-icons/fa'; 
import toast from 'react-hot-toast';
import Loader from '@/app/components/Loader';

const Page = () => {
  const params = useParams();
  const id = params.id;

  const { data: content, isLoading: contentLoading } = useGetSingleContentQuery(id);
  const { data: commentsData, refetch: refetchComments } = useGetCommentQuery(id);
  const { data: likesData, refetch: refetchLikes } = useGetLikeQuery(id);
  const [createComment] = useCreateCommentMutation();
  const [createLike] = useCreateLikeMutation();

  const [commentInput, setCommentInput] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const handleLike = async () => {
    try {
      await createLike({ id }).unwrap();
      refetchLikes();
    } catch (err) {
      console.error('Error liking content:', err);
      toast.error(err?.data?.message);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      try {
        await createComment({ id, comment: commentInput }).unwrap();
        setCommentInput('');
        refetchComments();
      } catch (err) {
        console.error('Error creating comment:', err);
        toast.error(err?.data?.message);
      }
    }
  };

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopyMessage('Link copied!');
      setTimeout(() => setCopyMessage(''), 3000);
    });
  };

  if (contentLoading || !content) {
    return <Loader/>
  }

  const { title, description, mediaType, media: { url } } = content.data;
  const comments = commentsData?.data || [];
  const totalLikes = likesData?.data?.totalLikes || 0;

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat p-4 sm:p-6 lg:p-8"
        style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}
      >
        <Header />

        <div className="mx-auto max-w-7xl rounded-lg bg-black/80 p-4 sm:p-6 lg:p-8 mt-10 h-auto flex flex-col space-y-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 sm:p-6 lg:p-8">
            {/* Title with Copy Icon */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyUrl}
                  className="flex items-center px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none transition-all duration-200"
                  title="Copy URL"
                >
                  <FaLink className="text-gray-600" />
                </button>
                {copyMessage && <span className="text-sm text-green-500">{copyMessage}</span>}
              </div>
            </div>

            {/* Media */}
            {mediaType === 'image' && (
  <div className="relative max-w-[800px] rounded-lg mb-6">
    <img
      src={url}
      alt={title}
      className="w-full h-auto max-h-[400px] max-w-[800px] rounded-lg mx-auto"
    />
  </div>
)}
            {mediaType === 'video' && (
              <video
                src={url}
                controls
                className="w-full h-auto max-h-[400px] rounded-lg mb-6"
              />
            )}

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-700 mb-6">{description}</p>

          
<div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-6 gap-4">
  <button
    onClick={handleLike}
    className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-200"
  >
    Like ({totalLikes})
  </button>
  <form
    onSubmit={handleComment}
    className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-0"
  >
    <input
      type="text"
      value={commentInput}
      onChange={(e) => setCommentInput(e.target.value)}
      placeholder="Write a comment..."
      className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-orange-300 sm:rounded-r-none"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg sm:rounded-l-none hover:bg-orange-600 transition-all duration-200"
    >
      Comment
    </button>
  </form>
</div>


            {/* Comments Section */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Comments</h2>
              {comments.length === 0 ? (
                <p className="text-gray-600">No comments yet. Be the first to comment!</p>
              ) : (
                <ul className="space-y-2">
                  {comments.map((comment) => (
                    <li
                      key={comment._id}
                      className="p-2 bg-white rounded-lg shadow-sm border"
                    >
                      <span className="font-bold">{comment.name}:</span> {comment.comment}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default Page;
