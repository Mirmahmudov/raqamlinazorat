import { useState } from 'react'

const HISTORY_DATA = [
  { id: 1,  date: '01.01.2025', name: 'Doston Dostonov',  type: 'Maosh',    amount: 10500000, direction: 'out', status: 'completed' },
  { id: 2,  date: '01.01.2025', name: 'Alyona Sokolova',  type: 'Maosh',    amount: 8575000,  direction: 'out', status: 'completed' },
  { id: 3,  date: '05.01.2025', name: 'Kompaniya',        type: 'Xarajat',  amount: 5500000,  direction: 'out', status: 'completed' },
  { id: 4,  date: '10.01.2025', name: 'Mijoz to\'lovi',   type: 'Kirim',    amount: 25000000, direction: 'in',  status: 'completed' },
  { id: 5,  date: '15.01.2025', name: 'Timur Akhmedov',   type: 'Bonus',    amount: 2000000,  direction: 'out', status: 'pending'   },
  { id: 6,  date: '20.01.2025', name: 'Irina Petrovna',   type: 'Maosh',    amount: 10012500, direction: 'out', status: 'completed' },
  { id: 7,  date: '22.01.2025', name: 'Kompaniya',        type: 'Xarajat',  amount: 7250000,  direction: 'out', status: 'completed' },
  { id: 8,  date: '25.01.2025', name: 'Mijoz to\'lovi',   type: 'Kirim',    amount: 18000000, direction: 'in',  status: 'completed' },
  { id: 9,  date: '28.01.2025', name: 'Sergei Ivanovich', type: 'Maosh',    amount: 11840000, direction: 'out', status: 'completed' },
  { id: 10, date: '30.01.2025', name: 'Natalia Fedorova', type: 'Maosh',    amount: 7410000,  direction: 'out', status: 'pending'   },
]

const TYPES = ['Barchasi', 'Maosh', 'Xarajat', 'Kirim', 'Bonus']
const DIRECTIONS = ['Barchasi', 'Kirim', 'Chiqim']

function fmt(n) {
  return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function FinanceHistoryPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState('Barchasi')
  const [direction, setDirection] = useState('Barchasi')

  const filtered = HISTORY_DATA.filter(h => {
    const q = search.toLowerCase()
    if (q && !h.name.toLowerCase().includes(q)) return false
    if (type !== 'Barchasi' && h.type !== type) return false
    if (direction === 'Kirim' && h.direction !== 'in') return false
    if (direction === 'Chiqim' && h.direction !== 'out') return false
    return true
  })

  const totalIn  = filtered.filter(h => h.direction === 'in').reduce((a, h) => a + h.amount, 0)
  const totalOut = filtered.filter(h => h.direction === 'out').reduce((a, h) => a + h.amount, 0)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">Moliya tarixi</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl px-4 py-3 border bg-white border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <p className="text-xs text-[#8F95A8] dark:text-[#C2C8E0]">Jami kirim</p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-0.5">+{fmt(totalIn)} <span className="text-xs font-normal text-[#8F95A8] dark:text-[#C2C8E0]">UZS</span></p>
        </div>
        <div className="rounded-xl px-4 py-3 border bg-white border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <p className="text-xs text-[#8F95A8] dark:text-[#C2C8E0]">Jami chiqim</p>
          <p className="text-lg font-bold text-[#E02D2D] dark:text-[#FA5252] mt-0.5">-{fmt(totalOut)} <span className="text-xs font-normal text-[#8F95A8] dark:text-[#C2C8E0]">UZS</span></p>
        </div>
        <div className="rounded-xl px-4 py-3 border bg-white border-[#E2E6F2] dark:bg-[#222323] dark:border-[#292A2A]">
          <p className="text-xs text-[#8F95A8] dark:text-[#C2C8E0]">Balans</p>
          <p className={`text-lg font-bold mt-0.5 ${totalIn - totalOut >= 0 ? 'text-green-600 dark:text-green-400' : 'text-[#E02D2D] dark:text-[#FA5252]'}`}>
            {totalIn - totalOut >= 0 ? '+' : ''}{fmt(totalIn - totalOut)} <span className="text-xs font-normal text-[#8F95A8] dark:text-[#C2C8E0]">UZS</span>
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative w-[220px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B6BCCB] dark:text-[#8E95B5]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Nomi bo'yicha izlash" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 rounded-lg text-sm outline-none transition-colors
              bg-white border border-[#E2E6F2] text-[#1A1D2E] placeholder-[#B6BCCB] focus:border-[#526ED3]
              dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF] dark:placeholder-[#8E95B5]" />
        </div>
        <select value={type} onChange={e => setType(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
            bg-white border border-[#E2E6F2] text-[#1A1D2E]
            dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF]">
          {TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={direction} onChange={e => setDirection(e.target.value)}
          className="px-3 py-2 rounded-lg text-sm outline-none cursor-pointer transition-colors
            bg-white border border-[#E2E6F2] text-[#1A1D2E]
            dark:bg-[#222323] dark:border-[#292A2A] dark:text-[#FFFFFF]">
          {DIRECTIONS.map(d => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-[#E2E6F2] dark:border-[#292A2A] bg-[#F8F9FC] dark:bg-[#222323]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2E6F2] dark:border-[#292A2A]">
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0] w-10">№</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Sana</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Nomi</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Turi</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Summa (UZS)</th>
              <th className="px-4 py-3 text-center font-medium text-[#5B6078] dark:text-[#C2C8E0]">Holat</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, idx) => (
              <tr key={h.id} className="border-b border-[#EEF1F7] dark:border-[#292A2A] transition-colors last:border-0 hover:bg-[#EEF1F7] dark:hover:bg-[#292A2A]">
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{idx + 1}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{h.date}</td>
                <td className="px-4 py-3 font-medium text-[#1A1D2E] dark:text-[#FFFFFF]">{h.name}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium
                    ${h.type === 'Kirim' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : h.type === 'Bonus' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-[#F1F3F9] text-[#5B6078] dark:bg-[#292A2A] dark:text-[#C2C8E0]'}`}>
                    {h.type}
                  </span>
                </td>
                <td className={`px-4 py-3 text-right font-semibold ${h.direction === 'in' ? 'text-green-600 dark:text-green-400' : 'text-[#1A1D2E] dark:text-[#FFFFFF]'}`}>
                  {h.direction === 'in' ? '+' : '-'}{fmt(h.amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  {h.status === 'completed'
                    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-500"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                    : <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Kutilmoqda</span>
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
    </div>
  )
}
