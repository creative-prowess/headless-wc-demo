import { useWishlist } from '@/context/WishlistContext'
import Layout from '@/components/Layout'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlist.map((item) => (
            <div key={item.slug} className="border p-4 mb-3 rounded flex justify-between items-center">
              <div>
                <h2 className="font-medium">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.price}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  )
}
