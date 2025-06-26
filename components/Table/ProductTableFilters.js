export default function ProductTableFilters({
  search,
  setSearch,
  category,
  setCategory,
  sortByPrice,
  setSortByPrice,
  sortByDate,
  setSortByDate,
  categoryOptions = [],
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="all">All categories</option>
        {categoryOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={sortByPrice}
        onChange={e => setSortByPrice(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort by Price</option>
        <option value="price_ASC">Price: Low to High</option>
        <option value="price_DESC">Price: High to Low</option>
      </select>

      <select
        value={sortByDate}
        onChange={e => setSortByDate(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort by Date</option>
        <option value="date_DESC">Newest First</option>
        <option value="date_ASC">Oldest First</option>
      </select>

      <input
        type="text"
        placeholder="Search"
        className="flex-1 border p-2 rounded"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}
