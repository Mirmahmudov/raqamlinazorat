import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

const labelMap = {
  admin: 'Admin', menager: 'Menager', xodim: 'Xodim',
  dashboard: 'Dashboard', users: 'Foydalanuvchilar', roles: 'Rollar',
  projects: 'Loyihalar', payments: "To'lovlar", finance: 'Moliya',
  reports: 'Hisobotlar', messages: 'Xabarlar', settings: 'Sozlamalar',
  team: 'Jamoam', tasks: 'Vazifalar', calendar: 'Kalendar',
  salary: 'Maosh', archive: 'Arxiv', staff: 'Xodimlar', done: 'Bajarilgan',
}

// Har bir route uchun topbar tugmasi konfiguratsiyasi
const routeActions = {
  '/admin/users': {
    label: "Qo'shish",
    onClick: () => alert("Yangi foydalanuvchi qo'shish"),
  },
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
            {i > 0 && <span className="text-gray-300 dark:text-gray-600">›</span>}
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

function TopbarAction() {
  const location = useLocation()
  const action = routeActions[location.pathname]
  if (!action) return null
  return (
    <button
      onClick={action.onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
        bg-[#3F57B3] text-white hover:bg-[#3449a0]"
    >
      <img src="/imgs/add-team.svg" alt="" className="w-4 h-4 brightness-0 invert" />
      {action.label}
    </button>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#F0F2FA] dark:bg-[#13151f]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-6 gap-3 border-b
          bg-white border-[#E8EAF2]
          dark:bg-[#1a1d27] dark:border-white/5">
          <Breadcrumb />
          <TopbarAction />
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
