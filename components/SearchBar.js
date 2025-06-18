// components/SearchBar.js
export default function SearchBar() {
  return (
    <form className="hidden md:flex flex-1 max-w-md mx-6">
      <select className="border border-gray-300 rounded-l px-3 text-sm">
        <option>All Categories</option>
        <option>Clothing</option>
        <option>Electronics</option>
      </select>
      <input
        type="text"
        placeholder="Search products..."
        className="flex-grow border-y border-gray-300 px-4 py-2 text-sm"
        aria-label="Search products"
      />
      <button className="bg-blue-600 text-white px-4 rounded-r text-sm">Search</button>
    </form>
  )
}
