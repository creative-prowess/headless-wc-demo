// components/AccountMenu.js
import Link from 'next/link'

export default function AccountMenu() {
  return (
    <div className="hidden md:flex flex-1 space-x-4">
      <Link href="/account" className="hover:underline">My Account</Link>
      <Link href="/checkout" className="hover:underline">Checkout</Link>
      <Link href="/login" className="hover:underline">Login/Register</Link>
      <span className="ml-2">🌐 English | USD</span>
    </div>
  )
}
