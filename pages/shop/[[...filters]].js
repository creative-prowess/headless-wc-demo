import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import Layout from '@/components/Layout'
import ProductGrid from '@/components/ProductGrid'
import ShopControls from '@/components/ShopFilters/ShopControls'
import { parseFilters } from '@/utils/parseFiltersFromUrl'
import { DynamicTaxonomyFilter,SortDropdown } from '@/components/ShopFilters'
import Head from 'next/head'
import {generateSeo} from '@/components/generateSeo'


export default function ShopPage({title, description, canonical, products =[] }) {
  return (
    
    <Layout>
        <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
      </Head>

      <div className="max-w-7xl mx-auto p-4 md:p-0 lg:flex gap-8">
        <aside className="lg:w-1/4 space-y-6">
          {/* Taxonomy Filters */}


<SortDropdown />

<DynamicTaxonomyFilter
  taxonomy="brand"
  graphqlField="productBrands"
  title="Brand"
/>
<DynamicTaxonomyFilter
  taxonomy="system"
  graphqlField="systems"
  title="System"
/>
<DynamicTaxonomyFilter
  taxonomy="part-category"
  graphqlField="productCategories"
  title="Part Category"
/>
          {/* Sort, Price, Search Controls */}
          <ShopControls />
        </aside>

        <main className="lg:w-3/4">
          <h1 className="text-3xl font-bold my-6">Shop</h1>
          <ProductGrid products={products} />
        </main>
      </div>
    </Layout>
  )
}
export async function getServerSideProps({ params }) {
  const filters = parseFilters(params.filters || [])


const { title, description, canonical } = generateSeo({
  brand: filters.product_brand,
  system: filters.system,
  category: filters.product_cat, // explicitly pass the correct key
})

const filterArray = []
if (filters.product_brand) {
  filterArray.push(`{ taxonomy: PRODUCT_BRAND, terms: ["${filters.product_brand}"] }`)
}
if (filters.system) {
  filterArray.push(`{ taxonomy: SYSTEM, terms: ["${filters.system}"] }`)
}
if (filters.product_cat) {
  filterArray.push(`{ taxonomy: PRODUCT_CAT, terms: ["${filters.product_cat}"] }`)
}

let orderBy = '{ field: DATE, order: DESC }'
if (filters.sort === 'price-asc') orderBy = '{ field: PRICE, order: ASC }'
if (filters.sort === 'price-desc') orderBy = '{ field: PRICE, order: DESC }'
if (filters.sort === 'name-asc') orderBy = '{ field: NAME, order: ASC }'
if (filters.sort === 'name-desc') orderBy = '{ field: NAME, order: DESC }'

  const priceFilter = filters.price
    ? `minPrice: ${filters.price.split('-')[0]}, maxPrice: ${filters.price.split('-')[1]},`
    : ''

  const searchFilter = filters.search ? `search: "${filters.search}",` : ''

  const query = gql`
    query GetFilteredProducts {
      products(
        where: {
          ${searchFilter}
          ${priceFilter}
          orderby: ${orderBy}
        taxonomyFilter: {
          relation: AND
          filters: [${filterArray.join(',')}]
        }
        }
      ) {
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
            variations(first: 50) {
              nodes {
                price
              }
            }
          }
        }
      }
    }
  `

  const { data } = await client.query({ query })

  const products = data.products.nodes.map((p) => {
    const rawPrice = p.price ?? '0'
    const basePrice = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0

    let displayPrice = `$${basePrice.toFixed(2)}`

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
    props: {
      title,
      description,
      canonical,
      products,
    }
  }
}
