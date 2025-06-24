// components/QuickViewToggle.js
import { FaEye } from 'react-icons/fa'

export default function QuickViewToggle({ onClick }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onClick()
      }}
      aria-label="Quick View"
    >
      <FaEye />
    </button>
  )
}
