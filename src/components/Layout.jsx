import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { usePageAction } from '../context/PageActionContext'

const labelMap = {
  admin: 'Autentifikatsiya', menager: 'Menager', xodim: 'Xodim',
  dashboard: 'Dashboard', users: 'Foydalanuvchilar', roles: 'Rollar',
  projects: 'Loyihalar', payments: "Xarajat so'rovlari", finance: 'Ish haqi',
  history: 'Tarix',
  reports: 'Hisobotlar', messages: 'Xabarlar', settings: 'Sozlamalar',
  team: 'Jamoam', tasks: 'Vazifalar', calendar: 'Kalendar',
  salary: 'Maosh', archive: 'Arxiv', staff: 'Xodimlar', done: 'Bajarilgan',
}

function Breadcrumb() {
  const location = useLocation()
  const parts = location.pathname.split('/').filter(Boolean)
  return (
    <>
      {parts.map((part, i) => {
        const isLast = i === parts.length - 1
        const label  = labelMap[part] || part
        return (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && (
              <span className="text-[#D0D5E2] dark:text-[#3A3B3B] mx-0.5">›</span>
            )}
            <span
              className="text-[13px] font-medium"
              style={{ color: isLast ? '#5B6078' : '#5B6078' }}
            >
              {label}
            </span>
          </span>
        )
      })}
    </>
  )
}

export default function Layout() {
  const { action, breadcrumbExtra } = usePageAction()

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] dark:bg-[#191A1A]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Navbar ── */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 border-b
          bg-[#F8F9FC] border-[#EEF1F7]
          dark:bg-[#191A1A] dark:border-[#292A2A]">

          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-sm">
            <Breadcrumb />
            {breadcrumbExtra && (
              <>
                <span className="text-[#D0D5E2] dark:text-[#3A3B3B] mx-0.5">›</span>
                <span className="text-[13px] font-medium text-[#5B6078] dark:text-[#C2C8E0]">
                  {breadcrumbExtra}
                </span>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {action && (
              <button
                onClick={action.onClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors
                  bg-[#3F57B3] text-white hover:bg-[#526ED3]"
                style={{ fontSize: 13, fontWeight: 800 }}
              >
                {action.icon && <span>{action.icon}</span>}
                {action.label}
              </button>
            )}

            {/* Notification bell */}
            <button className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-colors
              bg-white border border-[#EEF1F7] hover:bg-[#F1F3F9]
              dark:bg-[#222323] dark:border-[#292A2A] dark:hover:bg-[#292A2A]">
              <img src="/imgs/notification.svg" alt="notification" className="w-4 h-4 dark:invert dark:opacity-60" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 bg-[#F8F9FC] dark:bg-[#191A1A]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
