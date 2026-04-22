import { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { MdCheck } from 'react-icons/md'

const SALARY_DATA = [
  { id: 1,  name: 'Doston Dostonov Dostonovich', position: 'Bosh administrator', role: 'Dasturchi',   salary: 10000000, bonus: 1000000,  tax: 500000,  net: 10500000, month: 'Yanvar 2025',  paid: true  },
  { id: 2,  name: 'Alyona Sokolova',             position: 'Senior Developer',   role: 'Programmer', salary: 8500000,  bonus: 500000,   tax: 425000,  net: 8575000,  month: 'Yanvar 2025',  paid: true  },
  { id: 3,  name: 'Timur Akhmedov',              position: 'Project Manager',    role: 'Team Lead',  salary: 12000000, bonus: 2000000,  tax: 600000,  net: 13400000, month: 'Yanvar 2025',  paid: false },
  { id: 4,  name: 'Irina Petrovna',              position: 'UI/UX Designer',     role: 'Designer',   salary: 9750000,  bonus: 750000,   tax: 487500,  net: 10012500, month: 'Yanvar 2025',  paid: true  },
  { id: 5,  name: 'Sergei Ivanovich',            position: 'Database Admin',     role: 'Specialist', salary: 11200000, bonus: 1200000,  tax: 560000,  net: 11840000, month: 'Yanvar 2025',  paid: true  },
  { id: 6,  name: 'Natalia Fedorova',            position: 'Frontend Developer', role: 'Developer',  salary: 7800000,  bonus: 0,        tax: 390000,  net: 7410000,  month: 'Yanvar 2025',  paid: false },
  { id: 7,  name: 'Vladimir Smirnov',            position: 'Backend Developer',  role: 'Engineer',   salary: 10500000, bonus: 500000,   tax: 525000,  net: 10475000, month: 'Yanvar 2025',  paid: true  },
  { id: 8,  name: 'Ekaterina Vasilievna',        position: 'QA Engineer',        role: 'Tester',     salary: 9200000,  bonus: 200000,   tax: 460000,  net: 8940000,  month: 'Yanvar 2025',  paid: true  },
]

const MONTHS = ['Yanvar 2025', 'Fevral 2025', 'Mart 2025', 'Aprel 2025', 'May 2025']

function fmt(n) {
  return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function SalaryPage() {
  const [search, setSearch] = useState('')
  const [month, setMonth] = useState('Yanvar 2025')
  const [selecting, setSelecting] = useState(false)
  const [selected, setSelected] = useState(new Set())
  const [toast, setToast] = useState(null)

  const filtered = SALARY_DATA.filter(u => {
    const q = search.toLowerCase()
    if (q && !u.name.toLowerCase().includes(q)) return false
    if (u.month !== month) return false
    return true
  })

  const allSelected = filtered.length > 0 && filtered.every(u => selected.has(u.id))
  const toggleAll = () => {
    if (allSelected) setSelected(prev => { const s = new Set(prev); filtered.forEach(u => s.delete(u.id)); return s })
    else setSelected(prev => { const s = new Set(prev); filtered.forEach(u => s.add(u.id)); return s })
  }
  const toggleOne = (id) => setSelected(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const totalSalary = filtered.reduce((a, u) => a + u.salary, 0)
  const totalNet    = filtered.reduce((a, u) => a + u.net, 0)

  return (
    <div className="flex flex-col gap-4">
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-lg w-[320px]
          bg-white border border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
            <MdCheck size={16} className="text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">Muvaffaqiyatli</p>
            <p className="text-sm text-[#8F95A8] dark:text-[#8E95B5] mt-0.5">{toast}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-[#B6BCCB] hover:text-[#5B6078] dark:text-[#8E95B5] cursor-pointer">
            <FaXmark size={14} />
          </button>
        </div>
      )}

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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Jami xodimlar', value: filtered.length, suffix: 'ta' },
          { label: 'Jami maosh', value: fmt(totalSalary), suffix: 'UZS' },
          { label: "To'langan (sof)", value: fmt(totalNet), suffix: 'UZS' },
        ].map(s => (
          <div key={s.label} className="rounded-xl px-4 py-3 border bg-white border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
            <p className="text-xs text-[#8F95A8] dark:text-[#C2C8E0]">{s.label}</p>
            <p className="text-lg font-bold text-[#1A1D2E] dark:text-[#FFFFFF] mt-0.5">{s.value} <span className="text-xs font-normal text-[#8F95A8] dark:text-[#C2C8E0]">{s.suffix}</span></p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative w-[220px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6BCCB] dark:text-[#8E95B5]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Ism Sharifi bo'yicha izlash" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none transition-colors
              bg-white border border-[#E2E6F2] text-[#1A1D2E] placeholder-[#B6BCCB] focus:border-[#526ED3]
              dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:placeholder-[#8E95B5]" />
        </div>
        <select value={month} onChange={e => setMonth(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
            bg-white border border-[#E2E6F2] text-[#1A1D2E]
            dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF]">
          {MONTHS.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-[#E2E6F2] dark:border-[#292A2A] bg-[#F8F9FC] dark:bg-[#222323]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2E6F2] dark:border-[#292A2A]">
              {selecting && <th className="w-10 px-4 py-3 text-left"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="cursor-pointer accent-[#3F57B3]" /></th>}
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0] w-10">№</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Ism Sharifi</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Lavozim</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Maosh (UZS)</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Bonus</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Soliq</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Sof maosh</th>
              <th className="px-4 py-3 text-center font-medium text-[#5B6078] dark:text-[#C2C8E0]">Holat</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, idx) => (
              <tr key={u.id} onClick={() => selecting && toggleOne(u.id)}
                className={`border-b border-[#EEF1F7] dark:border-[#292A2A] transition-colors last:border-0
                  ${selecting ? 'cursor-pointer' : ''}
                  ${selected.has(u.id) ? 'bg-[#E9EEFF] dark:bg-[#292A2A]' : 'hover:bg-[#EEF1F7] dark:hover:bg-[#292A2A]'}`}>
                {selecting && (
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <input type="checkbox" checked={selected.has(u.id)} onChange={() => toggleOne(u.id)} className="cursor-pointer accent-[#3F57B3]" />
                  </td>
                )}
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{idx + 1}</td>
                <td className="px-4 py-3 font-medium text-[#1A1D2E] dark:text-[#FFFFFF]">{u.name}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{u.position}</td>
                <td className="px-4 py-3 text-right font-semibold text-[#1A1D2E] dark:text-[#FFFFFF]">{fmt(u.salary)}</td>
                <td className="px-4 py-3 text-right text-green-600 dark:text-green-400">{u.bonus > 0 ? `+${fmt(u.bonus)}` : '—'}</td>
                <td className="px-4 py-3 text-right text-[#E02D2D] dark:text-[#FA5252]">-{fmt(u.tax)}</td>
                <td className="px-4 py-3 text-right font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">{fmt(u.net)}</td>
                <td className="px-4 py-3 text-center">
                  {u.paid
                    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-500"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    : <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#E02D2D]"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg></span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm text-[#B6BCCB] dark:text-[#8E95B5]">Ma'lumot topilmadi</div>
        )}
      </div>

      {selecting && selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl
          bg-white border border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <span className="text-sm text-[#5B6078] dark:text-[#C2C8E0] mr-1">{selected.size} ta tanlandi</span>
          <button onClick={() => { showToast("Tanlangan xodimlarga maosh to'landi"); setSelecting(false); setSelected(new Set()) }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
              bg-[#3F57B3] text-white hover:bg-[#526ED3]">
            <MdCheck size={16} />
            Maosh to'lash
          </button>
        </div>
      )}
    </div>
  )
}
