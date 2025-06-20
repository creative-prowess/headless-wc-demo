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
      }
      ... on ExternalProduct {
        price
        stockStatus
      }
    }
  }
}
    `,
  })
const products = data.products.nodes.map((p) => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  image: p.image,
  price: p.price ?? '0',
  stockStatus:
    p.__typename === 'SimpleProduct' ||
    p.__typename === 'VariableProduct' ||
    p.__typename === 'ExternalProduct'
      ? p.stockStatus
      : 'OUT_OF_STOCK',
}))
  return { props: { products }, revalidate: 60 }
}

export default function ShopPage({ products }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mt-6 mb-8">Shop</h1>
      <ProductGrid products={products} />
    </Layout>
  )
}
