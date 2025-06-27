import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import ProductForm from '@/components/Form/ProductForm'
import ProductTable from '@/components/Table/ProductTable'
import DashboardStats from '@/components/DashboardStats'
import LoginModal from '@/components/LoginForm'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const section = router.query.section || 'dashboard'


  useEffect(() => {
    if (session) {
      console.log('Logged in as:', session.user.email)
    }
  }, [session])

  // If still loading auth state
  if (status === 'loading') return null

  // Check if user is admin
  const isAdmin = session?.user?.role === 'administrator'

  if (!session || !isAdmin) {
    return <LoginModal isOpen={true} onClose={() => router.push('/')} />
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-10 p-6 md:p-10">
        {section !== 'products' && <DashboardStats />}
        {section === 'products' && (
          <>
            <ProductForm />
            <ProductTable />
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
