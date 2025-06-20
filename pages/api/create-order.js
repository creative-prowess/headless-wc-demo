import { Buffer } from 'buffer'
import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api'

const wcApi = new WooCommerceRestApi({
  url:            process.env.WC_REST_URL,
  consumerKey:    process.env.WC_REST_KEY,
  consumerSecret: process.env.WC_REST_SECRET,
  version:        'wc/v3',
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { cartItems, formData, paymentResult, transactionId } = req.body

  try {
    // 1) Lookup/Create customer
    let customerId = null
    const lookup = await wcApi.get('customers', { email: formData.email })
    if (Array.isArray(lookup.data) && lookup.data.length) {
      customerId = lookup.data[0].id
    } else {
      const createCust = await wcApi.post('customers', {
        email:      formData.email,
        first_name: formData.fullName.split(' ')[0] || '',
        last_name:  formData.fullName.split(' ').slice(1).join(' ') || '',
        billing: {
          address_1: formData.address,
          city:      formData.city,
          state:     formData.state,
          email:     formData.email,
        },
        shipping: {
          address_1: formData.address,
          city:      formData.city,
          state:     formData.state,
        },
      })
      customerId = createCust.data.id
    }

    // 2) Build line_items
    const line_items = cartItems.map((item) => {
      // decode GraphQL global ID if needed
      let productId
      if (item.databaseId) {
        productId = item.databaseId
      } else {
        const decoded = Buffer.from(item.id, 'base64').toString('utf8')
        productId = parseInt(decoded.split(':')[1], 10)
      }
      return {
        product_id: productId,
        quantity:   item.quantity,
      }
    })

    // 3) Build payload including transactionId in meta_data
    const orderPayload = {
      customer_id:          customerId,
      payment_method:       'square',
      payment_method_title: 'Square',
      set_paid:             Boolean(paymentResult.success),
      billing: {
        first_name: formData.fullName.split(' ')[0] || '',
        last_name:  formData.fullName.split(' ').slice(1).join(' ') || '',
        address_1:  formData.address,
        city:       formData.city,
        state:      formData.state,
        email:      formData.email,
      },
      shipping: {
        first_name: formData.fullName.split(' ')[0] || '',
        last_name:  formData.fullName.split(' ').slice(1).join(' ') || '',
        address_1:  formData.address,
        city:       formData.city,
        state:      formData.state,
      },
      line_items,
      meta_data: [
        {
          key:   'transaction_id',
          value: transactionId,
        },
      ],
    }

    // 4) Create order
const orderRes = await wcApi.post('orders?send_email=true', orderPayload)
    return res.status(200).json({ success: true, order: orderRes.data })
  } catch (err) {
    const wcErr = err.response?.data || err.message
    console.error('Create-order Error:', wcErr)
    return res
      .status(err.response?.status || 500)
      .json({ success: false, error: wcErr })
  }
}
