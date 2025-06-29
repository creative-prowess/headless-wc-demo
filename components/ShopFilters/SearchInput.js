'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchInput() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)
    const searchIndex = segments.findIndex(seg => seg === 'search')
    if (searchIndex !== -1 && segments[searchIndex + 1]) {
      setSearchTerm(decodeURIComponent(segments[searchIndex + 1]))
    }
  }, [pathname])

  const handleSubmit = e => {
    e.preventDefault()
    if (!searchTerm) return

    let segments = pathname.split('/').filter(Boolean)
    const searchIndex = segments.findIndex(seg => seg === 'search')

    if (searchIndex !== -1) {
      segments[searchIndex + 1] = encodeURIComponent(searchTerm)
    } else {
      segments.push('search', encodeURIComponent(searchTerm))
    }

    const newPath = '/' + segments.join('/')
    router.push(newPath)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full px-3 py-2 border rounded-md"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-md"
      >
        Search
      </button>
    </form>
  )
}
