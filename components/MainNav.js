import { useState } from 'react'
import Link from 'next/link'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'

export default function MainNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center">
        <img
          src="/grannynaturals-logo.webp"
          alt="Granny's Naturals Logo"
          className="w-[150px] object-contain"
          width="150"
          height="150"
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex gap-6 font-medium text-sm text-gray-700">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/men">Men</Link>
        <Link href="/women">Women</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden text-gray-700"
      >
        {isMobileOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white border-t shadow-md lg:hidden z-50">
          <nav className="flex flex-col items-start gap-4 p-4 font-medium text-sm text-gray-700">
            <Link href="/" onClick={() => setIsMobileOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setIsMobileOpen(false)}>Shop</Link>
            <Link href="/men" onClick={() => setIsMobileOpen(false)}>Men</Link>
            <Link href="/women" onClick={() => setIsMobileOpen(false)}>Women</Link>
            <Link href="/blog" onClick={() => setIsMobileOpen(false)}>Blog</Link>
            <Link href="/contact" onClick={() => setIsMobileOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </div>
  )
}