import Layout from '@/components/Layout'
import Head from 'next/head'
import { useContext, useState } from 'react'
import { CartContext } from '@/context/CartContext'

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useContext(CartContext)

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: submit order logic
    console.log('Order submitted:', formData, cartItems)
  }

  return (
    <Layout>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Complete your purchase" />
      </Head>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-2">
          {/* Left: Customer Info */}
          <div className="space-y-4">
            <input className="w-full border p-3 rounded" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            <input className="w-full border p-3 rounded" name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
            <input className="w-full border p-3 rounded" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            <input className="w-full border p-3 rounded" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input className="w-full border p-3 rounded" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
            <input className="w-full border p-3 rounded" name="zip" placeholder="ZIP" value={formData.zip} onChange={handleChange} required />
          </div>

          {/* Right: Order Summary */}
          <div className="border p-6 rounded">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-2 mb-4">
{cartItems.map((item) => (
  <li key={item.id} className="flex justify-between text-sm">
    <span>{item.name} x {item.quantity}</span>
    <span>
      {typeof item.price === 'number'
        ? `$${(item.price * item.quantity).toFixed(2)}`
        : 'Price missing'}
    </span>
  </li>
))}
              </ul>
            )}

            <div className="border-t pt-4">
              <p className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>$0.00</span> {/* Could be dynamic later */}
              </p>
              <p className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </p>
            </div>

            <button type="submit" className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
