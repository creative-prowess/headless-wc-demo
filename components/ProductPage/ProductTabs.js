// /components/ProductPage/ProductTabs.js
import { useState } from 'react'

const tabs = [
  { key: 'description', label: 'Description' },
  { key: 'specs', label: 'Specifications' },
  { key: 'reviews', label: 'Reviews' },
]

export default function ProductTabs({ description, specs, reviews }) {
  const [activeTab, setActiveTab] = useState('description')

  const renderContent = () => {
    switch (activeTab) {
      case 'specs':
        return specs ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: specs }} />
        ) : (
          <p className="text-muted">No specifications available.</p>
        )
      case 'reviews':
        return reviews ? (
          <div>{reviews}</div>
        ) : (
          <p className="text-muted">No reviews yet.</p>
        )
      default:
        return description ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: description }} />
        ) : (
          <p className="text-muted">No description available.</p>
        )
    }
  }

  return (
    <div className="mt-12">
      <div className="flex flex-col w-full md:flex-row border-b border-gray-200 gap-8 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 text-lg font-medium text-left sm:text-center transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? 'border-brand text-brand'
                : 'border-transparent text-gray-500 hover:text-brand hover:border-brand'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="fade-in">
        {renderContent()}
      </div>
    </div>
  )
}
