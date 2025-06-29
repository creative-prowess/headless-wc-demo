'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gql, useQuery } from '@apollo/client'

export default function DynamicTaxonomyFilter({ taxonomy, graphqlField, title }) {
  const router = useRouter()
  const pathname = usePathname()
  const [selected, setSelected] = useState(null)
const FIXED_TAXONOMY_ORDER = ['brand', 'system', 'part-category', 'sort']

  // GraphQL query
  const query = gql`
    query GetTerms {
      ${graphqlField}(first: 100) {
        nodes {
          id
          name
          slug
        }
      }
    }
  `

  const { data, loading, error } = useQuery(query)

  // Set selected from URL
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)
    const index = segments.findIndex(seg => seg === taxonomy)
    if (index !== -1 && segments[index + 1]) {
      setSelected(segments[index + 1])
    }
  }, [pathname, taxonomy])

const onChange = (slug) => {
  const segments = pathname.split('/').filter(Boolean)

  // Step 1: Build current filters from the URL
  const filters = {}
  FIXED_TAXONOMY_ORDER.forEach((key) => {
    const i = segments.indexOf(key)
    if (i !== -1 && segments[i + 1]) {
      filters[key] = segments[i + 1]
    }
  })

  // Step 2: Toggle this taxonomy's value
  if (filters[taxonomy] === slug) {
    delete filters[taxonomy] // deselect
    setSelected(null)
  } else {
    filters[taxonomy] = slug
    setSelected(slug)
  }

  // Step 3: Rebuild the path in fixed order
  const newSegments = ['shop']
  FIXED_TAXONOMY_ORDER.forEach(key => {
    if (filters[key]) {
      newSegments.push(key, filters[key])
    }
  })

  const newPath = '/' + newSegments.join('/')
  router.push(newPath)
}



  if (loading) return null
  if (error) return <p className="text-red-600">Error loading {title}</p>

  const terms = data?.[graphqlField]?.nodes || []

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {terms.map(term => (
          <label key={term.id} className="flex items-center gap-2">
            <input
              type="radio"
              name={`filter-${taxonomy}`}
              checked={selected === term.slug}
              onChange={() => onChange(term.slug)}
            />
            <span>{term.name}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
