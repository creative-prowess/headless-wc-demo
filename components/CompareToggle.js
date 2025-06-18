import { useCompare } from '@/context/CompareContext'
import { LuGitCompareArrows } from "react-icons/lu";

export default function CompareToggle({ product }) {
  const { isInCompare, addToCompare, removeFromCompare } = useCompare()

  const handleClick = () => {
    isInCompare(product.id)
      ? removeFromCompare(product.id)
      : addToCompare(product)
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle compare"
      className="transition-colors duration-200"
    >
      <LuGitCompareArrows
        className={`text-xl ${
          isInCompare(product.id) ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'
        }`}
      />
    </button>
  )
}
