'use client'

import { useRef, useLayoutEffect } from 'react'
import Header from './Header'    // adjust path as needed

export default function Layout({ children }) {
  const mainRef = useRef(null)
  return (
    <div className="min-h-screen flex flex-col">
      {/* Your fixed Header */}
      <Header />
      {/* 
        mainRef gets the dynamic padding-top so content
        never sits underneath the fixed header 
      */}
      <main ref={mainRef} className="flex-1 w-full mx-auto mb-12">
        {children}
      </main>

      <footer className="bg-gray-100 text-center text-sm text-gray-600 p-4">
        &copy; {new Date().getFullYear()} Console Parts Depot
      </footer>
    </div>
  )
}
