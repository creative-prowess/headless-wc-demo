// /components/ProductPage/RelatedProducts.js
import Image from 'next/image'
import Link from 'next/link'

export default function RelatedProducts({ related }) {
  if (!related || related.length === 0) return null

  return (
    <section className="mt-20">
      <h3 className="text-xl font-semibold mb-6">You Might Also Like</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {related.map(product => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="group block rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="aspect-square bg-white relative">
              <Image
                src={product.image.src}
                alt={product.image.alt || product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-3">
              <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h4>
              <div className="text-brand text-sm font-semibold mt-1">
                {product.price}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
