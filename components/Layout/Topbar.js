// components/Layout/Topbar.js
import { FaMoon, FaBell, FaCog, FaSignOutAlt, FaUser } from 'react-icons/fa'

export default function Topbar() {
  return (
    <header className="w-full bg-white border-b px-4 md:px-8 py-4 flex items-center justify-between">
      <h1 className="text-lg md:text-xl font-bold text-gray-800">
        Prowess Creative Solutions
      </h1>

      <div className="flex items-center gap-5 text-gray-500 text-lg">
        <button title="Sign Out" className="hover:text-gray-800">
          <FaUser />
        </button>
        <button title="Toggle Dark Mode" className="hover:text-gray-800">
          <FaMoon />
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
