// components/WishlistButton.js
import Link from 'next/link'
import { FaHeart } from 'react-icons/fa'
import { useWishlist } from '@/context/WishlistContext'

export default function WishlistButton() {
  const { wishlist } = useWishlist()
  const count = wishlist.length

  return (
    <Link href="/wishlist" className="relative text-gray-600 hover:text-blue-600">
      <FaHeart className="text-xl" aria-hidden="true" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 text-xs bg-orange-500 text-white rounded-full px-1.5 py-0.5">
          {count}
        </span>
      )}
      <span className="sr-only">Wishlist</span>
    </Link>
  )
}