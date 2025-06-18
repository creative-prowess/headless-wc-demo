import Link from 'next/link'
import { useState } from 'react'
import WishlistToggle from './WishlistToggle'
import CompareToggle from './CompareToggle'
import QuickViewToggle from './QuickViewToggle'
import QuickViewModal from './QuickView/QuickViewModal'
import { fetchProductBySlug } from '@/utils/fetchProductBySlug'
export default function ProductCard({ product }) {

  const handleQuickView = async () => {
    const fullProduct = await fetchProductBySlug(product.slug)
    setQuickViewProduct(fullProduct)
    setShowQuickView(true)
  }
    const [showQuickView, setShowQuickView] = useState(false)
     const [quickViewProduct, setQuickViewProduct] = useState(null)
  return (
<div className="relative border rounded-lg shadow hover:shadow-lg transition group overflow-hidden">
  {/* Wishlist Button - Top Right */}
<div className="absolute top-2 right-2 z-10 space-y-2 opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition">
    <div className="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center">
      <WishlistToggle product={product} />
  
    </div>
    <div className="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center">
      <CompareToggle product={product} />
  
    </div>
        <div className="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center">
          <QuickViewToggle onClick={handleQuickView} />
        </div>
    
  </div>
  {showQuickView && quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
        />
      )}

      <Link href={`/products/${product.slug}`}>
        <img
          src={product.image?.sourceUrl}
          alt={product.image?.altText || product.name}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-green-600 mt-1">{product.price}</p>
        </div>
      </Link>
    </div>
  )
}
