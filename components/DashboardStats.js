// components/DashboardStats.js
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

const StatCard = ({ label, value }) => (
  <div className="bg-white dark:bg-darker rounded shadow-sm p-5 flex justify-between items-center w-full max-w-[250px]">
    <div>
      <p className="text-sm text-gray-500 dark:text-white font-semibold">{label}</p>
      <p className="text-xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
    <div className="w-10 h-10 rounded-full bg-blue-200 dark:bg-bluedark flex items-center justify-center">
      💰
    </div>
  </div>
)

export default function DashboardStats() {
  const { data, error } = useSWR('/api/dashboard-stats', fetcher)

  if (error) return <div>Error loading stats</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className="flex gap-4 flex-wrap mb-10">
      <StatCard label="Total Sales" value={data.totalSalesCount} />
      <StatCard
        label="Total Sales Amount"
        value={`$${data.totalSalesAmount.toFixed(2)}`}
      />
<StatCard
  label="Total Sales Amount"
  value={`$${Number(data.totalSalesAmount || 0).toFixed(2)}`}
/>

<StatCard
  label="Today's Sales"
  value={`$${Number(data.todaySalesAmount || 0).toFixed(2)}`}
/>
    </div>
  )
}
