// context/CartContext.js
import { createContext, useContext, useEffect, useState, useMemo } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart')
      if (stored) {
        try {
          setCartItems(JSON.parse(stored))
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e)
        }
      }
    }
  }, [])

  // Persist cart whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Calculate total price
  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : 0
      const qty   = typeof item.quantity === 'number' ? item.quantity : 0
      return sum + price * qty
    }, 0)
  }, [cartItems])

  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id)
      if (existing) {
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + (item.quantity || 1) }
            : p
        )
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }]
    })
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
