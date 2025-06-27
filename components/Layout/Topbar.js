// components/Layout/Topbar.js
import { FaMoon, FaBell, FaCog, FaUser } from 'react-icons/fa'
import { signOut, useSession } from 'next-auth/react'
import { useToast } from '@/context/ToastContext'

export default function Topbar() {
  const { data: session, status } = useSession()
  const { showToast } = useToast()

  return (
    <header className="w-full bg-white dark:bg-brand border-b-bg-darker px-4 md:px-8 py-4 flex items-center justify-between">
      <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
        Prowess Creative Solutions
      </h1>

      <div className="flex items-center gap-5 text-gray-500 text-lg">

        {status === 'loading' ? null : session && (
          <button
            title="Logout"
            onClick={() => {
              signOut()
              showToast(
                { name: 'You', customLink: { href: '/login', label: 'Log in again' } },
                'have been logged out.'
              )
            }}
            className="hover:text-gray-800"
          >
            <FaUser />
          </button>
        )}
<button
  onClick={() => {
    const root = document.documentElement
    const isDark = root.classList.toggle('dark')

    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }}
  className="h-12 w-12 rounded-lg p-2 flex justify-center align-middle items-center"
>
 <FaMoon className="dark:hidden"/>
  <svg
    className="fill-yellow-500 hidden dark:block"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
    />
  </svg>
</button>
        <button title="Notifications" className="hover:text-gray-800">
          <FaBell />
        </button>
        <button title="Settings" className="hover:text-gray-800">
          <FaCog />
        </button>
      </div>
    </header>
  )
}
