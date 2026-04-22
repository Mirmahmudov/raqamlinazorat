import { useState } from 'react'
import { MdClose, MdArrowForward, MdDelete } from 'react-icons/md'

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

const POSITIONS = ['Barcha lavozimlar', ...new Set(USERS_DATA.map(u => u.position))]
const ROLES     = ['Barcha rollar',     ...new Set(USERS_DATA.map(u => u.role))]
const SORTS     = ['A dan Z gacha', 'Z dan A gacha', "Yangi → Eski", "Eski → Yangi"]

function fmt(n) {
  return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function UsersPage() {
  const [users, setUsers]       = useState(USERS_DATA)
  const [search, setSearch]     = useState('')
  const [position, setPosition] = useState('Barcha lavozimlar')
  const [role, setRole]         = useState('Barcha rollar')
  const [sort, setSort]         = useState('A dan Z gacha')
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected]   = useState(new Set())
  const [toast, setToast]         = useState(null)

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

  const startSelecting = () => {
    setSelecting(true)
    setSelected(new Set())
  }

  const cancelSelecting = () => {
    setSelecting(false)
    setSelected(new Set())
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleDelete = () => {
    setUsers(prev => prev.filter(u => !selected.has(u.id)))
    showToast('Tanlangan foydalanuvchi tizimdan muvaffaqiyatli o\'chirildi')
    cancelSelecting()
  }

  const handleMove = () => {
    showToast('Tanlangan foydalanuvchi muvaffaqiyatli ko\'chirildi')
    cancelSelecting()
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-lg w-[320px]
          bg-white border border-gray-100 dark:bg-[#1e2130] dark:border-white/10">
          <img src="/imgs/Union.svg" alt="success" className="w-5 h-5 mt-0.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1A1D2E] dark:text-white">Foydalanuvchi o'chirildi</p>
            <p className="text-sm text-gray-400 dark:text-gray-400 mt-0.5">{toast}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-gray-300 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300 shrink-0">
            <MdClose size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1A1D2E] dark:text-white">Foydalanuvchilar</h1>
        {selecting ? (
          <button
            onClick={cancelSelecting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#EEF1F7] text-[#1A1D2E] hover:bg-[#e2e6f0]
              dark:bg-white/8 dark:text-gray-200 dark:hover:bg-white/12"
          >
            <MdClose size={16} />
            Bekor qilish
          </button>
        ) : (
          <button
            onClick={startSelecting}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#EEF1F7] text-[#1A1D2E] hover:bg-[#e2e6f0]
              dark:bg-white/8 dark:text-gray-200 dark:hover:bg-white/12"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="opacity-60">
              <path d="M2 4h11M2 7.5h11M2 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Tanlash
          </button>
        )}
      </div>

      {/* Filters — faqat tanlash rejimi yoq bo'lganda ko'rinadi */}
      {!selecting && (
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Ism Sharifi bo'yicha izlash"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm outline-none transition-colors
                bg-white border border-gray-200 text-[#1A1D2E] placeholder-gray-400
                focus:border-indigo-400
                dark:bg-[#1a1d27] dark:border-white/10 dark:text-gray-100 dark:placeholder-gray-500"
            />
          </div>
          <select
            value={position}
            onChange={e => setPosition(e.target.value)}
            className="w-[180px] px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
              bg-white border border-gray-200 text-[#1A1D2E]
              dark:bg-[#1a1d27] dark:border-white/10 dark:text-gray-100"
          >
            {POSITIONS.map(p => <option key={p}>{p}</option>)}
          </select>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-[150px] px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
              bg-white border border-gray-200 text-[#1A1D2E]
              dark:bg-[#1a1d27] dark:border-white/10 dark:text-gray-100"
          >
            {ROLES.map(r => <option key={r}>{r}</option>)}
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="w-[150px] px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
              bg-white border border-gray-200 text-[#1A1D2E]
              dark:bg-[#1a1d27] dark:border-white/10 dark:text-gray-100"
          >
            {SORTS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-[#1a1d27]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 dark:border-white/5">
              {selecting && (
                <th className="w-10 px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="cursor-pointer accent-indigo-500"
                  />
                </th>
              )}
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-gray-400 w-10">
                {selecting ? 'ID' : '№'}
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-gray-400">Ism Sharifi</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  Lavozim
                </span>
              </th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-gray-400">Rol</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-gray-400">Oylik maosh (UZS)</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-gray-400">Balans</th>
              <th className="px-4 py-3 text-center font-medium text-[#5B6078] dark:text-gray-400">Active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr
                key={u.id}
                onClick={() => selecting && toggleOne(u.id)}
                className={`border-b border-gray-50 dark:border-white/3 transition-colors
                  ${selecting ? 'cursor-pointer' : ''}
                  ${selected.has(u.id) ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : 'hover:bg-[#f8f9fc] dark:hover:bg-white/2'}`}
              >
                {selecting && (
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.has(u.id)}
                      onChange={() => toggleOne(u.id)}
                      className="cursor-pointer accent-indigo-500"
                    />
                  </td>
                )}
                <td className="px-4 py-3 text-[#5B6078] dark:text-gray-500">
                  {selecting ? u.id : idx + 1}
                </td>
                <td className="px-4 py-3 font-medium text-[#1A1D2E] dark:text-gray-100">{u.name}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-gray-400">{u.position}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-gray-400">{u.role}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#1A1D2E] dark:text-gray-100">{fmt(u.salary)}</td>
                <td className="px-4 py-3 text-right text-[#1A1D2E] dark:text-gray-100">{fmt(u.balance)}</td>
                <td className="px-4 py-3 text-center">
                  {u.active
                    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-500">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    : <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-red-500">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      </span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-gray-400 dark:text-gray-600">
            Foydalanuvchilar topilmadi
          </div>
        )}
      </div>

      {/* Selection action bar */}
      {selecting && selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl
          bg-white border border-gray-100 dark:bg-[#1a1d27] dark:border-white/10">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">
            {selected.size} ta tanlandi
          </span>
          <button
            onClick={handleMove}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#EEF1F7] text-[#1A1D2E] hover:bg-[#e2e6f0]
              dark:bg-white/8 dark:text-gray-200 dark:hover:bg-white/12"
          >
            <MdArrowForward size={16} />
            Ko'chirish
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-red-50 text-red-500 hover:bg-red-100
              dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
          >
            <MdDelete size={16} />
            O'chirish
          </button>
        </div>
      )}
    </div>
  )
}
