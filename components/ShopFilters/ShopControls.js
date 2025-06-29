import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'


export default function ShopControls() {
  const router = useRouter()

  const [filters, setFilters] = useState({ 
    product_brand: '',
    system: '',
    product_cat: '',
    price: '',
    sort: '',
    search: '',
  })

  // Sync filters from URL on load
  useEffect(() => {
    const [ product_brand,system,product_cat,] = router.query.filters || []
    setFilters({  
      product_brand: product_brand || '',
      system: system || '', 
      product_cat: product_cat || '',
      price: router.query.price || '',
      sort: router.query.sort || '',
      search: router.query.search || '',
    })
  }, [router.query])

const buildPathFromFilters = (f) => {
  const pathParts = ['/shop']

  if (f.product_brand) pathParts.push('brand', f.product_brand)
  if (f.system) pathParts.push('system', f.system)
  if (f.product_cat) pathParts.push('part-category', f.product_cat)

  return pathParts.join('/')
}
  const updateFilters = (key, value) => {
    const updated = { ...filters, [key]: value }
    setFilters(updated)

    const path = buildPathFromFilters(updated)
    const query = {}

    if (updated.search) query.search = updated.search
    if (updated.price) query.price = updated.price
    if (updated.sort) query.sort = updated.sort

    router.push({ pathname: path, query })
  }

  const clearAll = () => router.push('/shop')

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search products..."
        value={filters.search}
        onChange={(e) => updateFilters('search', e.target.value)}
        className="w-full border rounded p-2"
      />

      <select
        value={filters.sort}
        onChange={(e) => updateFilters('sort', e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
      </select>

      <select
        value={filters.price}
        onChange={(e) => updateFilters('price', e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="">All Prices</option>
        <option value="0-50">$0–$50</option>
        <option value="50-150">$50–$150</option>
        <option value="150-300">$150–$300</option>
      </select>



     

      <button
        onClick={clearAll}
        className="w-full text-sm text-red-600 underline"
      >
        Clear All Filters
      </button>
    </div>
  )
}
