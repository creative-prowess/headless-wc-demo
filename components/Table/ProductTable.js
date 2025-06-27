'use client'

import { useState, useMemo,useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import ProductTableRow from './ProductTableRow'
import {
  CategoryDropdown,
  SortByPriceDropdown,
  SortByDateDropdown,
} from './ProductTableFilters'
import {Input } from '@headlessui/react';

const GET_PRODUCTS = gql`
query GetProducts(
  $first: Int!
  $after: String
  $orderby: [ProductsOrderbyInput]
  $search: String
  $category: String
) {
  products(
    first: $first
    after: $after
    where: {
      orderby: $orderby
      search: $search
      category: $category
    }
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    nodes {
      __typename
      id
      name
      sku
      image {
        sourceUrl
      }
      ... on SimpleProduct {
        price
        regularPrice
        stockStatus
        stockQuantity
        productCategories {
          nodes {
            name
          }
        }
      }
      ... on VariableProduct {
        price
        regularPrice
        stockStatus
        stockQuantity
        productCategories {
          nodes {
            name
          }
        }
        variations(first: 100) {
          nodes {
            price
            regularPrice
          }
        }
      }
      ... on GroupProduct {
        price
        regularPrice
        productCategories {
          nodes {
            name
          }
        }
      }
    }
  }
}
`

const GET_CATEGORIES = gql`
  query GetProductCategories {
    productCategories(first: 100) {
      nodes {
        id
        name
        slug
      }
    }
  }
`

export default function ProductTable() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [cursor, setCursor] = useState(null)
  const [sortByPrice, setSortByPrice] = useState('')
  const [sortByDate, setSortByDate] = useState('DATE_DESC')

useEffect(() => {
  setCursor(null)
}, [search, category, sortByPrice, sortByDate])

  const orderby = useMemo(() => {
    const orders = []
    if (sortByPrice) {
      const [field, direction] = sortByPrice.split('_')
      orders.push({ field: field.toUpperCase(), order: direction })
    }
    if (sortByDate) {
      const [field, direction] = sortByDate.split('_')
      orders.push({ field: field.toUpperCase(), order: direction })
    }
    return orders
  }, [sortByPrice, sortByDate])

const { data, loading, error } = useQuery(GET_PRODUCTS, {
  variables: {
    first: 8,
    after: cursor,
    orderby,
    search,
    category: category !== 'all' ? category : null,
  },
})
  const { data: catData } = useQuery(GET_CATEGORIES)
  const categoryOptions = useMemo(() => {
    return (catData?.productCategories?.nodes || [])
      .filter(cat => cat.name.toLowerCase() !== 'uncategorized')
      .map(cat => ({ label: cat.name, value: cat.name }))
  }, [catData])

  const products = data?.products?.nodes || []


  
  const pageInfo = data?.products?.pageInfo

  const handleNextPage = () => {
    if (pageInfo?.hasNextPage) {
      setCursor(pageInfo.endCursor)
    }
  }

  const normalizedProducts = useMemo(() => {
    return products.map(product => {
      return {
        id: product.id,
        name: product.name || 'Untitled',
        sku: product.sku || 'N/A',
        price: product.price || '',
        regular_price: product.regularPrice || '',
        image: product.image?.sourceUrl || 'https://secure.grannysnaturals.com/wp-content/uploads/woocommerce-placeholder.png',
        category: product.productCategories?.nodes?.[0]?.name || 'Uncategorized',
        views: product.metaData?.find((m) => m.key === 'views')?.value || 0,
        stock_status: product.stockStatus || 'UNKNOWN',
        stock_quantity: product.stockQuantity ?? 'N/A',
      }
    })
  }, [products])




  if (error) return <p>Error: {error.message}</p>

  return (
    <>
    <div className="grid grid-cols-5 gap-3">
    <CategoryDropdown value={category} onChange={setCategory} options={categoryOptions} />
<SortByPriceDropdown value={sortByPrice} onChange={setSortByPrice} />
<SortByDateDropdown value={sortByDate} onChange={setSortByDate} />
    <Input 
      type="text" 
      value={search} 
      onChange={(e) => setSearch(e.target.value)} 
      placeholder="Search products..." 
      className="search-input col-span-2 placeholder:text-darker dark:placeholder:text-white text-darker dark:text-white bg-white dark:bg-dark px-4 py-2 ring-1 ring-gray-700 rounded-md"
    />

</div>
      <table className="w-full text-left border-2 border-gray-200 dark:border-darker">
        <thead className="bg-gray-100 dark:bg-brand">
          <tr className="text-brand dark:text-white">
            <th className="p-4">Image</th>
            <th>Title</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
<tbody className="text-brand dark:text-white">
  {normalizedProducts.map((product, index) => (
    <ProductTableRow key={product.id} product={product} isFirstFewRows={index < 5}/>
  ))}
</tbody>
      </table>

      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded text-sm disabled:opacity-50"
          onClick={() => setCursor(null)}
          disabled={!cursor}
        >
          ← First Page
        </button>

        <div className="text-sm text-gray-600">
          {cursor ? 'Page 2+' : 'Page 1'}
        </div>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
          onClick={handleNextPage}
          disabled={!pageInfo?.hasNextPage}
        >
          Next Page →
        </button>
      </div>
    </>
  )
}
