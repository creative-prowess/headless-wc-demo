// components/Layout/Sidebar.js
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaHome, FaShoppingCart, FaUser, FaChartPie, FaMoneyCheckAlt } from 'react-icons/fa'

const navItems = [
  { label: 'Dashboard', icon: <FaHome />, section: 'dashboard' },
  { label: 'Products', icon: <FaShoppingCart />, section: 'products' },
]

const accountPages = [
  { label: 'Profile', icon: <FaUser />, section: 'profile' },
  { label: 'Reports', icon: <FaChartPie />, section: 'reports' },
  { label: 'Billing', icon: <FaMoneyCheckAlt />, section: 'billing' },
]

export default function Sidebar() {
  const router = useRouter()
  const currentSection = router.query.section || 'dashboard'

  const NavLink = ({ label, icon, section }) => {
    const isActive = currentSection === section
    return (
      <Link
        href={`?section=${section}`}
        scroll={false}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-semibold
          ${isActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-white'}`}
      >
        <span className="text-lg">{icon}</span>
        {label}
      </Link>
    )
  }

  return (
    <aside className="w-[250px] min-h-screen bg-gray-100 border-r px-4 py-6 hidden md:flex flex-col gap-6">
      <div className="text-lg font-bold px-2">Vendor Dashboard</div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink key={item.section} {...item} />
        ))}
      </nav>

      <div className="mt-4 text-xs uppercase tracking-wide text-gray-500 font-semibold px-2">
        Account Pages
      </div>
      <nav className="flex flex-col gap-2">
        {accountPages.map((item) => (
          <NavLink key={item.section} {...item} />
        ))}
      </nav>
    </aside>
  )
}
