// components/LoginForm.js
import { signIn, signOut, useSession } from 'next-auth/react'
import { useToast } from '@/context/ToastContext'
import { useEffect } from 'react'

export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null
  const { data: session, status } = useSession()
  const { showToast } = useToast()

  // Show toast when login is successful
  useEffect(() => {
    if (status === 'authenticated') {
      showToast('Successfully logged in', 'success')
      onClose() // Close modal
    }
  }, [status])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row">
          {/* Left image section */}
          <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80')" }}></div>

          {/* Right form section */}
          <div className="w-full p-8 lg:w-1/2 relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-black text-xl">&times;</button>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>

<a
  onClick={() => signIn('google')}
  className="cursor-pointer flex items-center justify-center mt-4 bg-white text-black border rounded-lg shadow-md hover:bg-gray-100 transition"
>
  <div className="px-4 py-3">
    <svg className="h-6 w-6" viewBox="0 0 40 40">{/* Google SVG */}</svg>
  </div>
  <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
</a>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4"></span>
              <span className="text-xs text-center text-gray-500 uppercase">or login with email</span>
              <span className="border-b w-1/5 lg:w-1/4"></span>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:outline-none focus:shadow-outline" type="email" />
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <a href="#" className="text-xs text-gray-500">Forget Password?</a>
              </div>
              <input className="bg-gray-200 text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:outline-none focus:shadow-outline" type="password" />
            </div>

            <div className="mt-8">
              <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <a href="#" className="text-xs text-gray-500 uppercase">or sign up</a>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
