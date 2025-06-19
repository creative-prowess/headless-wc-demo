import axios from 'axios';

const woocommerceClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WC_API_URL,
  auth: {
    username: process.env.NEXT_PUBLIC_WC_CONSUMER_KEY,
    password: process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export default woocommerceClient;

