import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'
import Image from 'next/image'
export default function ProductTableRow({ product,isFirstFewRows = false  }) {
  const {
    id,
    name,
    sku,
    price,
    regular_price,
    image,
    category,
    views,
    stock_status,
    stock_quantity,
  } = product

  const isOutOfStock = stock_status === 'OUT_OF_STOCK'
  const stockClass = isOutOfStock ? 'text-red-500' : 'text-green-600'

  return (
    <tr className="border-t-2 dark:border-t-darker hover:bg-brandblue hover:text-white">
      <td className="p-4">
<Image
  src={product.image}
  alt={product.name}
  width={40}
  height={40}
  className="w-10 h-10 object-cover rounded"
    priority={isFirstFewRows}
/>
      </td>
      <td>{name}</td>
      <td className="text-sm">{sku}</td>
      <td>
        {regular_price && regular_price !== price ? (
          <>
            <span className="line-through text-gray-400 mr-2">{regular_price}</span>
            <span className="text-green-600 font-bold">{price}</span>
          </>
        ) : (
          <span>{price}</span>
        )}
      </td>
      <td>{category}</td>

      <td className={`text-center ${stockClass}`}>
        {stock_quantity !== null && stock_quantity !== undefined
          ? stock_quantity
          : <span className="text-gray-400 italic">N/A</span>}
      </td>

      <td className={stockClass}>
        {isOutOfStock ? 'Out of Stock' : 'In Stock'}
      </td>

      <td className="text-center">{views}</td>

      <td className="flex gap-2 items-center justify-center p-2">
        <button><FaEye /></button>
        <button><FaEdit /></button>
        <button><FaTrash className="text-accent" /></button>
      </td>
    </tr>
  )
}
