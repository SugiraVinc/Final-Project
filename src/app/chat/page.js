'use client'
import React, { useState, useEffect } from 'react';
import { Clock, Send, Smile, UserPlus, UserMinus, Bell, LogOut } from 'lucide-react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username] = useState('User-' + Math.floor(Math.random() * 1000));
  const [room, setRoom] = useState('general');
  const [joinTimestamp, setJoinTimestamp] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize room and handle welcome message
  useEffect(() => {
    if (!initialized) {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room') || 'general';
      setRoom(roomParam);
      
      const currentTime = new Date().getTime();
      setJoinTimestamp(currentTime);

      // Clear previous messages for this room
      localStorage.removeItem(`chat_messages_${roomParam}`);
      
      // Add welcome message
      const welcomeMessage = {
        username: 'System',
        text: `Welcome to the chat, ${username}! 👋`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: currentTime,
        room: roomParam,
        type: 'welcome',
        forUser: username
      };

      // Add join notification
      const joinMessage = {
        username: 'System',
        text: `${username} has joined the room`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: currentTime,
        room: roomParam,
        type: 'notification',
        forOthers: true
      };

      const newMessages = [welcomeMessage, joinMessage];
      setMessages(newMessages);
      localStorage.setItem(`chat_messages_${roomParam}`, JSON.stringify(newMessages));
      setInitialized(true);
    }
  }, [username, initialized]);

  // Handle tab/window close
  useEffect(() => {
    const handleBeforeUnload = () => {
      const leaveMessage = {
        username: 'System',
        text: `${username} has left the room`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().getTime(),
        room: room,
        type: 'notification',
        forOthers: true
      };

      const storedMessages = JSON.parse(localStorage.getItem(`chat_messages_${room}`)) || [];
      const updatedMessages = [...storedMessages, leaveMessage];
      localStorage.setItem(`chat_messages_${room}`, JSON.stringify(updatedMessages));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [username, room]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(`chat_messages_${room}`)) || [];
    setMessages(storedMessages);

    const handleStorageChange = (e) => {
      if (e.key === `chat_messages_${room}`) {
        setMessages(JSON.parse(e.newValue) || []);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [room]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message.trim()) {
      const newMessage = {
        username: username,
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date().getTime(),
        room: room,
        type: 'user'
      };

      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem(`chat_messages_${room}`, JSON.stringify(updatedMessages));
      setMessage('');
    }
  };

  // Filter messages for current room and user visibility
  const roomMessages = messages.filter(msg => {
    if (msg.room !== room) return false;
    
    // Always show regular user messages
    if (msg.type === 'user') return true;
    
    // Show welcome message only to the user it's for
    if (msg.type === 'welcome') return msg.forUser === username;
    
    // For notifications (join/leave messages):
    if (msg.type === 'notification') {
      // Don't show notifications about yourself
      if (msg.text.includes(username)) return false;
      
      // Only show notifications that happened after you joined
      return msg.timestamp >= joinTimestamp;
    }
    
    return false;
  });

  // Function to get message style classes
  const getMessageStyles = (msg) => {
    if (msg.type === 'welcome') {
      return 'mx-auto bg-blue-100 text-blue-800 max-w-md';
    }
    if (msg.type === 'notification') {
      return 'mx-auto bg-gray-100 text-gray-600 max-w-sm';
    }
    return msg.username === username
      ? 'ml-auto bg-blue-500 text-white'
      : 'mr-auto bg-white text-black';
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-6 flex items-center">
          <Smile className="mr-2" />ChatCord
        </h1>
        <div className="mb-4 flex-grow">
          <h2 className="font-semibold flex items-center mb-2">
            <Clock className="mr-2" /> Room Information
          </h2>
          <p className="text-sm mb-2">Room: {room}</p>
          <p className="text-sm bg-blue-500 p-2 rounded">Your username: {username}</p>
        </div>
        <a href="/" className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors block text-center">
          <LogOut className="inline mr-2" /> Leave Room
        </a>
      </aside>
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {roomMessages.map((msg, i) => (
            <div 
              key={i} 
              className={`${getMessageStyles(msg)} rounded-lg py-2 px-4 shadow-sm max-w-[40%] ${
                msg.type === 'notification' || msg.type === 'welcome' ? 'text-center' : ''
              }`}
            >
              {msg.type === 'notification' ? (
                <p className="text-sm flex items-center justify-center">
                  {msg.text.includes('joined') ? <UserPlus size={14} className="mr-1" /> : <UserMinus size={14} className="mr-1" />}
                  {msg.text}
                </p>
              ) : msg.type === 'welcome' ? (
                <p className="text-sm flex items-center justify-center">
                  <Bell size={14} className="mr-1" /> {msg.text}
                </p>
              ) : (
                <>
                  <p className="font-semibold text-sm flex items-center mb-1">
                    {msg.username} <span className="ml-2 text-xs opacity-75">{msg.time}</span>
                  </p>
                  <p className="text-sm">{msg.text}</p>
                </>
              )}
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
            className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-blue-700 transition-colors"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chat;