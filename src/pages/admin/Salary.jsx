import { useState } from 'react'
import { FaFilter, FaXmark } from 'react-icons/fa6'

const SALARY_DATA = [
  { id: 1,  name: 'Maria Martinez',   month: 'Yanvar',  salary: 15500000, kpi: 250000,  fine: -150000, total: 250000000, created: '15.02.2026', approved: false },
  { id: 2,  name: 'Jing Wei',         month: 'Fevral',  salary: 7250000,  kpi: 75000,   fine: -50000,  total: 100000000, created: '20.03.2026', approved: false },
  { id: 3,  name: 'Alex Chen',        month: 'Mart',    salary: 5500000,  kpi: 60000,   fine: -30000,  total: 90000000,  created: '21.03.2026', approved: false },
  { id: 4,  name: 'Maria Garcia',     month: 'Aprel',   salary: 8200000,  kpi: 85000,   fine: -45000,  total: 110000000, created: '22.03.2026', approved: false },
  { id: 5,  name: 'Maria Gonzalez',   month: 'Avgust',  salary: 7800000,  kpi: 90000,   fine: -10000,  total: 105000000, created: '23.03.2026', approved: false },
  { id: 6,  name: 'Samuel Patel',     month: 'Avgust',  salary: 6100000,  kpi: 70000,   fine: -25000,  total: 60000000,  created: '24.03.2026', approved: false },
  { id: 7,  name: 'Emily Johnson',    month: 'Avgust',  salary: 4500000,  kpi: 50000,   fine: -15000,  total: 80000000,  created: '25.03.2026', approved: false },
  { id: 8,  name: 'Doston Dostonov',  month: 'Yanvar',  salary: 10000000, kpi: 1000000, fine: -500000, total: 150000000, created: '01.01.2026', approved: true  },
]

const MONTHS = ['Barchasi', 'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']

function fmt(n) {
  return Math.abs(n).toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function SalaryPage() {
  const [search, setSearch]       = useState('')
  const [month, setMonth]         = useState('Barchasi')
  const [data, setData]           = useState(SALARY_DATA)
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected]   = useState(new Set())

  const filtered = data.filter(u => {
    const q = search.toLowerCase()
    if (q && !u.name.toLowerCase().includes(q)) return false
    if (month !== 'Barchasi' && u.month !== month) return false
    return true
  })

  const allSelected = filtered.length > 0 && filtered.every(u => selected.has(u.id))
  const toggleAll   = () => {
    if (allSelected) setSelected(prev => { const s = new Set(prev); filtered.forEach(u => s.delete(u.id)); return s })
    else             setSelected(prev => { const s = new Set(prev); filtered.forEach(u => s.add(u.id));    return s })
  }
  const toggleOne = (id) => setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const handleApprove = () => {
    setData(prev => prev.map(u => selected.has(u.id) ? { ...u, approved: true } : u))
    setSelecting(false)
    setSelected(new Set())
  }

  const toggleApprove = (id) => {
    setData(prev => prev.map(u => u.id === id ? { ...u, approved: !u.approved } : u))
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">Ish haqi</h1>
        {selecting ? (
          <button onClick={() => { setSelecting(false); setSelected(new Set()) }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer
              bg-white border-[#E2E6F2] text-[#1A1D2E] hover:bg-[#F1F3F9]
              dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#292A2A]">
            <FaXmark size={13} />
            Bekor qilish
          </button>
        ) : (
          <button onClick={() => setSelecting(true)}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors cursor-pointer
              bg-white border-[#E2E6F2] text-[#1A1D2E] hover:bg-[#F1F3F9]
              dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#292A2A]">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="text-[#5B6078] dark:text-[#C2C8E0]">
              <path d="M2 4h11M2 7.5h11M2 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Tanlash
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="relative w-[220px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6BCCB] dark:text-[#8E95B5]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Ism Sharifi bo'yicha izlash" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none transition-colors
              bg-white border border-[#E2E6F2] text-[#1A1D2E] placeholder-[#B6BCCB] focus:border-[#526ED3]
              dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:placeholder-[#8E95B5]" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer
          bg-white border-[#E2E6F2] text-[#1A1D2E] hover:bg-[#F1F3F9]
          dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:hover:bg-[#292A2A]">
          <FaFilter size={13} />
          Filtrlash
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-[#E2E6F2] dark:border-[#292A2A] bg-white dark:bg-[#222323]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2E6F2] dark:border-[#292A2A] bg-white dark:bg-[#222323]">
              {selecting && (
                <th className="w-10 px-4 py-3 text-left">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} className="cursor-pointer accent-[#3F57B3]" />
                </th>
              )}
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0] w-10">№</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Ism sharifi</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Oy</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Oylik maosh (UZS)</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">KPI bonus (UZS)</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Jarima miqdori (UZS)</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Jami miqdori (UZS)</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Yaratilgan vaqt</th>
              <th className="px-4 py-3 text-center font-medium text-[#5B6078] dark:text-[#C2C8E0]">Tasdiqlanish</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr key={u.id}
                onClick={() => selecting && toggleOne(u.id)}
                className={`border-b border-[#EEF1F7] dark:border-[#292A2A] transition-colors last:border-0
                  ${selecting ? 'cursor-pointer' : ''}
                  ${selected.has(u.id) ? 'bg-[#E9EEFF] dark:bg-[#292A2A]' : 'hover:bg-[#F8F9FC] dark:hover:bg-[#292A2A]'}`}>
                {selecting && (
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" checked={selected.has(u.id)} onChange={() => toggleOne(u.id)} className="cursor-pointer accent-[#3F57B3]" />
                  </td>
                )}
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{idx + 1}</td>
                <td className="px-4 py-3 font-medium text-[#1A1D2E] dark:text-[#FFFFFF]">{u.name}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{u.month}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#1A1D2E] dark:text-[#FFFFFF]">{fmt(u.salary)}</td>
                <td className="px-4 py-3 text-right text-[#1A1D2E] dark:text-[#FFFFFF]">{fmt(u.kpi)}</td>
                <td className="px-4 py-3 text-right font-medium text-[#E02D2D] dark:text-[#FA5252]">-{fmt(u.fine)}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#1A1D2E] dark:text-[#FFFFFF]">{fmt(u.total)}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{u.created}</td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={u.approved}
                    onChange={() => toggleApprove(u.id)}
                    className="w-4 h-4 cursor-pointer accent-[#3F57B3]"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-[#B6BCCB] dark:text-[#8E95B5]">Ma'lumot topilmadi</div>
        )}
      </div>

      {/* Selection bar */}
      {selecting && selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl
          bg-white border border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <span className="text-sm text-[#5B6078] dark:text-[#C2C8E0] mr-1">{selected.size} ta tanlandi</span>
          <button onClick={handleApprove}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#3F57B3] text-white hover:bg-[#526ED3]">
            Tasdiqlash
          </button>
        </div>
      )}
    </div>
  )
}
