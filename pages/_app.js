import '../styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import client from '../lib/apolloClient'
import { CartProvider } from '../context/CartContext'
import { ToastProvider } from '../context/ToastContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { CompareProvider } from '@/context/CompareContext'
export default function App({ Component, pageProps }) {
  return (
<ApolloProvider client={client}>
  <CartProvider>
    <WishlistProvider>
      <CompareProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </CompareProvider>
    </WishlistProvider>
  </CartProvider>
</ApolloProvider>
  )
}
