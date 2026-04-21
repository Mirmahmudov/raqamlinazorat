import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LuEye, LuEyeClosed } from 'react-icons/lu'

export default function Login() {
  const [loginVal, setLoginVal] = useState('')
  const [parolVal, setParolVal] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
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
        setError("Login yo'li yoki parol noto'g'ri kiritilgan. Iltimos, to'g'ri kiritilganiga ishonch hosil qiling.")
      }
    }, 600)
  }

  const filled = loginVal && parolVal

  return (
    <div className="min-h-screen flex items-center justify-center p-6 transition-colors duration-300 bg-[#f1f3f9] dark:bg-[#111111]">

      <div className="w-full max-w-[1000px] flex gap-8 items-center justify-center">

        {/* Left panel */}
        <div
          className="hidden md:flex flex-col justify-end w-[480px] h-[540px] rounded-3xl overflow-hidden relative shrink-0"
          style={{ background: 'linear-gradient(102.48deg, #E6ECFF -0.25%, #A5B4FC 35.75%, #526ED3 133.46%, #3B4DDB 154.89%, #1F2A7A 175.46%)' }}
        >
          <div className="absolute top-10 left-10 right-10 z-10">
            <h2 className="text-2xl font-bold leading-snug text-[#1a1a2e] dark:text-white">
              Raqamli boshqaruv tizimiga<br />xush kelibsiz
            </h2>
            <p className="mt-3 text-sm text-[rgba(30,30,60,0.7)] dark:text-white">
              Loyihalar, vazifalar va moliyani bitta platformada boshqaring
            </p>
          </div>
          <img
            src="/imgs/loginImg.png"
            alt="login illustration"
            className="w-full object-contain object-bottom"
          />
        </div>

        {/* Right panel — form */}
        <div className="w-full max-w-[420px] rounded-2xl p-10 transition-colors duration-300
          bg-white border border-black/6 shadow-[0_4px_32px_rgba(0,0,0,0.09)]
          dark:bg-[#2e2e2e] dark:border-[rgba(255,255,255,0.08)] dark:shadow-none">

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#526ED3] flex items-center justify-center shrink-0">
              <img src="/imgs/Logo.png" alt="logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="font-semibold text-base text-[#1a1a2e] dark:text-white">
              Raqamli Nazorat
            </span>
          </div>

          <h1 className="text-[26px] font-bold mb-7 text-gray-900 dark:text-white">
            Kirish
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Login input */}
            <input
              type="text"
              placeholder="Login"
              value={loginVal}
              onChange={e => { setLoginVal(e.target.value); setError('') }}
              className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-colors
                bg-[#f1f3f9] border border-gray-200 text-gray-900 placeholder-gray-400
                focus:border-indigo-400
                dark:bg-[#1a1a1a] dark:border-[rgba(255,255,255,0.12)] dark:text-white dark:placeholder-[#888]
                dark:focus:border-indigo-400"
            />

            {/* Parol input */}
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Parol"
                value={parolVal}
                onChange={e => { setParolVal(e.target.value); setError('') }}
                className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none transition-colors
                  bg-[#f1f3f9] border border-gray-200 text-gray-900 placeholder-gray-400
                  focus:border-indigo-400
                  dark:bg-[#1a1a1a] dark:border-[rgba(255,255,255,0.12)] dark:text-white dark:placeholder-[#888]
                  dark:focus:border-indigo-400"
              />
              {parolVal.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0 flex items-center
                    text-gray-400 hover:text-gray-600
                    dark:text-[#aaa] dark:hover:text-white"
                >
                  {showPass ? <LuEyeClosed size={20} /> : <LuEye size={20} />}
                </button>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm leading-snug text-[#FA5252]">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !filled}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm border-none transition-colors duration-200 mt-1
                ${filled
                  ? 'bg-[#3F57B3] text-white hover:bg-[#3449a0] cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed  dark:text-[#777] dark:bg-white'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
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
