'use client'
import Image from 'next/image'
import Link from 'next/link'
import MiniCart from './MiniCart'
import WishlistButton from './WishlistButton'
import AccountMenu from './AccountMenu'
import HeaderIcon from './HeaderIcon'
import { LuGitCompareArrows } from 'react-icons/lu'
import { useCompare } from '@/context/CompareContext'
import { useState, useRef, useEffect } from 'react'
import LoginModal from './LoginForm'
import { useToast } from '@/context/ToastContext'
import { signOut, useSession } from 'next-auth/react'

// Headless UI
import { Dialog, DialogPanel, Popover, PopoverGroup, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const CATEGORIES = [
  'Charging Port',
  'HDMI Port',
  'Laser Lens',
  'LCD',
  'Thumbstick',
  'USB Port',
]

export default function Header() {
  const { showToast } = useToast()
  const { data: session, status } = useSession()
  const { count } = useCompare()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  // State for Browse Categories
  const [catOpen, setCatOpen] = useState(false)
  const [catSearch, setCatSearch] = useState('')
  const catRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    function onClick(e) {
      if (catRef.current && !catRef.current.contains(e.target)) {
        setCatOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  const filteredCats = CATEGORIES.filter(c =>
    c.toLowerCase().includes(catSearch.toLowerCase())
  )

  return (
    <div>
      <header className="bg-white">
        {/* Top Utility Bar */}
        <div className="bg-brandblue text-white text-sm border-b-2 border-b-brandblue/50">
          <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:p-0 md:py-4">
            <div className="hidden sm:flex">
              📧{' '}
              <a href="mailto:contact@consolepartsdepot.com" className="hover:underline">
                contact@consolepartsdepot.com
              </a>
            </div>
            <div className="flex space-x-4">
              <Link href="/account" className="hover:underline">
                My Account
              </Link>
              {status === 'loading' ? null : session ? (
                <button
                  onClick={() => {
                    signOut()
                    showToast(
                      { name: 'You', customLink: { href: '/login', label: 'Log in again' } },
                      'have been logged out.'
                    )
                  }}
                >
                  Logout
                </button>
              ) : (
                <button onClick={() => setIsLoginOpen(true)}>Login</button>
              )}
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <nav aria-label="Global" className="bg-brandblue">
          <div className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-0">
            <div className="flex lg:flex-1">
              <Link href="/" className="flex items-center">
                <Image
                  src="/cpd-logo-transparent.webp"
                  alt="Console Parts Depot Logo"
                  width={320}
                  height={75}
                  className="object-contain h-auto"
                  priority
                />
              </Link>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="w-6 h-6" />
              </button>
            </div>
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              {/* ... your existing PopoverGroup items ... */}
            </PopoverGroup>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <div className="flex items-center gap-4">
                <HeaderIcon href="/compare" Icon={LuGitCompareArrows} count={count} label="Compare" />
                <WishlistButton />
                <MiniCart />
              </div>
            </div>
          </div>
        </nav>

        {/* Secondary Sticky Nav */}
        <div className="bg-gray-900 text-white sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-0">
            {/* Browse Categories */}
            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatOpen(o => !o)}
                className="bg-green-600 hover:bg-green-700 px-3 py-1 h-12 inline-flex items-center"
              >
                <span className="mr-5">Browse Categories</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

              </button>

              {catOpen && (
                <div className="absolute mt-1 bg-white text-gray-900 rounded shadow-lg w-56 max-h-64 overflow-hidden z-50">
                  <input
                    type="text"
                    value={catSearch}
                    onChange={e => setCatSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full px-3 py-2 border-b focus:outline-none"
                  />
                  <ul className="overflow-y-auto max-h-56">
                    {filteredCats.map(cat => (
                      <li key={cat}>
                        <Link href={`/part-category/${cat.toLowerCase().replace(/ /g, '-')}/`}>
                          <div className="block px-4 py-2 hover:bg-gray-100">{cat}</div>
                        </Link>
                      </li>
                    ))}
                    {filteredCats.length === 0 && (
                      <li className="px-4 py-2 text-sm text-gray-500">No results</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Main Links */}
            <nav className="space-x-6 hidden md:flex">
              <Link href="/">
               Home
              </Link>
              <Link href="/shop">
               Shop Catalog
              </Link>
              <Link href="/blog">
               Blog
              </Link>
              <Link href="/about-us">
              About
              </Link>
              <Link href="/contact-us">
                Contact
              </Link>
            </nav>

            {/* Welcome */}
            <div className="text-sm hidden md:block">
              Welcome, <strong>Dustin</strong>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dialog */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            {/* ... your existing mobile menu ... */}
          </DialogPanel>
        </Dialog>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  )
}
