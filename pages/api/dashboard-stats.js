import axios from 'axios'

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      `${process.env.WC_REST_URL}/wp-json/wc/v3/orders`,
      {
        auth: {
          username: process.env.WC_REST_KEY,
          password: process.env.WC_REST_SECRET,
        },
      }
    )

    const orders = response.data || []

    const totalSalesCount = orders.length

    const totalSalesAmount = orders.reduce(
      (sum, order) => sum + parseFloat(order.total),
      0
    )

    const today = new Date().toISOString().split('T')[0]
    const todaySalesAmount = orders
      .filter((order) => order.date_created.startsWith(today))
      .reduce((sum, order) => sum + parseFloat(order.total), 0)

    res.status(200).json({
      totalSalesCount,
      totalSalesAmount,
      todaySalesAmount,
      totalProductViews: 0, // Placeholder
    })
  } catch (err) {
    console.error('REST API Error:', err.message)
    res.status(500).json({ error: 'Failed to fetch dashboard stats' })
  }
}
