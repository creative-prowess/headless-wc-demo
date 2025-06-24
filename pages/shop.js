// pages/shop.js
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import Layout from '@/components/Layout'
import ProductGrid from '@/components/ProductGrid'

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query GetProducts {
        products(first: 20) {
          nodes {
            __typename               # ← tell us what type it is
            id
            slug
            name
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
              variations(first: 50) {
                nodes {
                  price
                }
              }
            }
            ... on ExternalProduct {
              price
            }
          }
        }
      }
    `,
  })

  const products = data.products.nodes.map((p) => {
    // grab the raw price from whatever type
    const rawPrice = p.price ?? '0'
    const basePrice = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0

    let displayPrice = `$${basePrice.toFixed(2)}`

    // if it’s a variable product, compute a min—max range
    if (p.__typename === 'VariableProduct' && p.variations?.nodes.length) {
      const variationPrices = p.variations.nodes
        .map((v) => parseFloat(v.price.replace(/[^0-9.]/g, '')) || 0)
        .sort((a, b) => a - b)
      const [min, max] = [variationPrices[0], variationPrices.pop()]
      displayPrice = min === max
        ? `$${min.toFixed(2)}`
        : `$${min.toFixed(2)} — $${max.toFixed(2)}`
    }

    const status = (p.stockStatus ?? '').toUpperCase() || 'OUT_OF_STOCK'

    return {
      id:          p.id,
      slug:        p.slug,
      name:        p.name,
      image:       p.image,
      price:       displayPrice,
      stockStatus: status,
    }
  })

  return {
    props: { products },
    revalidate: 60,
  }
}

export default function ShopPage({ products = [] }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mt-6 mb-8">Shop</h1>
      <ProductGrid products={products} />
    </Layout>
  )
}