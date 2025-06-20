// pages/checkout.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Layout from '@/components/Layout'
import { useCart } from '@/context/CartContext'
import CheckoutForm from '@/components/CheckoutForm'

export default function CheckoutPage() {
  const { cartItems, cartTotal } = useCart()
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
  })

  // Populate the form from URL query parameters
  useEffect(() => {
    if (!router.isReady) return
    const {
      fullName = '',
      email    = '',
      address  = '',
      city     = '',
      state    = '',
    } = router.query

    setFormData({
      fullName: Array.isArray(fullName) ? fullName[0] : fullName,
      email:    Array.isArray(email)    ? email[0]    : email,
      address:  Array.isArray(address)  ? address[0]  : address,
      city:     Array.isArray(city)     ? city[0]     : city,
      state:    Array.isArray(state)    ? state[0]    : state,
    })
  }, [router.isReady, router.query])

  useEffect(() => {
    console.log('cartItems:', cartItems, 'cartTotal:', cartTotal)
  }, [cartItems, cartTotal])

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Layout>
      <Script
        src="https://sandbox.web.squarecdn.com/v1/square.js"
        strategy="afterInteractive"
        onLoad={() =>
          window.dispatchEvent(new Event('square-sdk-loaded'))
        }
      />

      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl mb-4">Checkout</h1>
        <form>
          <label className="block mb-2">
            Full Name
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border mt-1"
            />
          </label>
          <label className="block mb-2">
            Email
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border mt-1"
            />
          </label>
          <label className="block mb-2">
            Address
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border mt-1"
            />
          </label>
          <label className="block mb-2">
            City
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border mt-1"
            />
          </label>
          <label className="block mb-4">
            State
            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border mt-1"
            />
          </label>

          <p className="text-lg font-semibold mb-4">
            Total: ${(cartTotal ?? 0).toFixed(2)}
          </p>

          <CheckoutForm cartTotal={cartTotal ?? 0} formData={formData} />
        </form>
      </div>
    </Layout>
  )
}
