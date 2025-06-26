import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import Layout from '@/components/Layout'
import Head from 'next/head'
import SingleProductPage from '@/components/ProductPage/SingleProductPage'

export default function ProductPage({ product }) {
  if (!product) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found or unavailable</h1>
          <p className="mt-2">
            Please check the URL or return to the <a href="/shop" className="text-blue-600 underline">shop</a>.
          </p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{product?.seo?.title || product?.name}</title>
        <meta name="description" content={product?.seo?.description || ''} />
        <link rel="canonical" href={product?.seo?.canonicalUrl || ''} />
        <meta property="og:title" content={product?.seo?.openGraph?.title || ''} />
        <meta property="og:description" content={product?.seo?.openGraph?.description || ''} />
        <meta property="og:image" content={product?.seo?.openGraph?.image?.secureUrl || ''} />
      </Head>
      <SingleProductPage product={product} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query AllSlugs {
        products(first: 50) {
          nodes {
            slug
          }
        }
      }
    `,
  })

  const paths = data.products.nodes.map((p) => ({
    params: { slug: p.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  console.log('🪪 Slug from params:', params.slug)

  try {
    const { data } = await client.query({
      query: gql`
query GetProductBySlug($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    id
    name
    slug
    image {
      sourceUrl
      altText
    }
    productCategories {
      nodes {
        name
      }
    }
    seo {
      title
      description
      canonicalUrl
      openGraph {
        title
        description
        image {
          secureUrl
        }
      }
    }
    ... on SimpleProduct {
      price
      stockStatus
    }
    ... on VariableProduct {
      price
      stockStatus
      attributes {
        nodes {
          name
          # Remove value or terms – not available here
        }
      }
      variations {
        nodes {
          id
          name
          price
          stockStatus
          attributes {
            nodes {
              name
              value #Only allowed inside VariationAttribute
            }
          }
        }
      }
    }
  }
}

      `,
      variables: { slug: params.slug },
    })

    const productWithBumps = JSON.parse(JSON.stringify(data.product))

    productWithBumps.bumps = [
      {
        id: '1',
        slug: 'hat',
        name: 'Cool Hat',
        price: '$9.99',
        image: {
          src: 'https://secure.grannysnaturals.com/wp-content/uploads/woocommerce-placeholder.png',
          alt: 'Cool Hat',
        },
      },
      {
        id: '2',
        slug: 'bag',
        name: 'Canvas Bag',
        price: '$19.99',
        image: {
          src: 'https://secure.grannysnaturals.com/wp-content/uploads/woocommerce-placeholder.png',
          alt: 'Canvas Bag',
        },
      },
    ]

    return {
      props: { product: productWithBumps },
      revalidate: 60,
    }
  } catch (error) {
    console.error('❌ Error fetching product:', error.message)
    return {
      props: { product: null },
      revalidate: 60,
    }
  }
}
