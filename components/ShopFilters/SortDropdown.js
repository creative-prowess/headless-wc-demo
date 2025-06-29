'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const options = [
  { label: 'Newest', value: 'date-desc' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A–Z', value: 'name-asc' },
  { label: 'Name: Z–A', value: 'name-desc' },
]

export default function SortDropdown() {
  const pathname = usePathname()
  const router = useRouter()
  const [selected, setSelected] = useState('date-desc')

  useEffect(() => {
    if (!pathname) return
    const segments = pathname.split('/').filter(Boolean)
    const sortIndex = segments.findIndex(seg => seg === 'sort')
    if (sortIndex !== -1 && segments[sortIndex + 1]) {
      setSelected(segments[sortIndex + 1])
    }
  }, [pathname])

  const handleChange = e => {
    const value = e.target.value
    setSelected(value)

    // Modify path
    let segments = pathname.split('/').filter(Boolean)
    const sortIndex = segments.findIndex(seg => seg === 'sort')

    if (sortIndex !== -1) {
      segments[sortIndex + 1] = value
    } else {
      segments.push('sort', value)
    }

    const newPath = '/' + segments.join('/')
    router.push(newPath)
  }

  return (
    <div className="mb-6">
      <label htmlFor="sort-select" className="mr-2 text-sm font-medium">Sort by:</label>
      <select
        id="sort-select"
        value={selected}
        onChange={handleChange}
        className="border px-3 py-2 rounded-md"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
