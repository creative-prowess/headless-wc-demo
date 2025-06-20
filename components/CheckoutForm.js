// components/CheckoutForm.js
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/context/CartContext'

export default function CheckoutForm({ cartTotal, formData }) {
  const router      = useRouter()
  const { cartItems, clearCart } = useCart()
  const [card, setCard]       = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [email, setEmail]     = useState(formData.email || '')
  const inited = useRef(false)

  useEffect(() => {
    setEmail(formData.email || '')
  }, [formData.email])

  useEffect(() => {
    // run only once
    if (inited.current) return
    inited.current = true

    let cardInst = null
    async function init() {
      if (!window.Square) return

      const container = document.getElementById('card-container')
      // if we've already attached, skip
      if (container.querySelector('iframe')) return

      const appId      = process.env.NEXT_PUBLIC_SQUARE_APP_ID
      const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID
      if (!appId || !locationId) {
        setError('Payment configuration error')
        return
      }

      container.innerHTML = ''

      try {
        const payments = window.Square.payments(appId, locationId)
        cardInst       = await payments.card()
        await cardInst.attach('#card-container')
        setCard(cardInst)
      } catch (e) {
        console.error('Square init error', e)
        setError('Failed to load payment form')
      }
    }

    // try immediately, and also on SDK load
    init()
    window.addEventListener('square-sdk-loaded', init)

    return () => {
      window.removeEventListener('square-sdk-loaded', init)
      if (cardInst?.destroy) cardInst.destroy().catch(() => {})
    }
  }, [])

  const handlePayment = async () => {
    if (!card) return
    setLoading(true)
    setError(null)
    try {
      const tokenResult = await card.tokenize()
      if (tokenResult.status !== 'OK') {
        setError(tokenResult.errors?.[0]?.message || 'Tokenization failed')
        setLoading(false)
        return
      }
      const sqRes  = await fetch('/api/square-payments', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          token:      tokenResult.token,
          amount:     cartTotal,
          buyerEmail: email,
        }),
      })
      const sqData = await sqRes.json()
      if (!sqRes.ok || !sqData.success) {
        setError(sqData.error || 'Payment failed')
        setLoading(false)
        return
      }
      const txnId = sqData.transactionId
      if (!txnId) {
        setError('Could not retrieve transaction ID')
        setLoading(false)
        return
      }
      const orderRes  = await fetch('/api/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          cartItems,
          formData,
          paymentResult: sqData,
          transactionId: txnId,
        }),
      })
      const orderJson = await orderRes.json()
      if (!orderRes.ok || !orderJson.success) {
        setError(orderJson.error || 'Order creation failed')
        setLoading(false)
        return
      }
      await card.clear()
      setEmail('')
      clearCart()
      router.push(`/thank-you?txn=${txnId}`)
    } catch (err) {
      console.error('Checkout error:', err)
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full p-2 border rounded mb-4"
      />

      <div id="card-container" className="mb-4" />

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={!card || loading}
        className={`w-full p-2 rounded ${
          !card || loading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing…' : `Pay $${cartTotal.toFixed(2)}`}
      </button>
    </div>
  )
}
