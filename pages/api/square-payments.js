// pages/api/square-payments.js
import { v4 as uuidv4 } from 'uuid'
import { SquareClient, SquareEnvironment } from 'square'

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment:
    process.env.NODE_ENV === 'production'
      ? SquareEnvironment.Production
      : SquareEnvironment.Sandbox,
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { token, amount, buyerEmail } = req.body
  if (!token || amount == null) {
    return res.status(400).json({ error: 'Missing token or amount' })
  }

  try {
    // build the Square payment payload
    const paymentBody = {
      sourceId:       token,
      idempotencyKey: uuidv4(),
      amountMoney: {
        amount:   BigInt(Math.round(amount * 100)), // in cents
        currency: 'USD',
      },
      // ← use the secret env var here, not NEXT_PUBLIC_*
      locationId:        process.env.SQUARE_LOCATION_ID,
      buyerEmailAddress: buyerEmail,
    }

    // call Square
    const response = await client.payments.create(paymentBody)
    console.log('Square API response:', response)

    // extract the payment object (some SDK versions return response.payment)
    const payment =
      response.payment ??
      response.result?.payment

    if (!payment) {
      console.error('No payment found in response:', response)
      return res
        .status(502)
        .json({ error: 'Unexpected Square response: no payment data' })
    }

    // sanitize BigInt fields by converting to string
    const safePayment = {
      id:       payment.id,
      status:   payment.status,
      amount:   payment.amountMoney.amount.toString(),
      currency: payment.amountMoney.currency,
    }

    // return only the needed fields
    return res.status(200).json({
      success:       true,
      transactionId: payment.id,
      payment:       safePayment,
    })
  } catch (error) {
    console.error('Square API Error:', error)
    const detail =
      error?.errors?.map((e) => e.detail).join(', ') ||
      error.message ||
      'Unknown error'
    return res.status(500).json({ error: detail })
  }
}
