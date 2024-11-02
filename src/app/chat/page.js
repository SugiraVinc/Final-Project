'use client'
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

let socket;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}`;

  const {userInfo} = useSelector(state => state.auth)
  
  const [username] = useState(() => {
    if (typeof window !== 'undefined') {
      if (userInfo) {
        return userInfo.name || 'Anonymous';
      }
    }
    return 'Anonymous';
  });

  useEffect(() => {
    // Initialize socket connection with proper configuration
    socket = io(ENDPOINT, { 
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        username: username
      }
    });

    // Join chat room with username
    socket.emit('joinRoom', username);

    // Cleanup on unmount
    return () => {
      socket.emit('leaveRoom'); // Changed from 'disconnect' to 'leaveRoom'
      socket.off();
      socket.disconnect();
    }
  }, [ENDPOINT, username]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', message => {
      console.log('Received message:', message); // Debug log
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Listen for room users update
    socket.on('roomUsers', ({ users }) => {
      console.log('Room users updated:', users); // Debug log
    });

    return () => {
      socket.off('message');
      socket.off('roomUsers');
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message.trim()) {
      console.log('Sending message:', message); // Debug log
      socket.emit('chatMessage', message);
      setMessage('');
    }
  };

  const handleLeaveRoom = () => {
    socket.emit('leaveRoom');  // Changed from 'disconnect' to 'leaveRoom'
    socket.disconnect();
    window.location.href = '/';
  };

  // Function to get message style classes
  const getMessageStyles = (msg) => {
    if (msg.username === 'Chat Bot') {
      return 'mx-auto bg-gray-100 text-gray-600 max-w-sm text-center';
    }
    return msg.username === username
      ? 'ml-auto bg-blue-500 text-white'
      : 'mr-auto bg-white text-black';
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <aside className="w-64 bg-blue-600 text-white p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Safe Space</h1>
        <div className="mb-4 flex-grow">
          <h2 className="font-semibold mb-2">Room Information</h2>
          <p className="text-sm mb-2">Room Name: chat</p>
          <p className="text-sm bg-blue-500 p-2 rounded">Your username: {username}</p>
        </div>
        <button 
          onClick={handleLeaveRoom}
          className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-800 transition-colors"
        >
          Leave Room
        </button>
      </aside>
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`${getMessageStyles(msg)} rounded-lg py-2 px-4 shadow-sm max-w-[40%]`}
            >
              <p className="font-semibold text-sm mb-1">
                {msg.username} <span className="ml-2 text-xs opacity-75">{msg.time}</span>
              </p>
              <p className="text-sm">{msg.text}</p>
            </div>
          ))}
        </div>
        
        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            required
            autoComplete="off"
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chat;