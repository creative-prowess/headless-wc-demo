// components/QuickView/QuickViewModal.js
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import QuantityInput from './QuantityInput'
import VariationSelector from './VariationSelector'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { fetchProductBySlug } from '@/utils/fetchProductBySlug'

export default function QuickViewModal({ slug, isOpen, onClose }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)

  // **Renamed** to match VariationSelector API
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [selectedVariation, setSelectedVariation]     = useState(null)

  // Fetch on open
  useEffect(() => {
    if (!slug || !isOpen) return
    setLoading(true)
    fetchProductBySlug(slug)
      .then(p => {
        setProduct(p)
        // initialize attributes from first variation
        const vnodes = p.variations?.nodes || []
        if (vnodes.length) {
          const init = {}
          vnodes[0].attributes.nodes.forEach(({ name, value }) => {
            init[name] = value
          })
          setSelectedAttributes(init)
        }
      })
      .catch(err => console.error('Error fetching product:', err))
      .finally(() => setLoading(false))
  }, [slug, isOpen])

  // pick matching variation when attributes change
  useEffect(() => {
    const vnodes = product?.variations?.nodes || []
    const match = vnodes.find(v =>
      v.attributes.nodes.every(a => selectedAttributes[a.name] === a.value)
    )
    setSelectedVariation(match || null)
  }, [selectedAttributes, product])

  if (loading || !product) return null

  const variations     = product.variations?.nodes || []
  const hasVariations  = variations.length > 0
  const stockStatus    = selectedVariation?.stockStatus || product.stockStatus
  const priceRaw       = selectedVariation?.price ?? product.price
  const priceNum       = parseFloat(priceRaw.replace(/[^0-9.]/g, '')) || 0
  const purchasable    = priceNum > 0 && stockStatus === 'IN_STOCK'

  function handleAddToCart() {
    const source = selectedVariation || product
    addToCart({
      id:       source.id,
      name:     source.name,
      slug:     product.slug,
      price:    priceNum,
      quantity,
      image:    source.image?.sourceUrl || product.image.sourceUrl,
    })
    showToast({ name: source.name, image: source.image })
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/40" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <DialogPanel className="bg-white max-w-3xl w-full rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-end p-2">
                <button onClick={onClose}>
                  <XMarkIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <Image
                  src={product.image.sourceUrl}
                  alt={product.image.altText || product.name}
                  width={600}
                  height={400}
                  className="object-contain rounded"
                />
                <div className="space-y-4">
                  <DialogTitle className="text-xl font-semibold">
                    {product.name}
                  </DialogTitle>
                  <div
                    className="text-gray-600 text-sm space-y-2"
                    dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                  />
                  <div className={stockStatus === 'IN_STOCK' ? 'text-green-600' : 'text-red-600'}>
                    {stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
                  </div>
                  <div className="text-2xl font-bold">{priceRaw}</div>
                  
                  {hasVariations && (
                    <VariationSelector
                      variations={variations}
                      selectedAttributes={selectedAttributes}
                      setSelectedAttributes={setSelectedAttributes}
                      selectedVariation={selectedVariation}
                      setSelectedVariation={setSelectedVariation}
                    />
                  )}

                  <QuantityInput initial={quantity} onChange={setQuantity} />

                  <button
                    onClick={handleAddToCart}
                    disabled={!purchasable || (hasVariations && !selectedVariation)}
                    className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50 transition"
                  >
                    {hasVariations && !selectedVariation
                      ? 'Select Options'
                      : !purchasable
                      ? 'Unavailable'
                      : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
