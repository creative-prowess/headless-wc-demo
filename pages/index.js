// pages/index.js
import Layout from '@/components/Layout'
import ProductGrid from '@/components/ProductGrid'
import { fetchProducts } from '@/lib/fetchProductsList'

export async function getStaticProps() {
  const products = await fetchProducts()
  return {
    props: { products },
    revalidate: 60, // rebuild every 60s
  }
}

export default function Home({ products }) {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductGrid products={products} />
    </Layout>
  )
}
