import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  MdPeople, MdFolder, MdPayments, MdBarChart,
  MdSettings, MdLogout, MdAssignment, MdWork,
  MdExpandMore, MdExpandLess, MdMenu,
} from 'react-icons/md'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const menuByRole = {
  admin: [
    {
      label: 'Autentifikatsiya',
      icon: MdPeople,
      children: [
        { label: 'Foydalanuvchilar', path: '/admin/users' },
        { label: 'Rollar', path: '/admin/roles' },
      ],
    },
    {
      label: 'Loyihalar',
      icon: MdFolder,
      children: [
        { label: 'Barcha loyihalar', path: '/admin/projects' },
        { label: 'Arxiv', path: '/admin/projects/archive' },
      ],
    },
    {
      label: 'Moliya',
      icon: MdPayments,
      children: [
        { label: "To'lovlar", path: '/admin/payments' },
        { label: 'Hisoblar', path: '/admin/finance' },
      ],
    },
    {
      label: 'Hisobotlar',
      icon: MdBarChart,
      children: [
        { label: 'Umumiy', path: '/admin/reports' },
        { label: 'Xodimlar', path: '/admin/reports/staff' },
      ],
    },
  ],
  menager: [
    {
      label: 'Jamoam',
      icon: MdPeople,
      children: [
        { label: 'Xodimlar', path: '/menager/team' },
        { label: 'Vazifalar', path: '/menager/tasks' },
      ],
    },
    {
      label: 'Loyihalar',
      icon: MdFolder,
      children: [
        { label: 'Faol', path: '/menager/projects' },
        { label: 'Arxiv', path: '/menager/projects/archive' },
      ],
    },
    {
      label: 'Moliya',
      icon: MdPayments,
      children: [
        { label: 'Byudjet', path: '/menager/finance' },
      ],
    },
    {
      label: 'Hisobotlar',
      icon: MdBarChart,
      children: [
        { label: 'Kalendar', path: '/menager/calendar' },
        { label: 'Xabarlar', path: '/menager/messages' },
      ],
    },
  ],
  xodim: [
    {
      label: 'Vazifalarim',
      icon: MdAssignment,
      children: [
        { label: 'Joriy', path: '/xodim/tasks' },
        { label: 'Bajarilgan', path: '/xodim/tasks/done' },
      ],
    },
    {
      label: 'Loyihalar',
      icon: MdWork,
      children: [
        { label: 'Mening loyihalarim', path: '/xodim/projects' },
      ],
    },
    {
      label: 'Moliya',
      icon: MdPayments,
      children: [
        { label: 'Maosh', path: '/xodim/salary' },
      ],
    },
    {
      label: 'Hisobotlar',
      icon: MdBarChart,
      children: [
        { label: 'Faoliyat', path: '/xodim/reports' },
        { label: 'Kalendar', path: '/xodim/calendar' },
      ],
    },
  ],
}

export default function Sidebar({ collapsed }) {
  const { user, logout } = useAuth()
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [openGroups, setOpenGroups] = useState({ 0: true })
  const [mobileOpen, setMobileOpen] = useState(false)

  const menu = menuByRole[user?.role] || []

  const toggleGroup = (i) =>
    setOpenGroups(prev => ({ ...prev, [i]: !prev[i] }))

  const isGroupActive = (group) =>
    group.children?.some(c => location.pathname === c.path)

  const handleLogout = () => { logout(); navigate('/login') }
  const handleLogoClick = () => navigate(`/${user?.role}/dashboard`)

  const avatarBg =
    user?.role === 'admin'   ? 'bg-indigo-500' :
    user?.role === 'menager' ? 'bg-blue-500'   : 'bg-emerald-500'

  const Inner = () => (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Logo */}
      <div className="flex items-center h-14 border-b shrink-0 px-3 gap-2.5 border-gray-100 dark:border-white/5">
        <button
          onClick={handleLogoClick}
          title="Bosh sahifa"
          className="w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center shrink-0 transition-colors cursor-pointer"
        >
          <img src="/imgs/Logo.png" alt="logo" className="w-5 h-5 object-contain" />
        </button>
        {!collapsed && (
          <button
            onClick={handleLogoClick}
            className="font-semibold text-sm truncate flex-1 text-left cursor-pointer transition-colors text-[#1A1D2E] hover:text-indigo-600 dark:text-gray-100 dark:hover:text-indigo-400"
          >
            Raqamli Nazorat
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {menu.map((group, i) => {
          const active = isGroupActive(group)
          const open = openGroups[i]
          return (
            <div key={i}>
              <button
                onClick={() => toggleGroup(i)}
                title={collapsed ? group.label : undefined}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                  ${active
                    ? 'text-[#1A1D2E] dark:text-indigo-400'
                    : 'text-[#5B6078] hover:bg-indigo-50/60 hover:text-[#1A1D2E] dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-gray-100'
                  }`}
              >
                <group.icon size={18} className="shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{group.label}</span>
                    {open
                      ? <MdExpandLess size={15} className="shrink-0 opacity-40" />
                      : <MdExpandMore size={15} className="shrink-0 opacity-40" />
                    }
                  </>
                )}
              </button>

              {!collapsed && open && (
                <div className="ml-[30px] mt-0.5 mb-1 flex flex-col gap-0.5">
                  {group.children.map(child => (
                    <NavLink
                      key={child.path}
                      to={child.path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer
                        ${isActive
                          ? 'bg-indigo-50 text-[#1A1D2E] font-medium dark:bg-indigo-500/10 dark:text-indigo-300'
                          : 'text-[#5B6078] hover:bg-indigo-50/60 hover:text-[#1A1D2E] dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-gray-100'
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t px-2 py-2 space-y-0.5 shrink-0 border-gray-100 dark:border-white/5">

        {/* Settings */}
        <NavLink
          to={`/${user?.role}/settings`}
          title={collapsed ? 'Sozlamalar' : undefined}
          className={({ isActive }) =>
            `w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors cursor-pointer
            ${isActive
              ? 'text-[#1A1D2E] dark:text-indigo-400'
              : 'text-[#5B6078] hover:bg-indigo-50/60 hover:text-[#1A1D2E] dark:text-gray-500 dark:hover:bg-white/5 dark:hover:text-gray-100'
            }`
          }
        >
          <MdSettings size={18} className="shrink-0" />
          {!collapsed && <span>Sozlamalar</span>}
        </NavLink>

        {/* Logout */}
        <button
          onClick={handleLogout}
          title={collapsed ? 'Chiqish' : undefined}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors cursor-pointer
            text-red-400 hover:bg-red-50 hover:text-red-500
            dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
        >
          <MdLogout size={18} className="shrink-0" />
          {!collapsed && <span>Chiqish</span>}
        </button>

        {/* User */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors cursor-pointer mt-1
            hover:bg-indigo-50/60 dark:hover:bg-white/5"
        >
          <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold ${avatarBg}`}>
            {user?.name?.[0]}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate leading-tight text-[#1A1D2E] dark:text-gray-100">{user?.name}</p>
              <p className="text-xs truncate text-indigo-500 dark:text-indigo-400">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg shadow-md cursor-pointer transition-colors
          bg-white text-gray-600 hover:bg-gray-50
          dark:bg-[#1a1d27] dark:text-gray-300 dark:hover:bg-white/10"
      >
        <MdMenu size={20} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50 w-[220px] h-full shadow-2xl border-r bg-white border-gray-100 dark:bg-[#1a1d27] dark:border-white/5">
            <Inner />
          </div>
        </div>
      )}

      {/* Desktop */}
      <aside className={`hidden md:block h-screen sticky top-0 shrink-0 border-r overflow-hidden transition-[width] duration-300
        bg-white border-gray-100 dark:bg-[#1a1d27] dark:border-white/5
        ${collapsed ? 'w-[60px]' : 'w-[220px]'}`}>
        <Inner />
      </aside>
    </>
  )
}
