import { useRouter } from 'next/router'
import DashboardLayout from '@/components/Layout/DashboardLayout'
import ProductForm from '@/components/Form/ProductForm'
import ProductTable from '@/components/Table/ProductTable'
import DashboardStats from '@/components/DashboardStats'

export default function DashboardPage() {
  const router = useRouter()
  const section = router.query.section || 'dashboard'

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
