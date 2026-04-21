import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function Login() {
  const [loginVal, setLoginVal] = useState('')
  const [parolVal, setParolVal] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!loginVal || !parolVal) {
      setError("Login va parolni to'ldiring.")
      return
    }
    setLoading(true)
    setTimeout(() => {
      const result = login(loginVal, parolVal)
      setLoading(false)
      if (result.success) {
        navigate(`/${result.role}/dashboard`)
      } else {
        setError("Login yoki parol noto'g'ri.")
      }
    }, 600)
  }

  // ── Rang sxemasi ──
  // Light: fon #f1f3f9, karta oq
  // Dark:  fon #13151f, karta #1e2130
  const pageBg  = isDark ? 'bg-[#13151f]' : 'bg-[#f1f3f9]'
  const cardBg  = isDark ? 'bg-[#1e2130] border border-white/5' : 'bg-white border border-gray-100 shadow-lg'
  const inputCls = isDark
    ? 'bg-[#13151f] border border-white/8 text-gray-100 placeholder-gray-600 focus:border-indigo-500'
    : 'bg-[#f1f3f9] border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-indigo-400'

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${pageBg}`}>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-2 rounded-full transition-colors cursor-pointer ${
          isDark
            ? 'bg-white/5 text-yellow-400 hover:bg-white/10'
            : 'bg-white text-gray-500 hover:bg-gray-100 shadow-sm'
        }`}
      >
        {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
      </button>

      <div className="w-full max-w-4xl flex gap-6 items-center justify-center">

        {/* ── Chap panel — gradient ── */}
        <div
          className="hidden md:flex flex-col justify-end w-[420px] h-[480px] rounded-3xl overflow-hidden relative shrink-0"
          style={{ background: 'linear-gradient(145deg, #c7d2fe 0%, #a5b4fc 45%, #818cf8 100%)' }}
        >
          <div className="absolute top-8 left-8 right-8 z-10">
            <h2 className="text-2xl font-bold leading-snug text-gray-900">
              Raqamli boshqaruv tizimiga<br />xush kelibsiz
            </h2>
            <p className="mt-2 text-sm text-gray-700/80">
              Loyihalar, vazifalar va moliyani bitta platformada boshqaring
            </p>
          </div>
          <img
            src="/imgs/loginImg.png"
            alt="login illustration"
            className="w-full object-contain object-bottom"
          />
        </div>

        {/* ── O'ng panel — forma ── */}
        <div className={`w-full max-w-sm rounded-2xl p-8 transition-colors duration-300 ${cardBg}`}>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-7">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
              <img src="/imgs/Logo.png" alt="logo" className="w-5 h-5 object-contain" />
            </div>
            <span className={`font-semibold text-base ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
              Raqamli Nazorat
            </span>
          </div>

          <h1 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Kirish
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">

            {/* Login */}
            <input
              type="text"
              placeholder="Login"
              value={loginVal}
              onChange={e => { setLoginVal(e.target.value); setError('') }}
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${inputCls}`}
            />

            {/* Parol */}
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Parol"
                value={parolVal}
                onChange={e => { setParolVal(e.target.value); setError('') }}
                className={`w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all ${inputCls}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ${
                  isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {showPass ? <HiEyeOff size={18} /> : <HiEye size={18} />}
              </button>
            </div>

            {/* Xato */}
            {error && (
              <p className="text-red-400 text-xs leading-snug">{error}</p>
            )}

            {/* Kirish tugmasi */}
            <button
              type="submit"
              disabled={loading || !loginVal || !parolVal}
              className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 mt-1 ${
                loginVal && parolVal
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-sm shadow-indigo-500/30'
                  : isDark
                    ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Kirish...
                </span>
              ) : 'Kirish'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
