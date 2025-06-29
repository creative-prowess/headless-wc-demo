export function parseFilters(segments = []) {
  const filters = {}
  for (let i = 0; i < segments.length; i += 2) {
    const key = segments[i]
    const value = segments[i + 1]
    if (!value) continue

    if (key === 'brand') filters.product_brand = value
    else if (key === 'system') filters.system = value
    else if (key === 'part-category') filters.product_cat = value
    else if (key === 'sort') filters.sort = value
    else if (key === 'search') filters.search = value
    else if (key === 'price') filters.price = value
  }
  return filters
}