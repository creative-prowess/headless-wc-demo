// components/MainNav.js
import Link from 'next/link'

export default function MainNav() {
  return (
    <div className="flex items-center gap-10">
   <Link href="/" className="flex items-center">
  <img
    src="/grannynaturals-logo.png"
    alt="Granny's Naturals Logo"
    className="w-[150px] object-contain"
  />
</Link>
      <nav className="hidden lg:flex gap-6 font-medium text-sm text-gray-700">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="#">Men</Link>
        <Link href="#">Women</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Contact</Link>
      </nav>
    </div>
  )
}