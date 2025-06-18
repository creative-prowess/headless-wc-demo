import React from 'react'

export default function CartItem({ item, onRemove }) {
  return (
    <div className="flex items-start gap-4 border-b pb-4 mb-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded"
      />
      <div className="flex-1">
        <div className="font-medium">{item.name}</div>
        <div className="text-sm text-gray-500">
      {Array.isArray(item.attributes) ? item.attributes.join(', ') : ''}
        </div>
        <div className="text-sm mt-1">
          {item.stockStatus === 'IN_STOCK' ? 'In stock' : 'Ships later'}
        </div>
        <div className="mt-2 text-sm">Qty: {item.quantity}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-semibold">${item.price}</div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 text-sm mt-2"
          aria-label={`Remove ${item.name}`}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
