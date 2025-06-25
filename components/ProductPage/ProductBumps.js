// /components/ProductPage/ProductBumps.js
import Image from 'next/image'
import Link from 'next/link'

export default function ProductBumps({ bumps }) {
  return (
    <div className="mt-12">
      <h2 className="text-xl font-bold mb-4">You Might Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bumps.map((item) => (
          <div key={item.id} className="border p-4 rounded">
{item.image?.src && (
  <div className="relative w-32 h-32">
    <Image
      src={item.image.src}
      alt={item.image.altText || item.name || 'Suggested product'}
      layout="fill"
      objectFit="contain"
    />
  </div>
)}

            <div className="mt-2 font-semibold">{item.name}</div>
            <div className="text-sm text-gray-600">{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
