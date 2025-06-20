// lib/fetchProductsList.js
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'

export async function fetchProducts() {
  const { data } = await client.query({
    query: gql`
      query GetProducts {
        products(first: 20) {
          nodes {
            id
            slug
            name
            image {
              sourceUrl
              altText
            }
            ... on SimpleProduct {
              price: price(format: RAW)
            }
            ... on VariableProduct {
              price: price(format: RAW)
            }
            ... on ExternalProduct {
              price: price(format: RAW)
            }
          }
        }
      }
    `,
  })

  // Map to minimal shape
  return data.products.nodes.map((p) => ({
    id:    p.id,
    slug:  p.slug,
    name:  p.name,
    image: p.image,
    price: p.price ?? '0',
  }))
}