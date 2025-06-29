export function generateSeo({ brand, system, partCategory }) {
  const parts = []

  if (brand) parts.push(capitalize(brand))
  if (system) parts.push(system.toUpperCase())
  if (partCategory) parts.push(capitalize(partCategory.replace(/-/g, ' ')))

  const title = parts.length
    ? `${parts.join(' ')} Replacement Parts | Console Parts Depot`
    : 'Shop Console Repair Parts | Console Parts Depot'

  const description = parts.length
    ? `Shop high-quality replacement parts for ${parts.join(' ')}. Compatible, reliable, and tested for durability.`
    : 'Browse high-quality replacement parts for gaming consoles. HDMI ports, power supplies, and more.'

  const canonical = `https://consolepartsdepot.com${buildCanonicalPath({ brand, system,partCategory })}`

  return { title, description, canonical }
}

function buildCanonicalPath({ brand, system, partCategory }) {
  const segments = []
  if (brand) segments.push('brand', brand)
  if (system) segments.push('system', system)
  if (partCategory) segments.push('part-category', partCategory)
  return '/' + segments.join('/') + '/'
}

function capitalize(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase())
}