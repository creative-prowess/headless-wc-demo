import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import Layout from '@/components/Layout'
import { useCart } from '@/context/CartContext'
import { useState, useEffect } from 'react'
import { useToast } from '@/context/ToastContext'


export default function ProductPage({ product }) {
    const { addToCart } = useCart()
const { showToast } = useToast()

const variations = product?.variations?.nodes || []

// Create a map of attribute -> [values]
const attributeMap = {}
variations.forEach(variation => {
  variation.attributes?.nodes.forEach(attr => {
    if (!attributeMap[attr.name]) attributeMap[attr.name] = new Set()
    attributeMap[attr.name].add(attr.value)
  })
})

// Convert sets to arrays
Object.keys(attributeMap).forEach(key => {
  attributeMap[key] = Array.from(attributeMap[key])
})

const [selectedAttributes, setSelectedAttributes] = useState({})
const [selectedVariation, setSelectedVariation] = useState(null)
const [quantity, setQuantity] = useState(1)

useEffect(() => {
  if (variations.length && Object.keys(selectedAttributes).length === 0) {
    // Try to initialize default selection from the first variation
    const defaultVariation = variations[0]

    const defaultAttrs = {}
    defaultVariation.attributes.nodes.forEach(attr => {
      defaultAttrs[attr.name] = attr.value
    })

    setSelectedAttributes(defaultAttrs)
  }
}, [variations])

// Update variation whenever attributes change
useEffect(() => {
  const matched = variations.find(variation => {
    return variation.attributes.nodes.every(attr => {
      return selectedAttributes[attr.name] === attr.value
    })
  })
  setSelectedVariation(matched || null)
}, [selectedAttributes])


  if (!product) return <Layout><p>Product not found.</p></Layout>
const [loading, setLoading] = useState(false)

const { name, slug, image, price, sku, shortDescription, productCategories, seo = {} } = product;

  const { title, description, canonicalUrl } = seo


const handleAddToCart = () => {
  setLoading(true)



  const rawPrice = selectedVariation?.price || product?.price || '0'
const numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, '')) || 0

const itemToAdd = {
  ...selectedVariation || product,
  quantity,
  price: numericPrice,
  image: selectedVariation?.image?.sourceUrl || product?.image?.sourceUrl || '',
}


  addToCart({
    ...itemToAdd,
    quantity,
  })

  showToast(itemToAdd)

  setTimeout(() => {
    setLoading(false)
  }, 2000)
}

const currentStockStatus =
  selectedVariation?.stockStatus || product?.stockStatus || 'OUT_OF_STOCK'

const isPurchasable =
  !!(selectedVariation?.price || product?.price) &&
  currentStockStatus === 'IN_STOCK'

  return (
    <Layout>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <nav className="max-w-6xl mx-auto px-4">
          Home / {productCategories?.nodes?.[0]?.name || 'Category'} /{' '}
          <span className="text-black font-semibold">{name}</span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <img
            src={image?.sourceUrl}
            alt={image?.altText || name}
            className="w-full h-auto rounded-lg shadow"
          />

          {/* Tabs */}
          <div className="mt-8">
            <div className="border-b flex space-x-6 text-sm font-semibold">
              <button className="pb-2 border-b-2 border-orange-500 text-orange-600">Description</button>
            </div>
            <div className="mt-4 text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: shortDescription }} />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <h1 className="text-xl font-bold text-gray-900">{name}</h1>

{currentStockStatus === 'IN_STOCK' ? (
  <div className="text-green-600 text-sm font-medium">In Stock</div>
) : (
  <p className="text-sm text-red-600">This item is currently out of stock.</p>
)}

{Object.keys(attributeMap).map((attrName) => (
  <div key={attrName} className="mb-4">
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {attrName}
    </label>
    <select
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
      value={selectedAttributes[attrName] || ''}
      onChange={(e) =>
        setSelectedAttributes((prev) => ({
          ...prev,
          [attrName]: e.target.value,
        }))
      }
    >
      <option value="">Select {attrName}</option>
      {attributeMap[attrName].map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
))}


          <div className="text-gray-500 text-sm">SKU: {sku}</div>
          <div className="text-2xl font-semibold text-gray-900">{price}</div>

{isPurchasable && (
  <div className="flex items-center space-x-3">
    <button
      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
    >
      –
    </button>
    <span className="min-w-[2rem] text-center">{quantity}</span>
    <button
      onClick={() => setQuantity((q) => q + 1)}
      className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-lg font-bold"
    >
      +
    </button>
  </div>
)}


<button
  onClick={handleAddToCart}
  disabled={
    loading ||
    (variations.length > 0 && !selectedVariation) ||
    !isPurchasable
  }
  className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded ${
    loading || !isPurchasable ? 'opacity-50 cursor-not-allowed' : ''
  }`}
>
  {loading ? 'Adding…' : !isPurchasable ? 'Unavailable' : 'Add to cart'}
</button>

        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query GetAllProducts {
        products(first: 50) {
          nodes {
            slug
          }
        }
      }
    `,
  })

  const paths = data.products.nodes.map((product) => ({
    params: { slug: product.slug },
  }))

  return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const { data } = await client.query({
    query: gql`
     query GetProductBySlug($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    id
    name
    slug
    sku
    shortDescription
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
      price
      regularPrice
      stockStatus
 
    }
... on VariableProduct {
  price
  regularPrice
  stockStatus

  variations {
    nodes {
      id
      name
      price
      stockStatus
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
      price
      regularPrice
    }
  }
}
`,
    variables: { slug },
  })

  return {
    props: {
      product: data.product || null,
    },
    revalidate: 60,
  }
}