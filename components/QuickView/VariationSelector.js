import { useState, useEffect } from 'react'

export default function VariationSelector({
  variations,
  selectedVariation,
  setSelectedVariation,
  selectedAttributes,
  setSelectedAttributes
}) {
  // Create a map of all attributes and possible values
  const attributeMap = {}
  variations.forEach(variation => {
    variation.attributes?.nodes.forEach(attr => {
      if (!attributeMap[attr.name]) attributeMap[attr.name] = new Set()
      attributeMap[attr.name].add(attr.value)
    })
  })

   Object.keys(attributeMap).forEach((key) => {
    attributeMap[key] = Array.from(attributeMap[key]);
  });
  // Convert Set → Array
  const allAttributes = Object.entries(attributeMap).map(([name, values]) => ({
    name,
    options: Array.from(values)
  }))

  useEffect(() => {
    const matched = variations.find(variation =>
      variation.attributes.nodes.every(attr =>
        selectedAttributes[attr.name] === attr.value
      )
    )
    setSelectedVariation(matched || null)
  }, [selectedAttributes, setSelectedVariation])

  const handleChange = (attributeName, value) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeName]: value
    }))
  }

  if (!allAttributes.length) return null

return (
    <div className="space-y-4">
      {Object.keys(attributeMap).map((attrName) => (
        <div key={attrName}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {attrName}
          </label>
          <select
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleChange(attrName, e.target.value)}
            value={selectedAttributes?.[attrName] || ''}
          >
            <option value="">Select {attrName}</option>
            {attributeMap[attrName].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
