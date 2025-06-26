// components/QuickView/QuickViewToggle.js
import { FaEye } from 'react-icons/fa'
import client from '@/lib/apolloClient'
import { gql } from '@apollo/client'
import { fetchProductBySlug } from '@/utils/fetchProductBySlug'

const GET_PRODUCT = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      slug
      shortDescription
      image { sourceUrl altText }

      ... on SimpleProduct {
        price
        stockStatus
      }
      ... on VariableProduct {
        price
        stockStatus
        variations(first: 50) {
          nodes {
            id
            price
            stockStatus
            attributes { nodes { name value } }
          }
        }
      }
    }
  }
`

export default function QuickViewToggle({ onClick, slug }) {
  const prefetch = () => {
    if (!slug) return

    // Prime Apollo cache with core fields
    client.query({
      query: GET_PRODUCT,
      variables: { slug },
      fetchPolicy: 'cache-first',
    })

    // Also fetch full product shape (incl. SEO, description, etc.)
    fetchProductBySlug(slug).catch(() => {})
  }

  return (
    <button
      onMouseEnter={prefetch}
      onFocus={prefetch}
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        onClick(slug)
      }}
      aria-label="Quick View"
      className="p-2 hover:bg-gray-100 rounded"
    >
      <FaEye />
    </button>
  )
}
