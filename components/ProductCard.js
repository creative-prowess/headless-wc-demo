import Link from 'next/link'
import WishlistToggle from './WishlistToggle'
import CompareToggle from './CompareToggle'
import QuickViewToggle from './QuickViewToggle'
import Image from 'next/image'

export default function ProductCard({ product, priority = false, onQuickView }) {
  return (
    <div className="relative border rounded-lg shadow transition-transform transform hover:scale-[1.02] group overflow-hidden">
      
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

      <Link href={`/products/${product.slug}`}>
        <div className="relative w-full h-64">
          <Image
            src={product.image?.sourceUrl || '/placeholder.webp'}
            alt={product.image?.altText || product.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={priority}
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-green-600 mt-1">{product.price}</p>
        </div>
      </Link>
    </div>
  )
}
