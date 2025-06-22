import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'

export default function MainNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="flex items-center justify-between w-full relative z-50">
        <Link href="/" className="flex items-center">
          <Image
            src="/grannynaturals-logo.webp"
            alt="Granny's Naturals Logo"
            width={150}
            height={150}
            className="object-contain w-20 sm:w-32 h-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 font-medium text-sm text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden text-gray-700 z-50"
        >
          {isMobileOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        w-[300px] max-w-full`}
      >
        <nav className="flex flex-col gap-4 p-6 font-medium text-sm text-gray-700">
          <Link href="/" onClick={() => setIsMobileOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setIsMobileOpen(false)}>Shop</Link>
        </nav>
      </div>
    </>
  )
}
