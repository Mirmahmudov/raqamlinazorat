import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { usePageAction } from '../context/PageActionContext'

const labelMap = {
  admin: 'Autentifikatsiya', menager: 'Menager', xodim: 'Xodim',
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
              <span className="text-[#D0D5E2] dark:text-[#3A3B3B] mx-0.5">›</span>
            )}
            <span className={
              isLast
                ? 'text-[#1A1D2E] font-medium dark:text-[#FFFFFF]'
                : 'text-[#8F95A8] dark:text-[#C2C8E0]'
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
  const { action } = usePageAction()

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] dark:bg-[#191A1A]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-6 gap-3 border-b
          bg-[#F8F9FC] border-[#E2E6F2]
          dark:bg-[#191A1A] dark:border-[#292A2A]">
          <Breadcrumb />
          <div className="flex items-center gap-2">
            {action && (
              <button
                onClick={action.onClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer
                  bg-[#3F57B3] text-white hover:bg-[#526ED3]"
              >
                {action.icon && <span>{action.icon}</span>}
                {action.label}
              </button>
            )}
          </div>
        </header>
        <main className="flex-1 p-6 bg-[#F8F9FC] dark:bg-[#191A1A]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
