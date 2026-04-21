import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { MdMenu } from 'react-icons/md'

const labelMap = {
  admin: 'Admin', menager: 'Menager', xodim: 'Xodim',
  dashboard: 'Dashboard', users: 'Foydalanuvchilar', roles: 'Rollar',
  projects: 'Loyihalar', payments: "To'lovlar", finance: 'Moliya',
  reports: 'Hisobotlar', messages: 'Xabarlar', settings: 'Sozlamalar',
  team: 'Jamoam', tasks: 'Vazifalar', calendar: 'Kalendar',
  salary: 'Maosh', archive: 'Arxiv', staff: 'Xodimlar', done: 'Bajarilgan',
}

function Breadcrumb() {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)

  return (
    <div className="flex items-center gap-1 text-sm">
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1
        const label = labelMap[part] || part
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-gray-300 dark:text-gray-600">›</span>
            )}
            <span className={isLast
              ? 'text-gray-700 font-medium dark:text-gray-200'
              : 'text-gray-400 dark:text-gray-500'
            }>
              {label}
            </span>
          </span>
        )
      })}
    </div>
  )
}

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f1f3f9] dark:bg-[#13151f]">
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center h-14 px-4 gap-3 border-b
          bg-white border-gray-100
          dark:bg-[#1a1d27] dark:border-white/5">
          <button
            onClick={() => setCollapsed(p => !p)}
            title={collapsed ? 'Sidebarni ochish' : 'Sidebarni yopish'}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer shrink-0
              text-gray-400 hover:bg-gray-100 hover:text-gray-700
              dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-100"
          >
            <MdMenu size={20} />
          </button>
          <Breadcrumb />
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
