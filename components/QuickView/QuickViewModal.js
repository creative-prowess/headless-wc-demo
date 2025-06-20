import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import QuantityInput from './QuantityInput'
import VariationSelector from './VariationSelector'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { fetchProductBySlug } from '../utils/fetchProductBySlug'

export default function QuickViewModal({ isOpen, onClose, slug }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [selectedVariation, setSelectedVariation] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch full product data using slug
  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetchProductBySlug(slug)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false))
  }, [slug])

  // Set initial variation attributes
  useEffect(() => {
    if (!product?.variations?.nodes?.length) return
    const first = product.variations.nodes[0]
    const initial = {}
    first.attributes?.nodes.forEach(({ name, value }) => {
      initial[name] = value
    })
    setSelectedAttributes(initial)
  }, [product])

  // Match selected variation
  useEffect(() => {
    if (!product?.variations?.nodes?.length) return
    const match = product.variations.nodes.find((v) =>
      v.attributes.nodes.every((attr) => selectedAttributes[attr.name] === attr.value)
    )
    setSelectedVariation(match || null)
  }, [selectedAttributes, product])

  const handleAddToCart = () => {
    const source = selectedVariation || product
    const rawPrice = selectedVariation?.price ?? product.price ?? '0'
    const price = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0

    const item = {
      id: source.id,
      name: source.name,
      slug: product.slug,
      price,
      quantity,
      image: source.image?.sourceUrl || product.image?.sourceUrl || '',
    }

    addToCart(item)
    showToast(item)
    onClose()
  }

  const hasVariations = product?.variations?.nodes?.length > 0
  const stockStatus = selectedVariation?.stockStatus || product?.stockStatus || 'OUT_OF_STOCK'
  const isPurchasable = !!(selectedVariation?.price || product?.price) && stockStatus === 'IN_STOCK'

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-40" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-4 py-10 text-center">
            <div className="w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
              <div className="flex justify-between items-center border-b p-4">
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {loading || !product ? (
                <div className="p-6 text-center text-gray-500">Loading product...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  <div>
                    <img
                      src={product.image?.sourceUrl}
                      alt={product.image?.altText || product.name}
                      className="w-full h-auto rounded"
                    />
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>

                    <p className="text-gray-700 text-sm">
                      {product.description || 'No description.'}
                    </p>

                    {stockStatus === 'IN_STOCK' ? (
                      <div className="text-green-600 text-sm font-medium">In Stock</div>
                    ) : (
                      <div className="text-red-600 text-sm font-medium">Out of Stock</div>
                    )}

                    <p className="text-green-600 font-semibold text-lg">
                      {selectedVariation?.price || product.price}
                    </p>

                    {hasVariations && (
                      <VariationSelector
                        variations={product.variations.nodes}
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
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}