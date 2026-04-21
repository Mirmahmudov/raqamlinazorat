import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

export default function AdminDashboard() {
  const { isDark } = useTheme()
  const { user } = useAuth()

  return (
    <div>
      <h1 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Xush kelibsiz, {user?.name} 👋
      </h1>
      <div className={`rounded-xl border ${isDark ? 'bg-[#0f1117] border-white/6 text-gray-500' : 'bg-white border-gray-100 text-gray-400'} flex items-center justify-center min-h-[60vh] text-sm`}>
        Dashboard tez orada tayyor bo'ladi
      </div>
    </div>
  )
}
