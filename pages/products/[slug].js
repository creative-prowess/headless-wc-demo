
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import Layout from '@/components/Layout'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'

export default function ProductPage({ product, priority = true }) {
  const { addToCart } = useCart()
  const { showToast } = useToast()

  if (!product) {
    return (
      <Layout>
        <p>Product not found.</p>
      </Layout>
    )
  }

  // Build attribute map
  const variations = product.variations?.nodes || []
  const attrMap = {}
  variations.forEach((v) =>
    v.attributes.nodes.forEach((a) => {
      if (!attrMap[a.name]) attrMap[a.name] = new Set()
      attrMap[a.name].add(a.value)
    })
  )
  Object.keys(attrMap).forEach((k) => {
    attrMap[k] = Array.from(attrMap[k])
  })

  const [selAttrs, setSelAttrs] = useState({})
  const [selVar,   setSelVar]   = useState(null)
  const [qty,      setQty]      = useState(1)
  const [loading,  setLoading]  = useState(false)

  // Default attribute selection
  useEffect(() => {
    if (variations.length && !Object.keys(selAttrs).length) {
      const first = variations[0]
      const init = {}
      first.attributes.nodes.forEach((a) => {
        init[a.name] = a.value
      })
      setSelAttrs(init)
    }
  }, [variations])

  // Find matching variation
  useEffect(() => {
    const match = variations.find((v) =>
      v.attributes.nodes.every((a) => selAttrs[a.name] === a.value)
    )
    setSelVar(match || null)
  }, [selAttrs, variations])

  // Compute price & stock
  const rawPrice = selVar?.price ?? product.price ?? '0'
  const priceNum = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0

  const rawStock = (selVar?.stockStatus ?? product.stockStatus ?? '').toLowerCase()
  const inStock  = rawStock === 'instock' || rawStock === 'in_stock'
  const canBuy   = priceNum > 0 && inStock

  const handleAdd = () => {
    setLoading(true)
    const source = selVar || product
    const item = {
      id:       source.id,
      name:     source.name,
      slug:     product.slug,
      price:    priceNum,
      quantity: qty,
      image:    source.image.sourceUrl || product.image.sourceUrl || '',
    }
    addToCart(item)
    showToast(item)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Layout>
 <Head>
  <title>{product.seo?.title || product.name}</title>
  <meta name="description" content={product.seo?.description || ''} />
  <link rel="canonical" href={product.seo?.canonical || `https://grannysnaturals.com/products/${product.slug}`} />

  {/* OpenGraph */}
  <meta property="og:title" content={product.seo?.opengraphTitle || ''} />
  <meta property="og:description" content={product.seo?.opengraphDescription || ''} />
  <meta property="og:image" content={product.seo?.opengraphImage || ''} />

  {/* Twitter */}
  <meta name="twitter:title" content={product.seo?.twitterTitle || ''} />
  <meta name="twitter:description" content={product.seo?.twitterDescription || ''} />
  <meta name="twitter:image" content={product.seo?.twitterImage || ''} />
</Head>

      <nav className="text-sm text-gray-500 mb-4">
        <div className="max-w-7xl mx-auto px-4">
          Home / {product.productCategories.nodes[0]?.name || 'Category'} /{' '}
          <span className="font-semibold text-gray-900">{product.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                     <Image
                    src={product.image?.sourceUrl || '/placeholder.webp'}
                    alt={product.image?.altText || product.name}
                    width={600}
                    height={600}
                    className="w-full rounded-lg shadow-lg"
                    priority={priority}
                  />


        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          {inStock ? (
            <div className="text-green-600">In Stock</div>
          ) : (
            <div className="text-red-600">Out of Stock</div>
          )}

          <div className="text-3xl font-semibold">
            ${priceNum.toFixed(2)}
          </div>

          {Object.entries(attrMap).map(([attr, vals]) => (
            <div key={attr}>
              <label className="block mb-1 font-medium">{attr}</label>
              <select
                className="w-full border p-2 rounded"
                value={selAttrs[attr] || ''}
                onChange={(e) =>
                  setSelAttrs((prev) => ({
                    ...prev,
                    [attr]: e.target.value,
                  }))
                }
              >
                <option value="">Select {attr}</option>
                {vals.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              –
            </button>
            <span>{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            disabled={!canBuy || loading}
            className={`w-full py-3 text-white font-semibold rounded ${
              canBuy
                ? 'bg-orange-600 hover:bg-orange-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Adding…' : canBuy ? 'Add to Cart' : 'Unavailable'}
          </button>
        </div>
      </div>
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
  const { data } = await client.query({
    query: gql`
      query GetProductBySlug($slug: ID!) {
        product(id: $slug, idType: SLUG) {
          id
          name
          slug
          sku
          shortDescription
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
          image {
            sourceUrl
            altText
          }
          productCategories {
            nodes {
              name
            }
          }

          ... on SimpleProduct {
            price: price(format: RAW)
            regularPrice: regularPrice(format: RAW)
            stockStatus
          }

          ... on VariableProduct {
            price: price(format: RAW)
            regularPrice: regularPrice(format: RAW)
            stockStatus
            variations {
              nodes {
                id
                name
                price: price(format: RAW)
                stockStatus
                image {
                  sourceUrl
                  altText
                }
                attributes {
                  nodes {
                    name
                    value
                  }
                }
              }
            }
          }

          ... on ExternalProduct {
            price: price(format: RAW)
            regularPrice: regularPrice(format: RAW)
          }
        }
      }
    `,
    variables: { slug: params.slug },
  })

  return {
    props: { product: data.product },
    revalidate: 60,
  }
}
