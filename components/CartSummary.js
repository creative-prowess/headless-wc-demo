import React from 'react'

export default function CartSummary({ subtotal, shipping, tax, total }) {
  return (
    <div className="w-full max-w-sm bg-white border rounded-lg shadow p-6 space-y-4">
      <h2 className="text-lg font-bold">Order summary</h2>
      <div className="flex justify-between text-sm text-gray-700">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-700">
        <span>Shipping estimate</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-700">
        <span>Tax estimate</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-base font-semibold border-t pt-4">
        <span>Order total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold">
        Checkout
      </button>
    </div>
  )
}
