import { FaEye } from 'react-icons/fa'

export default function QuickViewToggle({ onClick }) {
  const handleClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    onClick()
  }

  return (
    <button
      onClick={handleClick}
      className="text-gray-400 hover:text-blue-500"
      aria-label="Quick View"
    >
      <FaEye className="text-lg" />
    </button>
  )
}
