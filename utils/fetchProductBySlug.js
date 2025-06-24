// utils/fetchProductBySlug.js
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'

export async function fetchProductBySlug(slug) {
  const { data } = await client.query({
    query: gql`
      query GetProductBySlug($slug: ID!) {
        product(id: $slug, idType: SLUG) {
          id
          name
          slug
          shortDescription

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
                attributes {
                  nodes { name value }
                }
              }
            }
          }
          ... on ExternalProduct {
            price
          }

          image {
            sourceUrl
            altText
          }
        }
      }
    `,
    variables: { slug },
  })

  const p = data.product
  if (!p) {
    throw new Error(`Product with slug "${slug}" not found`)
  }

  return {
    id:               p.id,
    slug:             p.slug,
    name:             p.name,
    shortDescription: p.shortDescription,
    price:            p.price ?? '0',
    stockStatus:      p.stockStatus,
    image:            p.image,
    variations:       p.variations?.nodes || [],
    seo:              p.seo,
  }
}
