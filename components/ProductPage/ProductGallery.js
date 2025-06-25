import Image from 'next/image'
import { useState } from 'react'

export default function ProductGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) return null

  const selectedImage = images[selectedIndex]

  return (
    <div className="w-full">
      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-gray-200 shadow-card relative">
{selectedImage?.src ? (
    <Image
      src={selectedImage.src}
      alt={selectedImage.alt || 'Product image'}
      fill
      className="object-contain"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  ) : null}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={index}
              className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-300 ${
                selectedIndex === index
                  ? 'border-brand ring-2 ring-brand'
                  : 'border-gray-200 hover:border-brand'
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              {img?.src && (
                <Image
                  src={img.src}
                  alt={img.alt || ''}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
