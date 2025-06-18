import { gql, useQuery } from '@apollo/client'
import Layout from '@/components/Layout'
import ProductGrid from '../components/ProductGrid'
const GET_PRODUCTS = gql`
  query GetProducts {

    products(first: 12) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          regularPrice
        }
        ... on VariableProduct {
          price
          regularPrice
        }
        ... on ExternalProduct {
          price
          regularPrice
        }
      }
    }
  }
`
export default function ShopPage() {

    const { error, data } = useQuery(GET_PRODUCTS)
 if (error) {
    console.error('GraphQL error:', error)
    return <p className="text-center mt-10 text-red-600">Error loading products.</p>
  }
    const products = data?.products?.nodes || []

    return (
    <Layout>
      <h1 className="text-3xl font-bold text-left mt-6 mb-8">Shop</h1>
      <ProductGrid products={products} />
    </Layout>
  )
  
}