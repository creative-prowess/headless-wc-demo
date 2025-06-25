import Link from 'next/link'
import Head from 'next/head'
import Header from '@/components/Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <meta name="theme-color" content="#f4f3e7" />
      </Head>
      <Header />
      <main className="flex-1 max-w-7xl mx-auto">{children}</main>
      <footer className="bg-gray-100 text-center text-sm text-gray-600 p-4">
        &copy; {new Date().getFullYear()} Granny’s{' '}
        <Link href="/shop">
          <div className="text-blue-600 hover:underline">Naturals</div>
        </Link>
      </footer>
    </div>
  )
}
