import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import QuantityInput from './QuantityInput'
import VariationSelector from './VariationSelector'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { fetchProductBySlug } from '@/utils/fetchProductBySlug'

export default function QuickViewModal({ isOpen, onClose, slug }) {
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [selectedVariation, setSelectedVariation] = useState(null)

  const { addToCart } = useCart()
  const { showToast } = useToast()

  useEffect(() => {
    if (!slug || !isOpen) return

    console.log('🔥 Fetching slug:', slug)
    fetchProductBySlug(slug)
      .then((res) => {
        console.log('✅ Product fetched:', res)
        setProduct(res)
      })
      .catch((error) => {
        console.error('❌ Error fetching product:', error)
      })
  }, [slug, isOpen])

  const variations = product?.variations?.nodes || []
  const hasVariations = variations.length > 0

  useEffect(() => {
    if (!hasVariations) return
    const init = {}
    variations[0]?.attributes?.nodes.forEach(({ name, value }) => {
      init[name] = value
    })
    setSelectedAttributes(init)
  }, [product])

  useEffect(() => {
    if (!hasVariations) return
    const match = variations.find((v) =>
      v.attributes.nodes.every((attr) => selectedAttributes[attr.name] === attr.value)
    )
    setSelectedVariation(match || null)
  }, [selectedAttributes])

  function handleAddToCart() {
    const source = selectedVariation || product
    const rawPrice = selectedVariation?.price ?? product?.price ?? '0'
    const priceNum = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0

    const item = {
      id: source.id,
      name: source.name,
      slug: product.slug,
      price: priceNum,
      quantity,
      image: source.image?.sourceUrl || product.image?.sourceUrl || '',
    }

    addToCart(item)
    showToast(item)
    onClose()
  }

  if (!product) return null

  const currentStockStatus =
    selectedVariation?.stockStatus || product?.stockStatus || 'OUT_OF_STOCK'
  const isPurchasable =
    !!(selectedVariation?.price || product?.price) &&
    currentStockStatus === 'IN_STOCK'

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
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div className="relative w-full h-[300px]">
                    {product.image?.sourceUrl && (
                      <Image
                        src={product.image.sourceUrl}
                        alt={product.image.altText || product.name || 'Product Image'}
                        fill
                        className="object-contain rounded"
                      />
                    )}
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
                        variations={variations}
                        selectedVariation={selectedVariation}
                        setSelectedVariation={setSelectedVariation}
                        selectedAttributes={selectedAttributes}
                        setSelectedAttributes={setSelectedAttributes}
                      />
                    )}

                    <QuantityInput initial={quantity} onChange={setQuantity} />

                    <button
                      onClick={handleAddToCart}
                      disabled={!isPurchasable || (hasVariations && !selectedVariation)}
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
