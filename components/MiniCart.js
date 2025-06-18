// components/MiniCart.js
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/context/CartContext'

export default function MiniCart() {
  const { cartItems } = useCart()
  const count = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <Link href="/cart" className="relative group text-gray-600 hover:text-blue-600">
      <FaShoppingCart className="text-xl" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full px-1.5 py-0.5">
          {count}
        </span>
      )}
      <span className="sr-only">Cart</span>
    </Link>
  )
}
