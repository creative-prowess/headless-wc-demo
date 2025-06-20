import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import QuantityInput from './QuantityInput'
import VariationSelector from './VariationSelector'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'

export default function QuickViewModal({ isOpen, onClose, product }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [selectedVariation, setSelectedVariation] = useState(null)

  // Initialize default attributes
  useEffect(() => {
    if (!product?.variations?.nodes?.length) return
    const init = {}
product?.variations?.nodes?.[0]?.attributes?.nodes?.forEach(({ name, value }) => {
      init[name] = value
    })
    setSelectedAttributes(init)
  }, [product])

  // Update selectedVariation when attributes change
  useEffect(() => {
const match = product?.variations?.nodes?.find((v) =>
  v.attributes?.nodes?.every((attr) => selectedAttributes[attr.name] === attr.value)
)
    setSelectedVariation(match || null)
  }, [selectedAttributes])

  // Build & dispatch the cart item
  function handleAddToCart() {
    const source   = selectedVariation || product
    const rawPrice = selectedVariation?.price ?? product.price ?? '0'
    const priceNum = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0

    const item = {
      id:       source.id,
      name:     source.name,
      slug:     product.slug,
      price:    priceNum,
      quantity,  
      image:    source.image?.sourceUrl || product.image?.sourceUrl || '',
    }

    addToCart(item)
    showToast(item)
    onClose()
  }

  const hasVariations       = product.variations?.nodes?.length > 0
  const currentStockStatus  = selectedVariation?.stockStatus || product.stockStatus || 'OUT_OF_STOCK'
  const isPurchasable       = !!(selectedVariation?.price || product.price) && currentStockStatus === 'IN_STOCK'

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-10 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center border-b p-4">
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div>
                    <img
                      src={product.image?.sourceUrl}
                      alt={product.image?.altText || product.name}
                      className="w-full h-auto rounded"
                    />
                  </div>

                  <div className="space-y-4">
                    <DialogTitle className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </DialogTitle>

                    <p className="text-gray-700 text-sm">
                      {product.description || 'No description.'}
                    </p>

                    {currentStockStatus === 'IN_STOCK' ? (
                      <div className="text-green-600 text-sm font-medium">In Stock</div>
                    ) : (
                      <div className="text-red-600 text-sm font-medium">Out of Stock</div>
                    )}

                    <p className="text-green-600 font-semibold text-lg">
                      {product.price}
                    </p>

                    {hasVariations && (
                      <VariationSelector
                        variations={product.variations?.nodes || []}
                        selectedVariation={selectedVariation}
                        setSelectedVariation={setSelectedVariation}
                        selectedAttributes={selectedAttributes}
                        setSelectedAttributes={setSelectedAttributes}
                      />
                    )}
<QuantityInput initial={quantity} onChange={setQuantity} />
                    <button
                      onClick={handleAddToCart}
                      disabled={
                        !isPurchasable || (hasVariations && !selectedVariation)
                      }
                      className={`w-full bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition ${
                        !isPurchasable || (hasVariations && !selectedVariation)
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      {hasVariations && !selectedVariation
                        ? 'Select Options'
                        : !isPurchasable
                        ? 'Unavailable'
                        : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
