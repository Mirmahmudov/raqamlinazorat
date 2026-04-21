import { useTheme } from '../context/ThemeContext'
import { MdConstruction } from 'react-icons/md'

export default function PlaceholderPage({ title }) {
  const { isDark } = useTheme()
  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] rounded-2xl ${isDark ? 'bg-gray-900 border border-gray-800' : 'bg-white border border-gray-100 shadow-sm'}`}>
      <MdConstruction size={48} className={isDark ? 'text-gray-600' : 'text-gray-300'} />
      <h2 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{title}</h2>
      <p className={`mt-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Bu sahifa tez orada tayyor bo'ladi</p>
    </div>
  )
}
