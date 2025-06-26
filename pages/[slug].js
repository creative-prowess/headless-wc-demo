// pages/[slug].js
import { fetchPageByUri } from '@/lib/fetchPageByUri'
import FlexibleSections from '@/components/Acf/FlexibleSections'
import Layout from '@/components/Layout'

export async function getStaticPaths() {
  // Fetch all page slugs from WordPress
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          pages(first: 1000) {
            nodes {
              uri
            }
          }
        }
      `,
    }),
  });
  const json = await res.json();

const RESERVED_SLUGS = ['cart', 'checkout', 'shop','dashboard', ''];
const paths = json?.data?.pages?.nodes
  ?.filter(node => node.uri)
  ?.map(node => ({
    params: { slug: node.uri.replace(/\//g, '') },
  }))
  .filter(({ params }) => !RESERVED_SLUGS.includes(params.slug)) || [];

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  // Compose the URI; for root pages you might need to special-case ''
  const uri = params.slug === '' ? 'home' : params.slug;
  const pageData = await fetchPageByUri(uri);

  if (!pageData) {
    return { notFound: true };
  }

  return {
    props: { pageData },
    revalidate: 60,
  };
}

export default function WPPage({ pageData }) {
  // Flexible sections renderer, or whatever you want to show
  const sections = pageData?.flexibleSections?.sections;
  return (
    <Layout>
      <FlexibleSections sections={sections} />
    </Layout>
  );
}
