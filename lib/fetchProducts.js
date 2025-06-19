import woocommerceClient from '@/lib/woocommerceClient';

export async function fetchProducts() {
  try {
    const { data } = await woocommerceClient.get('/products');
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}