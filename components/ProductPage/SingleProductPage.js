import Image from 'next/image'
import { useState } from 'react'
import ProductTabs from './ProductTabs'
import ProductCard from '../ProductCard'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

export default function SingleProductPage({ product }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [quantity, setQuantity] = useState(1)

  const rating = parseFloat(product.rating) || 0
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

  const priceNum = parseFloat(product.price?.replace(/[^0-9.]/g, '')) || 0
  const inStock = product.stockStatus?.toLowerCase().includes('stock')

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (!inStock) return

    const item = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: priceNum,
      quantity,
      image: product.image?.sourceUrl || '',
    }
    addToCart(item)
    showToast(item)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Gallery */}
        <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          <Image
            src={product.image?.sourceUrl || '/placeholder.png'}
            alt={product.image?.altText || product.name}
            width={600}
            height={600}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>

          <div className="flex items-center space-x-2">
            {Array.from({ length: fullStars }).map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            {halfStar && <span className="text-yellow-400 text-lg">☆</span>}
            {Array.from({ length: emptyStars }).map((_, i) => <span key={i} className="text-gray-300 text-lg">☆</span>)}
            <span className="text-sm text-gray-600 ml-2">({rating.toFixed(1)})</span>
          </div>

          <p className="text-2xl font-bold text-green-700">${priceNum.toFixed(2)}</p>
          <p className="text-sm text-gray-600">{inStock ? 'In Stock' : 'Out of Stock'}</p>

          <form onSubmit={handleAddToCart} className="flex items-center gap-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button
              type="submit"
              disabled={!inStock}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-semibold"
            >
              Add to Cart
            </button>
          </form>

          <div className="text-sm text-gray-600 mt-4 space-y-1">
            <p>✓ 30-day Money-back Guarantee</p>
            <p>✓ Free Shipping over $50</p>
            <p>✓ Secure Checkout</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <ProductTabs
          description={product.description}
          specs={product.specs}
          reviews={product.reviews}
        />
      </div>

      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-6">You Might Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.related?.map((relatedProd) => (
            <ProductCard key={relatedProd.id} product={relatedProd} />
          ))}
        </div>
      </div>
    </div>
  )
}
