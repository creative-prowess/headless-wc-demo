// pages/thank-you.js
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'

export default function ThankYou() {
  const { query } = useRouter()
  const txn = Array.isArray(query.txn) ? query.txn[0] : query.txn

  return (
    <Layout>
      <div className="max-w-xl mx-auto text-center py-20">
        <h1 className="text-3xl font-bold mb-4">
          Thank you for your order!
        </h1>
        {txn && (
          <p className="mb-2">
            Your transaction ID is <strong>{txn}</strong>.
          </p>
        )}
        <p className="mt-6">
          We’ve emailed your receipt. If you have any questions, reply to that email.
        </p>
      </div>
    </Layout>
  )
}
