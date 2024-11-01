'use client'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRegisterMutation } from '../slices/userSlices/userApiSlice'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setCredentials } from '../slices/userSlices/authSlice'
import toast from 'react-hot-toast'

const Page = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isContributor, setIsContributor] = useState(false);
  
  const router = useRouter();
  const dispatch = useDispatch()
  const [register] = useRegisterMutation();

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      const userInfo = JSON.parse(storedUser);
      // Check if stored user is a contributor
      if (userInfo.isContributor) {
        router.push('/contributor-dashboard');
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        className: 'custom-toast-animation',
      });
    }

    try {
      const res = await register({ name, email, password, isContributor }).unwrap();
      if (res) {
        dispatch(setCredentials({...res}))
        toast.success('Registration successful', {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          className: 'custom-toast-animation',
        });
        
        if(res.isContributor) {
          router.push('/contributor-dashboard');
        } else {
          router.push('/');
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Registration failed', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        className: 'custom-toast-animation',
      });
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14" 
         style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-11/12 max-w-6xl aspect-video relative rounded-lg overflow-hidden shadow-lg">
          <img src="/BC.jpg" alt="Waterfall background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-md bg-black bg-opacity-70 p-8 rounded-lg">
              <h2 className="text-4xl font-bold mb-2 text-white text-center">Register</h2>
              <p className="text-gray-300 mb-6 text-center">Create your account</p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="bg-white rounded-sm overflow-hidden flex items-center">
                  <span className="text-gray-400 ml-3 mr-2">👤</span>
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full py-3 px-2 focus:outline-none" 
                  />
                </div>
                <div className="bg-white rounded-sm overflow-hidden flex items-center">
                  <span className="text-gray-400 ml-3 mr-2">✉️</span>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-3 px-2 focus:outline-none" 
                  />
                </div>
                <div className="bg-white rounded-sm overflow-hidden flex items-center">
                  <span className="text-gray-400 ml-3 mr-2">🔑</span>
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-3 px-2 focus:outline-none" 
                  />
                </div>
                <div className="bg-white rounded-sm overflow-hidden flex items-center">
                  <span className="text-gray-400 ml-3 mr-2">🔑</span>
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full py-3 px-2 focus:outline-none" 
                  />
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="contributor" 
                    checked={isContributor}
                    onChange={(e) => setIsContributor(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="contributor" className="text-white">Register as Contributor</label>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300"
                >
                  Register
                </button>
              </form>
              <div className="mt-4 flex justify-between text-sm text-gray-300">
                <Link href="/login">Already have an account? <span className='ml-44 hover:text-white'>Login</span></Link>
              </div>
              <div className="mt-4">
                <button className="w-full bg-white text-black py-3 rounded-full font-semibold flex items-center justify-center hover:bg-gray-200 transition duration-300">
                  <span className="mr-2 text-green-500 font-bold">G</span>
                  Register with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Page