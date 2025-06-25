// pages/index.js
import Layout from '@/components/Layout'
import ProductGrid from '@/components/ProductGrid'
import { fetchProducts } from '@/lib/fetchProductsList'
import { fetchHomePage } from '@/lib/fetchHomePage'
import FlexibleSections from '@/components/Acf/FlexibleSections';

export async function getStaticProps() {
  const products = await fetchProducts();
  const homePage = await fetchHomePage();
  return {
    props: { products, homePage },
    revalidate: 60,
  }
}

export default function Home({ products, homePage }) {
  // Get the Hero data
  console.log({ homePage });
  const sections = homePage?.flexibleSections?.sections;

  return (
    <Layout>
      <FlexibleSections sections={sections} />
    </Layout>
  )
}
