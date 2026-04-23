import { useState, useEffect, useRef } from 'react'
import { MdArrowForward, MdDelete, MdExpandMore, MdCheck } from 'react-icons/md'
import { FaCamera, FaArrowLeft } from 'react-icons/fa'
import { FaXmark, FaTrash, FaFileLines } from 'react-icons/fa6'
import { FiGithub } from 'react-icons/fi'
import { CiLinkedin } from 'react-icons/ci'
import { PiTelegramLogo } from 'react-icons/pi'
import { usePageAction } from '../../context/PageActionContext'

const VILOYATLAR = ['Toshkent', 'Samarqand', 'Buxoro', 'Andijon', "Farg'ona", 'Namangan', 'Qashqadaryo', 'Surxondaryo', 'Xorazm', 'Navoiy', 'Jizzax', 'Sirdaryo', "Qoraqalpog'iston"]
const TUMANLAR  = ["Yunusobod", 'Chilonzor', "Mirzo Ulug'bek", 'Shayxontohur', 'Uchtepa', 'Yakkasaroy', 'Olmazar', 'Bektemir', 'Sergeli', 'Yashnobod']
const LAVOZIMLAR  = ['Admin', 'Menejer', 'Bugalter', 'Tester', 'Dasturchi', 'Dizayner']
const ROLLAR_LIST = ['Dasturchi', 'Dizayner', 'Analitik', 'Xisobchi', 'Menejer', 'Tester']

const USERS_DATA = [
  { id: 1,  name: 'Doston Dostonov Dostonovich', position: 'Bosh administrator',    role: 'Dasturchi',             salary: 10000000,  balance: 200000000, active: true,  viloyat: 'Toshkent', tuman: 'Yunusobod',   passportSeria: 'AA', passportRaqam: '1234567' },
  { id: 2,  name: 'Alyona Sokolova',             position: 'Senior Developer',       role: 'Programmer',            salary: 8500000,   balance: 150000000, active: true,  viloyat: 'Samarqand', tuman: 'Chilonzor',  passportSeria: 'AB', passportRaqam: '2345678' },
  { id: 3,  name: 'Timur Akhmedov',              position: 'Project Manager',        role: 'Team Lead',             salary: 12000000,  balance: 250000000, active: false, viloyat: 'Buxoro',   tuman: 'Olmazar',     passportSeria: 'AC', passportRaqam: '3456789' },
  { id: 4,  name: 'Irina Petrovna',              position: 'UI/UX Designer',         role: 'Designer',              salary: 9750000,   balance: 170000000, active: true,  viloyat: 'Andijon',  tuman: 'Bektemir',    passportSeria: 'AD', passportRaqam: '4567890' },
  { id: 5,  name: 'Sergei Ivanovich',            position: 'Database Administrator', role: 'Data Specialist',       salary: 11200000,  balance: 220000000, active: true,  viloyat: 'Toshkent', tuman: 'Sergeli',     passportSeria: 'AE', passportRaqam: '5678901' },
  { id: 6,  name: 'Natalia Fedorova',            position: 'Frontend Developer',     role: 'Developer',             salary: 7800000,   balance: 130000000, active: false, viloyat: 'Namangan', tuman: 'Yashnobod',   passportSeria: 'AF', passportRaqam: '6789012' },
  { id: 7,  name: 'Vladimir Smirnov',            position: 'Backend Developer',      role: 'Engineer',              salary: 10500000,  balance: 190000000, active: true,  viloyat: 'Toshkent', tuman: 'Uchtepa',     passportSeria: 'AG', passportRaqam: '7890123' },
  { id: 8,  name: 'Ekaterina Vasilievna',        position: 'QA Engineer',            role: 'Tester',                salary: 9200000,   balance: 160000000, active: true,  viloyat: 'Toshkent', tuman: 'Yakkasaroy',  passportSeria: 'AH', passportRaqam: '8901234' },
  { id: 9,  name: 'Andrei Sergeyevich',          position: 'DevOps Engineer',        role: 'Operations Specialist', salary: 11800000,  balance: 210000000, active: false, viloyat: 'Samarqand', tuman: 'Chilonzor', passportSeria: 'AI', passportRaqam: '9012345' },
  { id: 10, name: 'Olga Dmitrievna',             position: 'Marketing Specialist',   role: 'Strategist',            salary: 9300000,   balance: 175000000, active: true,  viloyat: 'Buxoro',   tuman: 'Olmazar',     passportSeria: 'AJ', passportRaqam: '0123456' },
  { id: 11, name: 'Mikhail Borisov',             position: 'Systems Analyst',        role: 'Analyst',               salary: 8000000,   balance: 140000000, active: false, viloyat: 'Toshkent', tuman: 'Yunusobod',   passportSeria: 'AK', passportRaqam: '1234560' },
  { id: 12, name: 'Doston Ochilov',              position: 'Administrator',          role: 'Developer',             salary: 12000000,  balance: 220000000, active: true,  viloyat: 'Toshkent', tuman: 'Sergeli',     passportSeria: 'AL', passportRaqam: '2345601' },
]

const ALL_POSITIONS = ['Barcha lavozimlar', ...new Set(USERS_DATA.map(u => u.position))]
const ALL_ROLES     = ['Barcha rollar',     ...new Set(USERS_DATA.map(u => u.role))]
const SORTS         = ['A dan Z gacha', 'Z dan A gacha', 'Yangi → Eski', 'Eski → Yangi']

function fmt(n) {
  return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/* ── Custom Filter Dropdown ── */
function FilterSelect({ options, value, onChange, label }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const display = value || label || options[0]

  return (
    <div className="relative" ref={ref}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 cursor-pointer transition-colors
          bg-white border border-[#E2E6F2] text-[#1A1D2E]
          dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF]"
        style={{ fontSize: 13, fontWeight: 500, padding: '6px 12px', borderRadius: 12, minWidth: 140 }}
      >
        <span className="flex-1 text-left truncate">{display}</span>
        <MdExpandMore
          size={16}
          className={`shrink-0 text-[#8F95A8] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-50 rounded-2xl shadow-xl overflow-hidden
            bg-white dark:bg-[#222323]"
          style={{
            border: '1px solid #EEF1F7',
            padding: '6px 8px',
            width: 250,
            animation: 'dropdownIn 0.18s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false) }}
              className="w-full text-left px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: '#1A1D2E',
                background: value === opt ? '#F1F3F9' : 'transparent',
              }}
              onMouseEnter={e => { if (value !== opt) e.currentTarget.style.background = '#F8F9FC' }}
              onMouseLeave={e => { if (value !== opt) e.currentTarget.style.background = 'transparent' }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
/* ── Dropdown alias (UserDetail ichida ishlatiladi) ── */
const Dropdown = FilterSelect

/* ── Add User Modal ── */
const EMPTY_FORM = { name: '', password: '', salary: '', viloyat: '', tuman: '', passportSeria: '', passportRaqam: '', lavozim: '', rol: '', avatar: null, github: '', linkedin: '', telegram: '' }

function AddUserModal({ onClose, onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const fileRef = useRef(null)
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    set('avatar', file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    if (!form.name.trim()) return
    onAdd({ id: Date.now(), name: form.name, position: form.lavozim || "Noma'lum", role: form.rol || "Noma'lum", salary: parseFloat(form.salary) || 0, balance: 0, active: true, viloyat: form.viloyat, tuman: form.tuman, passportSeria: form.passportSeria, passportRaqam: form.passportRaqam })
    onClose()
  }

  const inputCls = `w-full px-3 py-2.5 rounded-lg text-sm outline-none border transition-colors
    bg-white border-[#E2E6F2] text-[#1A1D2E] placeholder-[#B6BCCB] focus:border-[#526ED3]
    dark:bg-[#191A1A] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:placeholder-[#8E95B5]`
  const labelCls = 'block text-xs font-medium text-[#5B6078] dark:text-[#C2C8E0] mb-1'

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto modal-scroll py-8 px-4">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <button onClick={onClose} className="fixed top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors bg-white/20 text-white hover:bg-white/30">
        <FaXmark size={16} />
      </button>
      <div className="relative w-full max-w-[600px] rounded-2xl shadow-2xl bg-white dark:bg-[#222323]">
        <div className="px-7 pt-7 pb-5">
          <div className="flex items-start gap-3">
            <button onClick={onClose} className="mt-1 text-[#1A1D2E] dark:text-[#FFFFFF] hover:opacity-70 cursor-pointer shrink-0">
              <FaArrowLeft size={18} />
            </button>
            <div>
              <h2
                className="text-[#1A1D2E] dark:text-[#FFFFFF]"
                style={{ fontSize: 20, fontWeight: 800 }}
              >Yangi xodim qo'shish</h2>
              <p className="text-sm text-[#8F95A8] dark:text-[#C2C8E0] mt-1">Yangi xodimni tizimga qo'shing va unga tegishli rol hamda maoshni belgilang</p>
            </div>
          </div>
        </div>
        <div className="px-7 pb-2 flex flex-col gap-4">
          <div>
            <label className={labelCls}>Ism Sharifi</label>
            <input className={inputCls} placeholder="F.I.O" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Parol</label>
              <input className={inputCls} type="password" placeholder="Parol" value={form.password} onChange={e => set('password', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Oylik maosh (UZS)</label>
              <input className={inputCls} type="number" placeholder="0.0" value={form.salary} onChange={e => set('salary', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Viloyat</label>
              <select value={form.viloyat} onChange={e => set('viloyat', e.target.value)} className={inputCls + ' cursor-pointer'}>
                <option value="">Viloyatni tanlang</option>
                {VILOYATLAR.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tuman</label>
              <select value={form.tuman} onChange={e => set('tuman', e.target.value)} className={inputCls + ' cursor-pointer'}>
                <option value="">Tuman tanlang</option>
                {TUMANLAR.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Passport ma'lumotlari</label>
              <div className="flex gap-2">
                <input
                  className={inputCls}
                  placeholder="AA"
                  maxLength={2}
                  value={form.passportSeria}
                  onChange={e => set('passportSeria', e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 2))}
                  style={{ width: 64 }}
                />
                <input
                  className={inputCls}
                  placeholder="1234567"
                  maxLength={7}
                  value={form.passportRaqam}
                  onChange={e => set('passportRaqam', e.target.value.replace(/\D/g, '').slice(0, 7))}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Passport rasmi</label>
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-full h-[42px] rounded-lg border border-dashed flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm
                  border-[#D0D5E2] bg-white text-[#8F95A8] hover:bg-[#F8F9FC]
                  dark:border-[#292A2A] dark:bg-[#191A1A] dark:text-[#8E95B5] dark:hover:bg-[#292A2A]">
                <FaFileLines size={14} />
                Fayl yuklash
              </button>
            </div>
          </div>
          <div>
            <label className={labelCls}>Avatar yuklash</label>
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-[80px] h-[80px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors shrink-0
                  border-[#D0D5E2] bg-[#F8F9FC] hover:bg-[#F1F3F9]
                  dark:border-[#292A2A] dark:bg-[#191A1A] dark:hover:bg-[#292A2A]">
                {avatarPreview
                  ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover rounded-xl" />
                  : <><FaCamera size={18} className="text-[#B6BCCB] dark:text-[#8E95B5]" /><span className="text-[10px] text-[#B6BCCB] dark:text-[#8E95B5] text-center leading-tight">Rasm yuklash</span></>
                }
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span className="text-sm font-semibold text-[#1A1D2E] dark:text-[#FFFFFF] shrink-0">Lavozimi</span>
                  <div className="w-[120px]">
                    <Dropdown label="Tanlash" options={LAVOZIMLAR} value={form.lavozim} onChange={v => set('lavozim', v)} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-sm font-semibold text-[#1A1D2E] dark:text-[#FFFFFF] shrink-0">Roli</span>
                  <div className="w-[120px]">
                    <Dropdown label="Tanlash" options={ROLLAR_LIST} value={form.rol} onChange={v => set('rol', v)} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: 'github',   label: 'GitHub',   Icon: FiGithub,      placeholder: 'Github havola yuklang'   },
              { key: 'linkedin', label: 'Linkedin',  Icon: CiLinkedin,    placeholder: 'Linkedin havola yuklang' },
              { key: 'telegram', label: 'Telegram',  Icon: PiTelegramLogo, placeholder: 'Telegram havola yuklang' },
            ].map(({ key, label, Icon, placeholder }) => (
              <div key={key}>
                <label className={labelCls + ' flex items-center gap-1.5'}>
                  {label} <Icon size={14} className="text-[#5B6078] dark:text-[#C2C8E0]" />
                </label>
                <input
                  className={inputCls}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => set(key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="px-7 py-5 flex items-center justify-end gap-3">
          <button onClick={onClose} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer text-[#5B6078] hover:bg-[#F1F3F9] dark:text-[#C2C8E0] dark:hover:bg-[#292A2A]">
            <FaXmark size={14} />
            Yopish
          </button>
          <button onClick={handleSubmit} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer bg-[#3F57B3] text-white hover:bg-[#526ED3]">
            <MdCheck size={16} />
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── User Detail View ── */
function UserDetail({ user, onBack, onDelete }) {
  const { registerBreadcrumb, clearBreadcrumb } = usePageAction()

  const initial = {
    name: user.name,
    password: '••••••••',
    salary: user.salary,
    balance: user.balance,
    viloyat: user.viloyat || '',
    tuman: user.tuman || '',
    passportSeria: user.passportSeria || '',
    passportRaqam: user.passportRaqam || '',
    lavozim: user.position,
    rol: user.role,
  }

  const [form, setForm] = useState(initial)
  const [isDirty, setIsDirty] = useState(false)

  const set = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }))
    setIsDirty(true)
  }

  const handleCancel = () => {
    setForm(initial)
    setIsDirty(false)
  }

  useEffect(() => {
    registerBreadcrumb(user.name)
    return () => clearBreadcrumb()
  }, [user.name, registerBreadcrumb, clearBreadcrumb])

  const inputCls = `w-full px-3 py-2.5 rounded-lg text-sm outline-none border transition-colors
    bg-white border-[#E2E6F2] text-[#1A1D2E] placeholder-[#B6BCCB] focus:border-[#526ED3]
    dark:bg-[#191A1A] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:placeholder-[#8E95B5]`
  const labelCls = 'block text-xs font-medium text-[#5B6078] dark:text-[#C2C8E0] mb-1'

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">Foydalanuvchining ma'lumotlari</h1>
        <div className="flex items-center gap-2">
          {isDirty && (
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer
                bg-white border-[#E2E6F2] text-[#1A1D2E] hover:bg-[#F1F3F9]
                dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#292A2A]"
            >
              <FaArrowLeft size={13} />
              Bekor qilish
            </button>
          )}
          <button
            onClick={() => onDelete(user.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              text-[#E02D2D] hover:bg-[#FFF2F2]
              dark:text-[#FA5252] dark:hover:bg-[#E02D2D]/10"
          >
            <FaTrash size={13} />
            O'chirish
          </button>
        </div>
      </div>

      {/* Avatar */}
      <div>
        <img
          src="/imgs/userImg.png"
          alt={user.name}
          className="w-[80px] h-[80px] rounded-xl object-cover"
        />
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">
        {/* Ism */}
        <div>
          <label className={labelCls}>Ism Sharifi</label>
          <input className={inputCls} value={form.name} onChange={e => set('name', e.target.value)} />
        </div>

        {/* Parol + Maosh + Balans */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={labelCls}>Parol</label>
            <input className={inputCls} value={form.password} onChange={e => set('password', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Oylik maosh (UZS)</label>
            <input className={inputCls + ' text-right'} value={fmt(form.salary)}
              onFocus={e => { e.target.value = form.salary; e.target.type = 'number' }}
              onBlur={e => { set('salary', parseFloat(e.target.value) || 0); e.target.type = 'text'; e.target.value = fmt(form.salary) }}
              onChange={e => set('salary', parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className={labelCls}>Balansi (UZS)</label>
            <input className={inputCls + ' text-right'} value={fmt(form.balance)}
              onFocus={e => { e.target.value = form.balance; e.target.type = 'number' }}
              onBlur={e => { set('balance', parseFloat(e.target.value) || 0); e.target.type = 'text'; e.target.value = fmt(form.balance) }}
              onChange={e => set('balance', parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>

        {/* Viloyat + Tuman */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Viloyat</label>
            <select value={form.viloyat} onChange={e => set('viloyat', e.target.value)} className={inputCls + ' cursor-pointer'}>
              <option value="">Viloyatni tanlang</option>
              {VILOYATLAR.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Tuman</label>
            <select value={form.tuman} onChange={e => set('tuman', e.target.value)} className={inputCls + ' cursor-pointer'}>
              <option value="">Tuman tanlang</option>
              {TUMANLAR.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Passport + Passport rasmi */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Passport ma'lumotlari</label>
            <div className="flex gap-2">
              <input className={inputCls} style={{maxWidth: 80}} placeholder="Seriya" value={form.passportSeria} onChange={e => set('passportSeria', e.target.value)} />
              <input className={inputCls} placeholder="Raqami" value={form.passportRaqam} onChange={e => set('passportRaqam', e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Passport rasmi</label>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border text-sm
              bg-white border-[#E2E6F2] text-[#5B6078]
              dark:bg-[#191A1A] dark:border-[#292A2A] dark:text-[#C2C8E0]">
              <FaFileLines size={14} className="shrink-0" />
              <span className="flex-1 truncate">Ma'lumot.pdf</span>
              <span className="text-xs text-[#B6BCCB] dark:text-[#8E95B5]">1487 Kb</span>
            </div>
          </div>
        </div>

        {/* Lavozim + Rol */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
            <span className="text-sm font-medium text-[#1A1D2E] dark:text-[#FFFFFF] shrink-0">Lavozimi</span>
            <div className="flex-1">
              <Dropdown label="Tanlash" options={LAVOZIMLAR} value={form.lavozim} onChange={v => set('lavozim', v)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span className="text-sm font-medium text-[#1A1D2E] dark:text-[#FFFFFF] shrink-0">Rolli</span>
            <div className="flex-1">
              <Dropdown label="Tanlash" options={ROLLAR_LIST} value={form.rol} onChange={v => set('rol', v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ── */
export default function UsersPage() {
  const { registerAction, clearAction } = usePageAction()

  const [users, setUsers]         = useState(USERS_DATA)
  const [search, setSearch]       = useState('')
  const [position, setPosition]   = useState('Barcha lavozimlar')
  const [role, setRole]           = useState('Barcha rollar')
  const [sort, setSort]           = useState('A dan Z gacha')
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected]   = useState(new Set())
  const [toast, setToast]         = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeUser, setActiveUser] = useState(null)

  useEffect(() => {
    if (activeUser) {
      clearAction()
    } else {
      registerAction({
        label: "Qo'shish",
        icon: <img src="/imgs/add-team.svg" alt="" className="w-4 h-4 brightness-0 invert" />,
        onClick: () => setShowModal(true),
      })
    }
    return () => clearAction()
  }, [activeUser, registerAction, clearAction])

  const filtered = users
    .filter(u => {
      const q = search.toLowerCase()
      if (q && !u.name.toLowerCase().includes(q)) return false
      if (position !== 'Barcha lavozimlar' && u.position !== position) return false
      if (role !== 'Barcha rollar' && u.role !== role) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'A dan Z gacha') return a.name.localeCompare(b.name)
      if (sort === 'Z dan A gacha') return b.name.localeCompare(a.name)
      if (sort === 'Yangi → Eski') return b.id - a.id
      return a.id - b.id
    })

  const allSelected = filtered.length > 0 && filtered.every(u => selected.has(u.id))
  const toggleAll = () => {
    if (allSelected) setSelected(prev => { const s = new Set(prev); filtered.forEach(u => s.delete(u.id)); return s })
    else setSelected(prev => { const s = new Set(prev); filtered.forEach(u => s.add(u.id)); return s })
  }
  const toggleOne = (id) => setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })
  const startSelecting  = () => { setSelecting(true);  setSelected(new Set()) }
  const cancelSelecting = () => { setSelecting(false); setSelected(new Set()) }

  const showToast = (title, msg) => { setToast({ title, msg }); setTimeout(() => setToast(null), 3000) }

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => !selected.has(u.id)))
    showToast("Foydalanuvchi o'chirildi", "Tanlangan foydalanuvchi tizimdan muvaffaqiyatli o'chirildi")
    cancelSelecting()
  }
  const handleMove = () => { showToast("Ko'chirildi", "Tanlangan foydalanuvchi muvaffaqiyatli ko'chirildi"); cancelSelecting() }
  const handleAdd = (newUser) => { setUsers(prev => [newUser, ...prev]); showToast("Yangi xodim qo'shildi", "Ma'lumotlar muvaffaqiyatli saqlandi") }

  const handleDeleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id))
    setActiveUser(null)
    showToast("Foydalanuvchi o'chirildi", "Foydalanuvchi tizimdan muvaffaqiyatli o'chirildi")
  }

  const handleRowClick = (u) => {
    if (selecting) { toggleOne(u.id); return }
    setActiveUser(u)
  }

  // ── Detail view ──
  if (activeUser) {
    return (
      <UserDetail
        user={activeUser}
        onBack={() => setActiveUser(null)}
        onDelete={handleDeleteUser}
      />
    )
  }

  // ── List view ──
  return (
    <div className="flex flex-col gap-4">
      {showModal && <AddUserModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-lg w-[320px]
          bg-white border border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
            <img src="/imgs/Union.svg" alt="" className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">{toast.title}</p>
            <p className="text-sm text-[#8F95A8] dark:text-[#8E95B5] mt-0.5">{toast.msg}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-[#B6BCCB] hover:text-[#5B6078] dark:text-[#8E95B5] dark:hover:text-[#C2C8E0] shrink-0 cursor-pointer">
            <FaXmark size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1
          className="text-[#1A1D2E] dark:text-[#FFFFFF]"
          style={{ fontSize: 24, fontWeight: 800 }}
        >
          Foydalanuvchilar
        </h1>
        {selecting ? (
          <button
            onClick={cancelSelecting}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#DADFF0] text-[#1A1D2E] hover:bg-[#c8ceea]
              dark:bg-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#303131]"
          >
            <FaXmark size={14} />
            Bekor qilish
          </button>
        ) : (
          <button
            onClick={startSelecting}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#DADFF0] text-[#1A1D2E] hover:bg-[#c8ceea]
              dark:bg-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#303131]"
          >
            <img src="/imgs/checkIcon.svg" alt="" className="w-4 h-4" />
            Tanlash
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8F95A8] dark:text-[#8E95B5]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Ism Sharifi bo'yicha izlash"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 outline-none transition-colors
              bg-white border border-[#E2E6F2] text-[#1A1D2E] placeholder-[#8F95A8]
              dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:placeholder-[#8E95B5]"
            style={{ fontSize: 13, fontWeight: 500, padding: '6px 12px 6px 32px', borderRadius: 12 }}
          />
        </div>
        <FilterSelect options={ALL_POSITIONS} value={position} onChange={setPosition} />
        <FilterSelect options={ALL_ROLES}     value={role}     onChange={setRole}     />
        <FilterSelect options={SORTS}         value={sort}     onChange={setSort}     />
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full" style={{ fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #EEF1F7' }}>
              <th className="px-4 py-3 text-left w-14" style={{ fontWeight: 500, color: '#5B6078' }}>
                {selecting ? (
                  <span className="flex items-center gap-2">
                    <input type="checkbox" checked={allSelected} onChange={toggleAll} className="cursor-pointer accent-[#3F57B3]" />
                    <span>ID</span>
                  </span>
                ) : '№'}
              </th>
              <th className="px-4 py-3 text-left" style={{ fontWeight: 500, color: '#5B6078' }}>Ism Sharifi</th>
              <th className="px-4 py-3 text-left" style={{ fontWeight: 500, color: '#5B6078' }}>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block shrink-0" />
                  Lavozim
                </span>
              </th>
              <th className="px-4 py-3 text-right" style={{ fontWeight: 500, color: '#5B6078' }}>
                <span className="flex items-center justify-end gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block shrink-0" />
                  Rol
                </span>
              </th>
              <th className="px-4 py-3 text-right" style={{ fontWeight: 500, color: '#5B6078' }}>Oylik maosh (UZS)</th>
              <th className="px-4 py-3 text-right" style={{ fontWeight: 500, color: '#5B6078' }}>Balans (UZS)</th>
              <th className="px-4 py-3 text-center" style={{ fontWeight: 500, color: '#5B6078' }}>Active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr
                key={u.id}
                onClick={() => handleRowClick(u)}
                className="transition-colors cursor-pointer"
                style={{ borderBottom: '1px solid #EEF1F7' }}
              >
                <td
                  className="px-4 py-3 w-14"
                  onClick={e => e.stopPropagation()}
                >
                  {selecting ? (
                    <span
                      className="flex items-center gap-2 transition-all duration-150"
                      style={selected.has(u.id) ? { paddingLeft: 10 } : {}}
                    >
                      <input
                        type="checkbox"
                        checked={selected.has(u.id)}
                        onChange={() => toggleOne(u.id)}
                        className="cursor-pointer accent-[#3F57B3] shrink-0"
                      />
                      <span style={{ color: '#8F95A8', fontWeight: 500 }}>{idx + 1}</span>
                    </span>
                  ) : (
                    <span style={{ color: '#8F95A8', fontWeight: 500 }}>{idx + 1}</span>
                  )}
                </td>
                <td className="px-4 py-3 font-medium" style={{ color: '#1A1D2E' }}>{u.name}</td>
                <td className="px-4 py-3" style={{ color: '#1A1D2E', fontWeight: 500 }}>{u.position}</td>
                <td className="px-4 py-3 text-right" style={{ color: '#1A1D2E', fontWeight: 500 }}>{u.role}</td>
                <td className="px-4 py-3 text-right" style={{ color: '#1A1D2E', fontWeight: 800 }}>{fmt(u.salary)}</td>
                <td className="px-4 py-3 text-right" style={{ color: '#1A1D2E', fontWeight: 500 }}>{fmt(u.balance)}</td>
                <td className="px-4 py-3 text-center">
                  {u.active
                    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-500"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    : <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#E02D2D]"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-[#B6BCCB] dark:text-[#8E95B5]">Foydalanuvchilar topilmadi</div>
        )}
      </div>

      {/* Selection bar */}
      {selecting && selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl
          bg-white border border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <span className="text-sm text-[#5B6078] dark:text-[#C2C8E0] mr-1">{selected.size} ta tanlandi</span>
          <button onClick={handleMove} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-[#EEF1F7] text-[#1A1D2E] hover:bg-[#E2E6F2] dark:bg-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#333434]">
            <MdArrowForward size={16} />
            Ko'chirish
          </button>
          <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer bg-[#FFF2F2] text-[#E02D2D] hover:bg-[#F8D7DA] dark:bg-[#E02D2D]/10 dark:text-[#FA5252] dark:hover:bg-[#E02D2D]/20">
            <MdDelete size={16} />
            O'chirish
          </button>
        </div>
      )}
    </div>
  )
}
