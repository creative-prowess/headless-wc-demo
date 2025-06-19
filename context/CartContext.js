import { createContext, useContext, useEffect, useState } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // 🔁 Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart))
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e)
        }
      }
    }
  }, [])

  // 💾 Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

const cartTotal = cartItems.reduce((total, item) => {
  const itemTotal = typeof item.price === 'number' ? item.price * item.quantity : 0
  return total + itemTotal
}, 0)

  const addToCart = (item) => {
     if (typeof item.price !== 'number') {
    console.warn('Item added without a valid price:', item)
  }
    setCartItems((prevCart) => {
      const existing = prevCart.find((p) => p.id === item.id)
      if (existing) {
        return prevCart.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        )
      } else {
        return [...prevCart, { ...item, quantity: item.quantity || 1 }]
      }
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
  <CartContext.Provider value={{ cartItems, cartTotal, addToCart, removeFromCart, clearCart }}>

      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}