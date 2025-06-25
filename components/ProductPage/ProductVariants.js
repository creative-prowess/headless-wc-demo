// components/ProductPage/ProductVariants.js
import { useState, useEffect } from 'react'

export default function ProductVariants({ product, onSelectVariation }) {
  const [selectedAttributes, setSelectedAttributes] = useState({})

  useEffect(() => {
    if (product.variations?.nodes?.length && Object.keys(selectedAttributes).length > 0) {
      const matchedVariation = product.variations.nodes.find(variation => {
        return variation.attributes.nodes.every(attr => {
          return selectedAttributes[attr.name] === attr.value
        })
      })
      onSelectVariation(matchedVariation || null)
    }
  }, [selectedAttributes, product.variations, onSelectVariation])

  const handleSelect = (attrName, value) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attrName]: value
    }))
  }

  return (
    <div className="mt-4">
      {product.variationAttributes?.map(attr => (
        <div key={attr.name} className="mb-4">
          <label className="block font-semibold mb-1 capitalize">{attr.name}</label>
          <div className="flex gap-2 flex-wrap">
            {attr.values.map(value => (
              <button
                key={value}
                className={`border px-3 py-1 rounded hover:bg-gray-100 ${selectedAttributes[attr.name] === value ? 'bg-gray-200 font-bold' : ''}`}
                onClick={() => handleSelect(attr.name, value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
