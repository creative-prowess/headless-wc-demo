'use client'
import { useEffect } from 'react'
import { hsSelect } from 'preline/dist/plugins/hs-select.js'

export default function CategorySelect() {
  useEffect(() => {
    hsSelect('[data-hs-select]')
  }, [])

  return (
    <div className="relative">
      <select data-hs-select='{ /* your config here */ }'>
        {/* options */}
      </select>
      <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
        {/* icon */}
      </div>
    </div>
  )
}
