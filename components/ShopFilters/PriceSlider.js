'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PriceSlider({ minPrice = 0, maxPrice = 500 }) {
  const router = useRouter()
  const pathname = usePathname()

  const [min, setMin] = useState(minPrice)
  const [max, setMax] = useState(maxPrice)

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)
    const priceIndex = segments.findIndex(seg => seg === 'price')
    if (priceIndex !== -1 && segments[priceIndex + 1]) {
      const [minVal, maxVal] = segments[priceIndex + 1].split('-').map(Number)
      if (!isNaN(minVal)) setMin(minVal)
      if (!isNaN(maxVal)) setMax(maxVal)
    }
  }, [pathname])

  const applyPriceFilter = () => {
    let segments = pathname.split('/').filter(Boolean)
    const priceIndex = segments.findIndex(seg => seg === 'price')
    const range = `${min}-${max}`

    if (priceIndex !== -1) {
      segments[priceIndex + 1] = range
    } else {
      segments.push('price', range)
    }

    router.push('/' + segments.join('/'))
  }

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">Price Range</h3>
      <div className="flex items-center gap-3">
        <input
          type="number"
          className="w-24 px-2 py-1 border rounded"
          min={minPrice}
          max={maxPrice}
          value={min}
          onChange={e => setMin(Number(e.target.value))}
        />
        <span>–</span>
        <input
          type="number"
          className="w-24 px-2 py-1 border rounded"
          min={minPrice}
          max={maxPrice}
          value={max}
          onChange={e => setMax(Number(e.target.value))}
        />
        <button
          onClick={applyPriceFilter}
          className="ml-4 px-3 py-2 text-sm bg-black text-white rounded"
        >
          Apply
        </button>
      </div>
    </div>
  )
}
