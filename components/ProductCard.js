import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import WishlistToggle from './WishlistToggle'
import CompareToggle from './CompareToggle'
import QuickViewToggle from './QuickViewToggle'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'


export default function ProductCard({ product, onQuickView, priority = false, onDelete }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const categories = product.categories?.nodes
    ? product.categories.nodes.map(c => c.name)
    : Array.isArray(product.categories)
    ? product.categories
    : []

  const variations = product.variations?.nodes || []
  const attrMap = {}
  variations.forEach(v =>
    v.attributes.nodes.forEach(a => {
      attrMap[a.name] = attrMap[a.name] || new Set()
      attrMap[a.name].add(a.value)
    })
  )
  Object.keys(attrMap).forEach(k => { attrMap[k] = Array.from(attrMap[k]) })

  const [selAttrs, setSelAttrs] = useState({})
  const [selVar, setSelVar] = useState(null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (variations.length && !Object.keys(selAttrs).length) {
      const init = {}
      variations[0].attributes.nodes.forEach(a => init[a.name] = a.value)
      setSelAttrs(init)
    }
  }, [variations])

  useEffect(() => {
    const match = variations.find(v =>
      v.attributes.nodes.every(a => selAttrs[a.name] === a.value)
    )
    setSelVar(match || null)
  }, [selAttrs, variations])

  const rawPrice = selVar?.price ?? product.price ?? '0'
  const priceNum = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0
  const rawStock = (selVar?.stockStatus ?? product.stockStatus ?? '').toLowerCase()
  const inStock = rawStock === 'instock' || rawStock === 'in_stock'
  const canBuy = priceNum > 0 && inStock
  const salePrice = product.salePrice ?? null

  // Prepare star counts
  const rating = parseFloat(product.rating) || 0
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

  const handleAdd = e => {
    e.preventDefault()
    if (!canBuy) return
    setLoading(true)
    const source = selVar || product
    const item = {
      id: source.id,
      name: source.name,
      slug: product.slug,
      price: priceNum,
      quantity: qty,
      image: source.image?.sourceUrl || product.image?.sourceUrl || ''
    }
    addToCart(item)
    showToast(item)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="relative group bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {salePrice && (
        <div className="absolute top-2 right-2 bg-red-400 text-white text-xs font-semibold uppercase px-2 py-1 rounded">
          Sale
        </div>
      )}

      <div className="relative">
        <Link href={`/products/${product.slug}`} className="block w-full h-auto bg-gray-100">
          <Image
            src={product.image?.sourceUrl || 'https://consolepartsdepot.com/wp-content/uploads/woocommerce-placeholder.png'}
            alt={product.image?.altText || product.name}
            width={230} height={230}
            className="object-cover w-full h-auto"
            priority={priority}
          />
        </Link>

   
      </div>

      <div className="p-4">
        <p className="text-xs text-gray-500 mb-1">{categories.join(', ')}</p>
    
        <Link href={`/products/${product.slug}`} className="text-base font-medium text-gray-900 hover:text-green-600 mb-2 line-clamp-2">
         {product.name}
        </Link>

        <div className="flex items-center mb-2">
          {Array.from({ length: fullStars }).map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
          {halfStar && <span className="text-yellow-400">☆</span>}
          {Array.from({ length: emptyStars }).map((_, i) => (
            <span key={i} className="text-gray-300">☆</span>
          ))}
          <span className="text-sm text-gray-500 ml-2">({rating.toFixed(1)})</span>
        </div>

        <div className="flex items-baseline space-x-2">
          {salePrice ? (
            <>
              <span className="text-lg font-bold text-green-600">
                ${priceNum.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${parseFloat(product.price).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${priceNum.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center space-x-3">
          {canBuy ? (
            <button
              onClick={handleAdd}
              disabled={loading}
              className={`flex-1 py-2 text-white font-semibold rounded bg-orange-600 hover:bg-orange-700`}
            >
              {loading ? 'Adding…' : 'Add to Cart'}
            </button>
          ) : (
            <Link href={`/products/${product.slug}`} className="flex-1">
              <button className="w-full py-2 bg-brand hover:bg-blue-700 text-white font-semibold rounded">
                View Product
              </button>
            </Link>
          )}
        </div>
      </div>
           {/* Wishlist, Compare, Quick View Buttons */}
        <div className="absolute top-2 right-2 z-10 space-y-2 opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition">
          <div className="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center">
            <WishlistToggle product={product} />
          </div>
          <div className="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center">
            <CompareToggle product={product} />
          </div>
          <div className="w-10 h-10 bg-white border border-gray-300 rounded-md flex items-center justify-center">
            <QuickViewToggle onClick={onQuickView} />
          </div>
        </div>
    </div>
  )
}