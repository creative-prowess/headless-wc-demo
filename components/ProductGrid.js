// components/ProductGrid.js
import ProductCard from './ProductCard'

export default function ProductGrid({ products = [], loading = false }) {
  // 1️⃣ show skeletons while loading
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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

  // 2️⃣ once loaded, if still empty, show “no products”
  if (!products.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products found.
      </div>
    )
  }

  // 3️⃣ otherwise render normally
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product, index) => (
          <ProductCard
    key={product.slug}
    product={product}
    priority={index < 5}
  />
      ))}
    </div>
  )
}
