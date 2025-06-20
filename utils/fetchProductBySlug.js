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
          image {
            sourceUrl
            altText
          }

          ... on SimpleProduct {
            price
            stockStatus
          }

          ... on VariableProduct {
            price
            stockStatus
            variations {
              nodes {
                id
                name
                price
                stockStatus
                attributes {
                  nodes {
                    name
                    value
                  }
                }
              }
            }
          }

          ... on ExternalProduct {
            price
            externalUrl
          }

          ... on GroupProduct {
            price
          }

          ... on SubscriptionProduct {
            price
            stockStatus
          }

          ... on VariableSubscriptionProduct {
            price
            stockStatus
            variations {
              nodes {
                id
                name
                price
                stockStatus
                attributes {
                  nodes {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: { slug },
  })

  return data.product || null
}
