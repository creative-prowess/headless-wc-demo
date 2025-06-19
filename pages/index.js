import { gql, useQuery } from '@apollo/client'
import Layout from '../components/Layout'
import ProductGrid from '../components/ProductGrid'
import { fetchProducts } from '../lib/fetchProducts';

export async function getStaticProps() {
  const products = await fetchProducts();
  return {
    props: { products },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
}

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

export default function Home({ products }) {

  return (
    <Layout>
      <ProductGrid products={products} />
    </Layout>
  )
}
