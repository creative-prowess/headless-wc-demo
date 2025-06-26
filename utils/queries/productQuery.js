// utils/queries/productsQuery.js
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts($first: Int = 10, $after: String, $orderBy: ProductsOrderByEnum = DATE, $order: OrderEnum = DESC) {
    products(first: $first, after: $after, where: {orderby: {field: $orderBy, order: $order}}) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        databaseId
        name
        slug
        sku
        price(format: RAW)
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
          regularPrice
          salePrice
        }
      }
    }
  }
`;
