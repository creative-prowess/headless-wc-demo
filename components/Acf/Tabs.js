import { useState } from 'react'

export default function Tabs({ tabs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleKeyDown = (e, i) => {
    if (e.key === 'ArrowRight') {
      setActiveIndex((i + 1) % tabs.length)
    } else if (e.key === 'ArrowLeft') {
      setActiveIndex((i - 1 + tabs.length) % tabs.length)
    } else if (e.key === 'Home') {
      setActiveIndex(0)
    } else if (e.key === 'End') {
      setActiveIndex(tabs.length - 1)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-0">
      <div
        role="tablist"
        aria-label="Tab section"
        className="flex mt-16 border-b border-gray-300"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            id={`tab-${i}`}
            aria-selected={i === activeIndex}
            aria-controls={`panel-${i}`}
            tabIndex={i === activeIndex ? 0 : -1}
            className={`px-4 py-2 font-medium text-sm focus:outline-none transition-all ${
              i === activeIndex
                ? 'border-b-2 border-green-700 text-green-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveIndex(i)}
            onKeyDown={e => handleKeyDown(e, i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`panel-${i}`}
          aria-labelledby={`tab-${i}`}
          hidden={i !== activeIndex}
          className="p-4 mt-4 bg-white transition-all duration-300 ease-in-out"
        >
          {i === activeIndex && tab.content}
        </div>
      ))}
    </div>
  )
}
