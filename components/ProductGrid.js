import { useState } from 'react'
import ProductCard from './ProductCard'
import QuickViewModal from './QuickView/QuickViewModal'

export default function ProductGrid({ products = [], loading = false }) {
  const [modalSlug, setModalSlug] = useState(null)

  const handleQuickView = (slug) => {
    setModalSlug(slug)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 animate-pulse space-y-4"
          >
            <div className="w-full h-40 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products found.
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 p-4 md:p-0">
       {products.map((p, i) => (
  <ProductCard
            key={p.slug}
            product={p}
            priority={i < 5} // Pass priority directly based on index
            onQuickView={() => handleQuickView(p.slug)}
          />
        ))}
      </div>

{modalSlug && (
       <QuickViewModal
          slug={modalSlug}
          isOpen
          onClose={() => setModalSlug(null)}
        />
)}
    </>
  )
}