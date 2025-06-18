// pages/api/woocommerce-test.js
import woocommerce from '@/lib/woocommerceClient';

export default async function handler(req, res) {
  try {
    const response = await woocommerce.get('products');
    res.status(200).json(response.data);
  } catch (error) {
    console.error('WooCommerce API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
