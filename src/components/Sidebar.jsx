import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { MdExpandMore, MdExpandLess, MdSettings } from 'react-icons/md'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  IconUserGroup, IconFolder, IconBriefcaseDollar,
  IconAnalytics, IconSidebarLeft,
} from './icons'

const menuByRole = {
  admin: [
    {
      label: 'Autentifikatsiya', icon: IconUserGroup,
      children: [
        { label: 'Foydalanuvchilar', path: '/admin/users' },
      ],
    },
    {
      label: 'Loyihalar', icon: IconFolder,
      children: [
        { label: 'Barcha loyihalar', path: '/admin/projects' },
        { label: 'Arxiv', path: '/admin/projects/archive' },
      ],
    },
    {
      label: 'Moliya', icon: IconBriefcaseDollar,
      children: [
        { label: "To'lovlar", path: '/admin/payments' },
        { label: 'Hisoblar', path: '/admin/finance' },
      ],
    },
    {
      label: 'Hisobotlar', icon: IconAnalytics,
      children: [
        { label: 'Umumiy', path: '/admin/reports' },
        { label: 'Xodimlar', path: '/admin/reports/staff' },
      ],
    },
  ],
  menager: [
    {
      label: 'Jamoam', icon: IconUserGroup,
      children: [
        { label: 'Xodimlar', path: '/menager/team' },
        { label: 'Vazifalar', path: '/menager/tasks' },
      ],
    },
    {
      label: 'Loyihalar', icon: IconFolder,
      children: [
        { label: 'Faol', path: '/menager/projects' },
        { label: 'Arxiv', path: '/menager/projects/archive' },
      ],
    },
    {
      label: 'Moliya', icon: IconBriefcaseDollar,
      children: [{ label: 'Byudjet', path: '/menager/finance' }],
    },
    {
      label: 'Hisobotlar', icon: IconAnalytics,
      children: [
        { label: 'Kalendar', path: '/menager/calendar' },
        { label: 'Xabarlar', path: '/menager/messages' },
      ],
    },
  ],
  xodim: [
    {
      label: 'Vazifalarim', icon: IconUserGroup,
      children: [
        { label: 'Joriy', path: '/xodim/tasks' },
        { label: 'Bajarilgan', path: '/xodim/tasks/done' },
      ],
    },
    {
      label: 'Loyihalar', icon: IconFolder,
      children: [{ label: 'Mening loyihalarim', path: '/xodim/projects' }],
    },
    {
      label: 'Moliya', icon: IconBriefcaseDollar,
      children: [{ label: 'Maosh', path: '/xodim/salary' }],
    },
    {
      label: 'Hisobotlar', icon: IconAnalytics,
      children: [
        { label: 'Faoliyat', path: '/xodim/reports' },
        { label: 'Kalendar', path: '/xodim/calendar' },
      ],
    },
  ],
}

const avatarColor = {
  admin: 'bg-[#526ED3]',
  menager: 'bg-[#526ED3]',
  xodim: 'bg-[#526ED3]',
}

export default function Sidebar() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [openGroups, setOpenGroups] = useState({ 0: true })

  const menu = menuByRole[user?.role] || []
  const avatarBg = avatarColor[user?.role] || 'bg-[#526ED3]'

  const toggleGroup = (i) => setOpenGroups(prev => ({ ...prev, [i]: !prev[i] }))
  const isGroupActive = (group) => group.children?.some(c => location.pathname === c.path)
  const handleDashboard = () => navigate(`/${user?.role}/dashboard`)

  // Light: text-sub #5B6078, hover bg-elevation-2-alt #E9ECF5
  // Dark:  text-sub #8E95B5, hover bg-elevation-1-alt #222323
  const itemBase = [
    'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer',
    'text-[#5A5F76] hover:bg-[#E9ECF5] hover:text-[#1A1D2E]',
    'dark:text-[#C2C8E0] dark:hover:bg-[#292A2A] dark:hover:text-[#FFFFFF]',
  ].join(' ')

  // active: #E9ECF5, text-strong #1A1D2E
  const itemActive = 'bg-[#E9ECF5] !text-[#1A1D2E] dark:bg-[#292A2A] dark:!text-[#FFFFFF]'

  return (
    <aside
      className={[
        'hidden md:flex flex-col h-screen sticky top-0 shrink-0 border-r overflow-hidden transition-[width] duration-300',
        // Light: bg #F1F3F9, border #E9ECF5
        // Dark:  bg #222323, border #292A2A
        'bg-[#F1F3F9] border-[#E9ECF5] dark:bg-[#222323] dark:border-[#292A2A]',
        collapsed ? 'w-[52px] cursor-pointer' : 'w-[220px]',
      ].join(' ')}
      onClick={() => collapsed && setCollapsed(false)}
    >

      {/* ── Logo ── */}
      <div
        className="flex items-center justify-center h-14 border-b border-[#E9ECF5] dark:border-[#292A2A] shrink-0 px-3"
        onClick={e => !collapsed && e.stopPropagation()}
      >
        {collapsed ? (
          <button onClick={handleDashboard} className="cursor-pointer hover:opacity-80 transition-opacity">
            <img src="/imgs/Logo.png" alt="logo" className="w-7 h-7 object-contain" />
          </button>
        ) : (
          <>
            <button onClick={handleDashboard} className="flex items-center gap-2 flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 rounded-lg bg-[#526ED3] flex items-center justify-center shrink-0">
                <img src="/imgs/Logo.png" alt="logo" className="w-5 h-5 object-contain" />
              </div>
              <span className="font-semibold text-sm truncate text-[#1A1D2E] dark:text-[#FFFFFF]">
                Raqamli Nazorat
              </span>
            </button>
            <button
              onClick={() => setCollapsed(true)}
              className="ml-1 flex items-center justify-center w-7 h-7 rounded-md transition-colors cursor-pointer shrink-0
                text-[#5A5F76] hover:bg-[#E9ECF5] hover:text-[#1A1D2E]
                dark:text-[#C2C8E0] dark:hover:bg-[#292A2A] dark:hover:text-[#FFFFFF]"
            >
              <IconSidebarLeft size={18} />
            </button>
          </>
        )}
      </div>

      {/* ── Nav ── */}
      <nav
        className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5"
        onClick={e => !collapsed && e.stopPropagation()}
      >
        {menu.map((group, i) => {
          const active = isGroupActive(group)
          const open = openGroups[i]
          const Icon = group.icon
          return (
            <div key={i}>
              <button
                onClick={() => !collapsed && toggleGroup(i)}
                title={collapsed ? group.label : undefined}
                className={`${itemBase} ${active ? itemActive : ''}`}
              >
                <Icon size={18} className="shrink-0" />
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
                      className={({ isActive }) =>
                        `block px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-[#E9ECF5] text-[#1A1D2E] font-medium dark:bg-[#292A2A] dark:text-[#FFFFFF]'
                            : 'text-[#5A5F76] hover:bg-[#E9ECF5] hover:text-[#1A1D2E] dark:text-[#C2C8E0] dark:hover:bg-[#292A2A] dark:hover:text-[#FFFFFF]'
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

      {/* ── Bottom ── */}
      <div
        className="border-t px-2 py-2 space-y-0.5 shrink-0 border-[#E9ECF5] dark:border-[#292A2A]"
        onClick={e => !collapsed && e.stopPropagation()}
      >
        <NavLink
          to={`/${user?.role}/settings`}
          title={collapsed ? 'Sozlamalar' : undefined}
          className={({ isActive }) => `${itemBase} ${isActive ? itemActive : ''}`}
        >
          <MdSettings size={18} className="shrink-0" />
          {!collapsed && <span>Sozlamalar</span>}
        </NavLink>

        {/* Account */}
        <div
          onClick={handleDashboard}
          title={collapsed ? `${user?.name} (${user?.role})` : undefined}
          className="flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors cursor-pointer mt-1
            hover:bg-[#E9ECF5] dark:hover:bg-[#292A2A]"
        >
          <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold ${avatarBg}`}>
            {user?.name?.[0]}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate leading-tight text-[#1A1D2E] dark:text-[#FFFFFF]">{user?.name}</p>
              <p className="text-xs truncate text-[#526ED3] dark:text-[#7F95E6]">{user?.role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}




