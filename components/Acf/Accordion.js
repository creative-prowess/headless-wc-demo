import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Accordion({ items = [], defaultOpenIndex = null }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  const toggle = i => {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  return (
    <div className="space-y-2 max-w-7xl mx-auto px-4 lg:px-0 my-8">
      {items.map((item, i) => {
        const isOpen = i === openIndex
        return (
          <div key={i} className="border border-gray-300 overflow-hidden">
            <button
              type="button"
              aria-expanded={""}
              aria-controls={`accordion-panel-${i}`}
              id={`accordion-header-${i}`}
              className="w-full text-left px-4 py-4 flex justify-between items-center font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600"
              onClick={() => toggle(i)}
            >
              {item.label}
              <span className="ml-2 text-green-600 leading-none text-[22px]">{isOpen ? '−' : '+'}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-panel-${i}`}
                  role="region"
                  aria-labelledby={`accordion-header-${i}`}
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden border-t-2 border-green-600 bg-white"
                >
                  <div className="px-4 py-6 text-sm text-gray-700">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}