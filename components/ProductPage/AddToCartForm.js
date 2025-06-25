// /components/ProductPage/AddToCartForm.js
import { useState } from 'react'

export default function AddToCartForm({ product }) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    // Replace with cart logic
    console.log(`Add ${quantity} of ${product.name}`)
  }

  return (
    <form className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-28">
        <button
          type="button"
          className="w-10 h-10 text-xl font-bold text-gray-600 hover:text-black"
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
        >
          –
        </button>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full h-10 text-center border-l border-r border-gray-200 focus:outline-none"
        />
        <button
          type="button"
          className="w-10 h-10 text-xl font-bold text-gray-600 hover:text-black"
          onClick={() => setQuantity(q => q + 1)}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="px-6 py-3 bg-brand text-white font-medium rounded-xl hover:bg-accent transition-all shadow-md"
      >
        Add to Cart
      </button>
    </form>
  )
}
