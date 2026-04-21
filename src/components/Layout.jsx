import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useTheme } from '../context/ThemeContext'
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
  const { isDark } = useTheme()
  const parts = location.pathname.split('/').filter(Boolean)

  return (
    <div className="flex items-center gap-1 text-sm">
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1
        const label = labelMap[part] || part
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <span className={isDark ? 'text-gray-600' : 'text-gray-300'}>›</span>
            )}
            <span className={
              isLast
                ? isDark ? 'text-gray-200 font-medium' : 'text-gray-700 font-medium'
                : isDark ? 'text-gray-500' : 'text-gray-400'
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
  const { isDark } = useTheme()
  const [collapsed, setCollapsed] = useState(false)

  // Light: oq topbar, #f1f3f9 content fon
  // Dark:  #1a1d27 topbar, #13151f content fon
  const topbarBg  = isDark ? 'bg-[#1a1d27] border-white/5' : 'bg-white border-gray-100'
  const contentBg = isDark ? 'bg-[#13151f]' : 'bg-[#f1f3f9]'

  return (
    <div className={`flex min-h-screen ${contentBg}`}>
      <Sidebar collapsed={collapsed} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className={`sticky top-0 z-30 flex items-center h-14 px-4 gap-3 border-b ${topbarBg}`}>
          <button
            onClick={() => setCollapsed(p => !p)}
            title={collapsed ? 'Sidebarni ochish' : 'Sidebarni yopish'}
            className={`hidden md:flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer shrink-0 ${
              isDark
                ? 'text-gray-400 hover:bg-white/5 hover:text-gray-100'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'
            }`}
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
