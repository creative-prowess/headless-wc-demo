// components/MainNav.js
import Link from 'next/link'

export default function MainNav() {
  return (
    <div className="flex items-center gap-10">
   <Link href="/" className="flex items-center">
  <img
    src="/grannynaturals-logo.webp"
    alt="Granny's Naturals Logo"
    className="w-[150px] object-contain"
    width="150"
    height="150"
  />
</Link>
      <nav className="hidden lg:flex gap-6 font-medium text-sm text-gray-700">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/men">Men</Link>
        <Link href="/women">Women</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  )
}