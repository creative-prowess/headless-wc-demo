// utils/woocommerce.js
import axios from 'axios'

if (!process.env.NEXT_PUBLIC_WC_CONSUMER_KEY || !process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET) {
  throw new Error('Missing WC API credentials')
}

export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_WP_URL + '/wp-json/wc/v3',
  auth: {
    username: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
    password: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  },
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
})

