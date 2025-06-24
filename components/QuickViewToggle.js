// components/QuickViewToggle.js
import { FaEye } from 'react-icons/fa'
import client from '@/lib/apolloClient'
import { gql } from '@apollo/client'

const GET_PRODUCT = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      slug
      shortDescription
      image { sourceUrl altText }
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
`

export default function QuickViewToggle({ onClick, slug }) {
  return (
    <button
      onMouseEnter={() => {
        // prime the cache
        client.query({
          query: GET_PRODUCT,
          variables: { slug },
          fetchPolicy: 'cache-first',
        })
      }}
      onClick={e => {
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
