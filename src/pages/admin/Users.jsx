import { useState, useEffect, useRef } from 'react'
import { MdArrowForward, MdDelete, MdExpandMore, MdCheck } from 'react-icons/md'
import { FaCamera, FaArrowLeft } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { usePageAction } from '../../context/PageActionContext'

const VILOYATLAR = ['Toshkent', 'Samarqand', 'Buxoro', 'Andijon', 'Farg\'ona', 'Namangan', 'Qashqadaryo', 'Surxondaryo', 'Xorazm', 'Navoiy', 'Jizzax', 'Sirdaryo', 'Qoraqalpog\'iston']
const TUMANLAR  = ['Yunusobod', 'Chilonzor', 'Mirzo Ulug\'bek', 'Shayxontohur', 'Uchtepa', 'Yakkasaroy', 'Olmazar', 'Bektemir', 'Sergeli', 'Yashnobod']
const LAVOZIMLAR = ['Admin', 'Menejer', 'Bugalter', 'Tester', 'Dasturchi', 'Dizayner']
const ROLLAR_LIST = ['Dasturchi', 'Dizayner', 'Analitik', 'Xisobchi', 'Menejer', 'Tester']

const USERS_DATA = [
  { id: 1,  name: 'Doston Dostonov Dostonovich', position: 'Bosh administrator',    role: 'Dasturchi',             salary: 10000000,  balance: 200000000, active: true  },
  { id: 2,  name: 'Alyona Sokolova',             position: 'Senior Developer',       role: 'Programmer',            salary: 8500000,   balance: 150000000, active: true  },
  { id: 3,  name: 'Timur Akhmedov',              position: 'Project Manager',        role: 'Team Lead',             salary: 12000000,  balance: 250000000, active: false },
  { id: 4,  name: 'Irina Petrovna',              position: 'UI/UX Designer',         role: 'Designer',              salary: 9750000,   balance: 170000000, active: true  },
  { id: 5,  name: 'Sergei Ivanovich',            position: 'Database Administrator', role: 'Data Specialist',       salary: 11200000,  balance: 220000000, active: true  },
  { id: 6,  name: 'Natalia Fedorova',            position: 'Frontend Developer',     role: 'Developer',             salary: 7800000,   balance: 130000000, active: false },
  { id: 7,  name: 'Vladimir Smirnov',            position: 'Backend Developer',      role: 'Engineer',              salary: 10500000,  balance: 190000000, active: true  },
  { id: 8,  name: 'Ekaterina Vasilievna',        position: 'QA Engineer',            role: 'Tester',                salary: 9200000,   balance: 160000000, active: true  },
  { id: 9,  name: 'Andrei Sergeyevich',          position: 'DevOps Engineer',        role: 'Operations Specialist', salary: 11800000,  balance: 210000000, active: false },
  { id: 10, name: 'Olga Dmitrievna',             position: 'Marketing Specialist',   role: 'Strategist',            salary: 9300000,   balance: 175000000, active: true  },
  { id: 11, name: 'Mikhail Borisov',             position: 'Systems Analyst',        role: 'Analyst',               salary: 8000000,   balance: 140000000, active: false },
  { id: 12, name: 'Doston Ochilov',              position: 'Administrator',          role: 'Developer',             salary: 12000000,  balance: 220000000, active: true  },
]

const ALL_POSITIONS = ['Barcha lavozimlar', ...new Set(USERS_DATA.map(u => u.position))]
const ALL_ROLES     = ['Barcha rollar',     ...new Set(USERS_DATA.map(u => u.role))]
const SORTS         = ['A dan Z gacha', 'Z dan A gacha', 'Yangi → Eski', 'Eski → Yangi']

function fmt(n) {
  return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/* ── Custom dropdown ── */
function Dropdown({ label, color = 'green', options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors cursor-pointer
          bg-white border-[#E2E6F2] text-[#1A1D2E]
          dark:bg-[#191A1A] dark:border-[#292A2A] dark:text-[#FFFFFF]"
      >
        <span>{value || label}</span>
        <MdExpandMore size={16} className="text-[#8F95A8] dark:text-[#C2C8E0]" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[140px] rounded-xl shadow-lg border overflow-hidden
          bg-white border-[#E2E6F2]
          dark:bg-[#222323] dark:border-[#292A2A]">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer
                hover:bg-[#F1F3F9] dark:hover:bg-[#292A2A]
                ${value === opt
                  ? 'text-[#3F57B3] font-medium dark:text-[#7F95E6]'
                  : 'text-[#1A1D2E] dark:text-[#C2C8E0]'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Add User Modal ── */
const EMPTY_FORM = { name: '', password: '', salary: '', viloyat: '', tuman: '', passportSeria: '', passportRaqam: '', lavozim: '', rol: '', avatar: null }

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
    onAdd({
      id: Date.now(),
      name: form.name,
      position: form.lavozim || 'Noma\'lum',
      role: form.rol || 'Noma\'lum',
      salary: parseFloat(form.salary) || 0,
      balance: 0,
      active: true,
    })
    onClose()
  }

  const inputCls = `w-full px-3 py-2.5 rounded-lg text-sm outline-none border transition-colors
    bg-white border-[#E2E6F2] text-[#1A1D2E] placeholder-[#B6BCCB]
    focus:border-[#526ED3]
    dark:bg-[#191A1A] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:placeholder-[#8E95B5]`

  const labelCls = 'block text-xs font-medium text-[#5B6078] dark:text-[#C2C8E0] mb-1'

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto modal-scroll py-8 px-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />

      {/* X — backdrop ustida */}
      <button
        onClick={onClose}
        className="fixed top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors
          bg-white/20 text-white hover:bg-white/30"
      >
        <FaXmark size={16} />
      </button>

      {/* Modal */}
      <div className="relative w-full max-w-[600px] rounded-2xl shadow-2xl
        bg-white dark:bg-[#222323]">

        {/* Header */}
        <div className="px-7 pt-7 pb-5">
          <div className="flex items-start gap-3">
            <button onClick={onClose} className="mt-1 text-[#5B6078] dark:text-[#C2C8E0] hover:opacity-70 cursor-pointer shrink-0">
              <FaArrowLeft size={18} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">Yangi xodim qo'shish</h2>
              <p className="text-sm text-[#8F95A8] dark:text-[#C2C8E0] mt-1">
                Yangi xodimni tizimga qo'shing va unga tegishli rol hamda maoshni belgilang
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 pb-2 flex flex-col gap-4">

          {/* Ism */}
          <div>
            <label className={labelCls}>Ism Sharifi</label>
            <input className={inputCls} placeholder="F.I.O" value={form.name} onChange={e => set('name', e.target.value)} />
          </div>

          {/* Parol + Maosh */}
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

          {/* Viloyat + Tuman */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Viloyat</label>
              <select
                value={form.viloyat}
                onChange={e => set('viloyat', e.target.value)}
                className={inputCls + ' cursor-pointer'}
              >
                <option value="">Viloyatni tanlang</option>
                {VILOYATLAR.map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tuman</label>
              <select
                value={form.tuman}
                onChange={e => set('tuman', e.target.value)}
                className={inputCls + ' cursor-pointer'}
              >
                <option value="">Tuman tanlang</option>
                {TUMANLAR.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Passport ma'lumotlari + Passport rasmi */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Passport ma'lumotlari</label>
              <div className="flex gap-2">
                <input className={inputCls} placeholder="Seriyasi" value={form.passportSeria} onChange={e => set('passportSeria', e.target.value)} />
                <input className={inputCls} placeholder="Raqami" value={form.passportRaqam} onChange={e => set('passportRaqam', e.target.value)} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Passport rasmi</label>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full h-[42px] rounded-lg border border-dashed flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm
                  border-[#D0D5E2] bg-white text-[#8F95A8] hover:bg-[#F8F9FC]
                  dark:border-[#292A2A] dark:bg-[#191A1A] dark:text-[#8E95B5] dark:hover:bg-[#292A2A]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                Fayl yuklash
              </button>
            </div>
          </div>

          {/* Avatar + Lavozim + Rol — bir qatorda */}
          <div>
            <label className={labelCls}>Avatar yuklash</label>
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-[90px] h-[80px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors shrink-0
                  border-[#D0D5E2] bg-[#F8F9FC] hover:bg-[#F1F3F9]
                  dark:border-[#292A2A] dark:bg-[#191A1A] dark:hover:bg-[#292A2A]"
              >
                {avatarPreview
                  ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover rounded-xl" />
                  : <>
                      <FaCamera size={18} className="text-[#B6BCCB] dark:text-[#8E95B5]" />
                      <span className="text-[10px] text-[#B6BCCB] dark:text-[#8E95B5] text-center leading-tight">Rasm yuklash</span>
                    </>
                }
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />

              {/* Lavozim + Rol inline */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span className="text-sm font-semibold text-[#1A1D2E] dark:text-[#FFFFFF]">Lavozimi</span>
                  <Dropdown label="Tanlash" color="green" options={LAVOZIMLAR} value={form.lavozim} onChange={v => set('lavozim', v)} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <span className="text-sm font-semibold text-[#1A1D2E] dark:text-[#FFFFFF]">Rolli</span>
                  <Dropdown label="Tanlash" color="red" options={ROLLAR_LIST} value={form.rol} onChange={v => set('rol', v)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 py-5 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
              text-[#5B6078] hover:bg-[#F1F3F9]
              dark:text-[#C2C8E0] dark:hover:bg-[#292A2A]"
          >
            <FaXmark size={14} />
            Yopish
          </button>
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer
              bg-[#3F57B3] text-white hover:bg-[#526ED3]"
          >
            <MdCheck size={16} />
            Qo'shish
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ── */
export default function UsersPage() {
  const { registerAction, clearAction } = usePageAction()

  const [users, setUsers]       = useState(USERS_DATA)
  const [search, setSearch]     = useState('')
  const [position, setPosition] = useState('Barcha lavozimlar')
  const [role, setRole]         = useState('Barcha rollar')
  const [sort, setSort]         = useState('A dan Z gacha')
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected]   = useState(new Set())
  const [toast, setToast]         = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Register navbar action
  useEffect(() => {
    registerAction({
      label: "Qo'shish",
      icon: <img src="/imgs/add-team.svg" alt="" className="w-4 h-4 brightness-0 invert" />,
      onClick: () => setShowModal(true),
    })
    return () => clearAction()
  }, [registerAction, clearAction])

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
    if (allSelected) {
      setSelected(prev => { const s = new Set(prev); filtered.forEach(u => s.delete(u.id)); return s })
    } else {
      setSelected(prev => { const s = new Set(prev); filtered.forEach(u => s.add(u.id)); return s })
    }
  }

  const toggleOne = (id) => {
    setSelected(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  const startSelecting  = () => { setSelecting(true);  setSelected(new Set()) }
  const cancelSelecting = () => { setSelecting(false); setSelected(new Set()) }

  const showToast = (title, msg) => {
    setToast({ title, msg })
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => !selected.has(u.id)))
    showToast("Foydalanuvchi o'chirildi", "Tanlangan foydalanuvchi tizimdan muvaffaqiyatli o'chirildi")
    cancelSelecting()
  }

  const handleMove = () => {
    showToast("Ko'chirildi", "Tanlangan foydalanuvchi muvaffaqiyatli ko'chirildi")
    cancelSelecting()
  }

  const handleAdd = (newUser) => {
    setUsers(prev => [newUser, ...prev])
    showToast('Yangi xodim qoshildi', "Ma'lumotlar muvaffaqiyatli saqlandi")
  }

  const filterBar = (
    <div className="flex flex-wrap gap-2">
      <div className="relative w-[220px]">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6BCCB] dark:text-[#8E95B5]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Ism Sharifi bo'yicha izlash"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none transition-colors
            bg-white border border-[#E2E6F2] text-[#1A1D2E] placeholder-[#B6BCCB] focus:border-[#526ED3]
            dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:placeholder-[#8E95B5]"
        />
      </div>
      <select
        value={position}
        onChange={e => setPosition(e.target.value)}
        className="px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
          bg-white border border-[#E2E6F2] text-[#1A1D2E]
          dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF]"
      >
        {ALL_POSITIONS.map(p => <option key={p}>{p}</option>)}
      </select>
      <select
        value={role}
        onChange={e => setRole(e.target.value)}
        className="px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
          bg-white border border-[#E2E6F2] text-[#1A1D2E]
          dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF]"
      >
        {ALL_ROLES.map(r => <option key={r}>{r}</option>)}
      </select>
      <select
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
          bg-white border border-[#E2E6F2] text-[#1A1D2E]
          dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF]"
      >
        {SORTS.map(s => <option key={s}>{s}</option>)}
      </select>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">

      {/* Modal */}
      {showModal && (
        <AddUserModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-lg w-[320px]
          bg-white border border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0 mt-0.5">
            <MdCheck size={16} className="text-green-600 dark:text-green-400" />
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
        <h1 className="text-2xl font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">Foydalanuvchilar</h1>
        {selecting ? (
          <button
            onClick={cancelSelecting}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#F8F9FC] border border-[#E2E6F2] text-[#1A1D2E] hover:bg-[#EEF1F7]
              dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#292A2A]"
          >
            <FaXmark size={14} />
            Bekor qilish
          </button>
        ) : (
          <button
            onClick={startSelecting}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#F8F9FC] border border-[#E2E6F2] text-[#1A1D2E] hover:bg-[#EEF1F7]
              dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#292A2A]"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-[#5B6078] dark:text-[#C2C8E0]">
              <path d="M2 4h11M2 7.5h11M2 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Tanlash
          </button>
        )}
      </div>

      {/* Filters — always visible */}
      {filterBar}

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-[#E2E6F2] dark:border-[#292A2A] bg-[#F8F9FC] dark:bg-[#222323]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2E6F2] dark:border-[#292A2A]">
              {selecting && (
                <th className="w-10 px-4 py-3 text-left">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} className="cursor-pointer accent-[#3F57B3]" />
                </th>
              )}
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0] w-10">{selecting ? 'ID' : '№'}</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Ism Sharifi</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">
                <span className="flex items-center gap-1.5">
                  {filtered.length > 0 && <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />}
                  Lavozim
                </span>
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">
                <span className="flex items-center gap-1.5">
                  {filtered.length > 0 && <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />}
                  Rol
                </span>
              </th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">
                Oylik maosh{filtered.length > 0 && ' (UZS)'}
              </th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">
                Balans{filtered.length > 0 && ' (UZS)'}
              </th>
              <th className="px-4 py-3 text-center font-medium text-[#5B6078] dark:text-[#C2C8E0]">Active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr
                key={u.id}
                onClick={() => selecting && toggleOne(u.id)}
                className={`border-b border-[#EEF1F7] dark:border-[#292A2A] transition-colors last:border-0
                  ${selecting ? 'cursor-pointer' : ''}
                  ${selected.has(u.id)
                    ? 'bg-[#E9EEFF] dark:bg-[#292A2A]'
                    : 'hover:bg-[#EEF1F7] dark:hover:bg-[#292A2A]'}`}
              >
                {selecting && (
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" checked={selected.has(u.id)} onChange={() => toggleOne(u.id)} className="cursor-pointer accent-[#3F57B3]" />
                  </td>
                )}
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{selecting ? u.id : idx + 1}</td>
                <td className="px-4 py-3 font-medium text-[#1A1D2E] dark:text-[#FFFFFF]">{u.name}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{u.position}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{u.role}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#1A1D2E] dark:text-[#FFFFFF]">{fmt(u.salary)}</td>
                <td className="px-4 py-3 text-right text-[#1A1D2E] dark:text-[#FFFFFF]">{fmt(u.balance)}</td>
                <td className="px-4 py-3 text-center">
                  {u.active
                    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-500">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    : <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#E02D2D]">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-[#B6BCCB] dark:text-[#8E95B5]">
            Foydalanuvchilar topilmadi
          </div>
        )}
      </div>

      {/* Selection action bar */}
      {selecting && selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl
          bg-white border border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <span className="text-sm text-[#5B6078] dark:text-[#C2C8E0] mr-1">
            {selected.size} ta tanlandi
          </span>
          <button
            onClick={handleMove}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#EEF1F7] text-[#1A1D2E] hover:bg-[#E2E6F2]
              dark:bg-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#333434]"
          >
            <MdArrowForward size={16} />
            Ko'chirish
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#FFF2F2] text-[#E02D2D] hover:bg-[#F8D7DA]
              dark:bg-[#E02D2D]/10 dark:text-[#FA5252] dark:hover:bg-[#E02D2D]/20"
          >
            <MdDelete size={16} />
            O'chirish
          </button>
        </div>
      )}
    </div>
  )
}
