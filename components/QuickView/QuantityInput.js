import { useState, useEffect } from 'react'

export default function QuantityInput({ initial = 1, min = 1, max = 99, onChange }) {
  const [quantity, setQuantity] = useState(initial)

  useEffect(() => {
    onChange?.(quantity)
  }, [quantity])

  const clamp = (value) => Math.min(max, Math.max(min, value))

  const decrease = () => {
    setQuantity((prev) => clamp(prev - 1))
  }

  const increase = () => {
    setQuantity((prev) => clamp(prev + 1))
  }

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10)
    if (!isNaN(val)) {
      setQuantity(clamp(val))
    } else {
      setQuantity(min)
    }
  }

  return (
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-fit">
      <button
        type="button"
        onClick={decrease}
        className="w-10 h-10 text-lg font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
        aria-label="Decrease quantity"
      >
        –
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleChange}
        className="w-12 text-center border-x border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 h-10"
      />
      <button
        type="button"
        onClick={increase}
        className="w-10 h-10 text-lg font-medium text-gray-700 hover:bg-gray-100 focus:outline-none"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
