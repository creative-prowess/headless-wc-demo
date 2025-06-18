import { createContext, useContext, useState } from 'react'
import Link from 'next/link'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)
  const [visible, setVisible] = useState(false)

const showToast = (product, message = 'has been added to your cart.') => {
  setToast({ ...product, message })
  setVisible(true)

  setTimeout(() => {
    setVisible(false)
    setTimeout(() => setToast(null), 300)
  }, 4000)
}

  const closeToast = () => {
    setVisible(false)
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 bg-white border border-gray-200 shadow-lg rounded-lg p-4 w-80 ${
            visible ? 'toast-slide-in' : 'toast-slide-out'
          }`}
        >

          <div className="flex items-start gap-4">
{toast.image ? (
  <img
    src={typeof toast.image === 'string' ? toast.image : toast.image.sourceUrl}
    alt={toast.image?.altText || toast.name}
    className="w-10 h-10 object-cover rounded"
  />
) : (
  <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm">
    ?
  </div>
)}
            <div className="flex-1 text-sm text-gray-800">
<p className="mb-1">
  {toast.message
    ? toast.message
    : `${toast.name} has been added to your ${toast.type === 'wishlist' ? 'wishlist' : 'cart'}.`}
</p>
<Link
  href={toast.type === 'wishlist' ? '/wishlist' : '/cart'}
  className="font-semibold text-blue-600 hover:underline"
>
  {toast.type === 'wishlist' ? 'View Wishlist' : 'View Cart'}
</Link>
            </div>
            <button
              onClick={closeToast}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  )
}

export const useToast = () => useContext(ToastContext)
