import Link from 'next/link'
import Header from '@/components/Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
<Header />
      <main className="flex-1 max-w-7xl mx-auto py-10">{children}</main>

<footer className="bg-gray-100 text-center text-sm text-gray-600 p-4">
  &copy; {new Date().getFullYear()} Granny’s{' '}
  <Link href="/shop">
    <div className="text-blue-600 hover:underline">Naturals</div>
  </Link>
</footer>
    </div>
  )
}