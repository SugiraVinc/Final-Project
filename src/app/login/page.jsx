'use client'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useLoginMutation } from '../slices/userSlices/userApiSlice'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { setCredentials } from '../slices/userSlices/authSlice'
import toast from 'react-hot-toast'

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();
  const dispatch = useDispatch()
  const [login, {isLoading}] = useLoginMutation();
 
  const {userInfo} = useSelector(state => state.auth)
  useEffect(() => {
    if (userInfo) {
      if (userInfo.isContributor) {
        router.push('/contributor-dashboard');
      } else if(userInfo.isAdmin) {
        router.push('/admin-dashboard');
      }else {
        router.push('/')
      }
    }
  }, [router, userInfo]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (res) {
        dispatch(setCredentials({...res}));
        toast.success('Login successful', {
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
        } else if(res.isAdmin) {
          router.push('/admin-dashboard');
        }else {
          router.push('/')
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Login failed', {
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        className: 'custom-toast-animation',
      });
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col pt-14" style={{ backgroundImage: `url('/vecteezy_blue-vector-grunge-background_107486.jpg')` }}>
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
                <div className="w-11/12 max-w-6xl min-h-screen relative rounded-lg overflow-hidden shadow-lg">
                    <img 
                        src="/BC.jpg" 
                        alt="Waterfall background" 
                        className="w-full h-full object-cover absolute inset-0 mt-20 h-[700px] rounded-lg md:mt-0 md:h-full md:rounded-none" 
                    />
                    <div className="relative flex items-center justify-center py-20">
                        <div className="w-full max-w-md bg-black bg-opacity-70 p-8 md:p-16 rounded-lg mx-auto min-h-[700px] flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4 text-white text-center">Login</h2>
              <p className="text-gray-300 mb-8 text-center">Sign in to your account</p>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="bg-white rounded-sm overflow-hidden flex items-center h-14">
                  <span className="text-gray-400 ml-4 mr-3">✉️</span>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-4 px-3 focus:outline-none text-lg"
                  />
                </div>
                <div className="bg-white rounded-sm overflow-hidden flex items-center h-14">
                  <span className="text-gray-400 ml-4 mr-3">🔑</span>
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-4 px-3 focus:outline-none text-lg"
                  />
                </div>
                <button type="submit" className="w-full bg-white text-black py-4 rounded-full font-semibold hover:bg-gray-200 transition duration-300 text-lg mt-8">
                  {isLoading? "Login...": "Login"}
                </button>
              </form>
              <div className="mt-8 flex justify-between text-sm text-gray-300">
                <Link href="#" className="hover:text-white">Forgot your password</Link>
                <Link href="/register" className="hover:text-white">Register Now</Link>
              </div>
              <div className="mt-8">
                <button className="w-full bg-white text-black py-4 rounded-full font-semibold flex items-center justify-center hover:bg-gray-200 transition duration-300 text-lg">
                  <span className="mr-2 text-green-500 font-bold">G</span>
                  Login with Google
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

export default Page;