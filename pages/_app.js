import '../styles/globals.css'
import "keen-slider/keen-slider.min.css"
import { ApolloProvider } from '@apollo/client'
import client from '../lib/apolloClient'
import { useEffect } from 'react'
import { CartProvider } from '../context/CartContext'
import { ToastProvider } from '../context/ToastContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { CompareProvider } from '@/context/CompareContext'
import { CookieConsentProvider } from '@/context/CookieConsentContext'
import CookieConsentBanner from '@/components/CookieConsentBanner'
import CookieSettingsModal from '@/components/CookieSettingsModal'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
useEffect(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, [])
  return (
<ApolloProvider client={client}>
    
   <CookieConsentProvider>  <SessionProvider session={session}>
  <CartProvider>
    <WishlistProvider>
      <CompareProvider>
        <ToastProvider>
          <Component {...pageProps} />
          <CookieConsentBanner />
      <CookieSettingsModal />
        </ToastProvider>
      </CompareProvider>
    </WishlistProvider>
  </CartProvider>
   </SessionProvider> 
   </CookieConsentProvider>

</ApolloProvider>
  )
}
