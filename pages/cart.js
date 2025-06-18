import Layout from '@/components/Layout'
import CartItem from '@/components/CartItem'
import CartSummary from '@/components/CartSummary'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart()

  const subtotal = cartItems.reduce((acc, item) => {
    const price = typeof item.price === 'string'
      ? parseFloat(item.price.replace(/[^0-9.-]+/g, ''))
      : Number(item.price) || 0
    return acc + price * item.quantity
  }, 0)

  const shippingEstimate = 5.0
  const taxEstimate = parseFloat((subtotal * 0.084).toFixed(2))
  const orderTotal = subtotal + shippingEstimate + taxEstimate

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6 lg:flex gap-8">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty 🛒</p>
          ) : (
            cartItems.map((item) => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} />
            ))
          )}
        </div>

        <CartSummary
          subtotal={subtotal}
          shipping={shippingEstimate}
          tax={taxEstimate}
          total={orderTotal}
        />
      </div>
    </Layout>
  )
}
