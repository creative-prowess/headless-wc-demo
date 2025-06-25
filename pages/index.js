// pages/index.js
import Layout from '@/components/Layout'
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

    const faqItems = [
    {
      label: 'What is your return policy?',
      content: 'You may return most new, unopened items within 30 days of delivery for a full refund.'
    },
    {
      label: 'Do you ship internationally?',
      content: 'Yes, we ship to over 50 countries worldwide. Shipping fees apply.'
    },
    {
      label: 'How do I track my order?',
      content: 'Once your order ships, you will receive a tracking number via email.'
    }
  ]


  return (
    <Layout>
      <FlexibleSections sections={sections} />

    </Layout>
  )
}
