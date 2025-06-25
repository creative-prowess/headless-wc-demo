// components/Header.js
import { useState, useEffect, useRef } from 'react'
import MainNav from './MainNav'
import SearchBar from './SearchBar'
import MiniCart from './MiniCart'
import WishlistButton from './WishlistButton'
import AccountMenu from './AccountMenu'
import { LuGitCompareArrows } from "react-icons/lu"
import { useCompare } from '@/context/CompareContext'
import HeaderIcon from './HeaderIcon'

export default function Header() {
  const { count } = useCompare()
  const headerRef = useRef(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const headerEl = headerRef.current
    if (!headerEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // when topbar scrolls out of view, isStuck = true
        setIsStuck(!entry.isIntersecting)
      },
      { root: null, threshold: 0, rootMargin: `-${headerEl.offsetHeight}px 0px 0px 0px` }
    )

    // observe the header’s very top
    observer.observe(headerEl)
    return () => observer.disconnect()
  }, [])

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 bg-white border-b shadow-sm"
    >
      {/* Topbar */}
      <div className="bg-gray-100 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div>
            <span className="mr-4">📧 support@grannysnaturals.com</span>
            <span>+1 234 567 8900</span>
          </div>
          {/* Slide‐up the AccountMenu when stuck */}
          <AccountMenu className={isStuck ? 'translate-y-0' : 'translate-y-full'} />
        </div>
      </div>

      {/* Middle */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <MainNav />
        <SearchBar />
        <div className="flex items-center gap-4">
          <HeaderIcon href="/compare" Icon={LuGitCompareArrows} count={count} label="Compare" />
          <WishlistButton />
          <MiniCart />
        </div>
      </div>
    </header>
  )
}
