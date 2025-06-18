import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

export default function WishlistToggle({ product }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const { showToast } = useToast()

  const handleClick = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      showToast(
        {
          name: product.name,
          image: product.image,
          type: 'wishlist'
        },
        `${product.name} has been removed from your wishlist.`
      )
    } else {
      addToWishlist(product)
      showToast(
        {
          name: product.name,
          image: product.image,
          type: 'wishlist'
        },
        `${product.name} has been added to your wishlist.`
      )
    }
  }

  return (
    <button onClick={handleClick} aria-label="Toggle wishlist">
      {isInWishlist(product.id) ? (
        <FaHeart className="text-red-500" />
      ) : (
        <FaRegHeart className="text-gray-400 hover:text-red-500" />
      )}
    </button>
  )
}
