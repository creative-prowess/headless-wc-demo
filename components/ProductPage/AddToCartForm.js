import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

export default function AddToCartForm({ product }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = (e) => {
    e.preventDefault()

    const item = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price.replace(/[^0-9.]/g, '')),
      quantity: quantity,
      image: product.image?.sourceUrl || '/fallback.jpg', // ←✅ set this correctly
      stockStatus: product.stockStatus,
    }

    addToCart(item)
    showToast(item)
  }

  return (
    <form onSubmit={handleAddToCart} className="mt-4">
      <div className="flex items-center gap-4">
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="ml-2 w-16 border border-gray-300 rounded px-2 py-1"
            min="1"
          />
        </label>
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </form>
  )
}
