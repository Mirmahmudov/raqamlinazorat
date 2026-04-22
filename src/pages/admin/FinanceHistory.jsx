import { useState } from 'react'
import { FaFilter } from 'react-icons/fa6'

const HISTORY_DATA = [
  { id: 1,  name: 'Doston Dostonov Dostonovich', expense: 'Ishlab chiqarish', amount: 10000000, type: 'Chiqim', date: '01.01.2000 20:00', approved: true  },
  { id: 2,  name: 'Doston Dostonov Dostonovich', expense: 'Ishlab chiqarish', amount: 10000000, type: 'Chiqim', date: '01.01.2000 20:00', approved: true  },
  { id: 3,  name: 'Doston Dostonov Dostonovich', expense: 'Ishlab chiqarish', amount: 10000000, type: 'Chiqim', date: '01.01.2000 20:00', approved: true  },
  { id: 4,  name: 'Doston Dostonov Dostonovich', expense: 'Ishlab chiqarish', amount: 10000000, type: 'Chiqim', date: '01.01.2000 20:00', approved: true  },
  { id: 5,  name: 'Alyona Sokolova',             expense: 'Maosh',            amount: 8575000,  type: 'Chiqim', date: '01.01.2025 10:00', approved: true  },
  { id: 6,  name: 'Mijoz to\'lovi',              expense: 'Kirim',            amount: 25000000, type: 'Kirim',  date: '10.01.2025 14:30', approved: true  },
  { id: 7,  name: 'Timur Akhmedov',              expense: 'Bonus',            amount: 2000000,  type: 'Chiqim', date: '15.01.2025 09:00', approved: false },
  { id: 8,  name: 'Kompaniya',                   expense: 'Xarajat',          amount: 7250000,  type: 'Chiqim', date: '22.01.2025 11:00', approved: true  },
]

const TYPES = ['Barchasi', 'Kirim', 'Chiqim']

function fmt(n) {
  return n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function FinanceHistoryPage() {
  const [search, setSearch]     = useState('')
  const [typeFilter, setType]   = useState('Barchasi')

  const filtered = HISTORY_DATA.filter(h => {
    const q = search.toLowerCase()
    if (q && !h.name.toLowerCase().includes(q)) return false
    if (typeFilter !== 'Barchasi' && h.type !== typeFilter) return false
    return true
  })

  return (
    <div className="flex flex-col gap-4">

      {/* Header */}
      <h1 className="text-2xl font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">Tarix</h1>

      {/* Filters */}
      <div className="flex items-center gap-2">
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
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0] w-10">№</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Ism sharifi</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Xarajat</th>
              <th className="px-4 py-3 text-right font-medium text-[#5B6078] dark:text-[#C2C8E0]">Miqdor (UZS)</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Turi</th>
              <th className="px-4 py-3 text-left font-medium text-[#5B6078] dark:text-[#C2C8E0]">Sana</th>
              <th className="px-4 py-3 text-center font-medium text-[#5B6078] dark:text-[#C2C8E0]">Tasdiqlanish</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, idx) => (
              <tr key={h.id}
                className="border-b border-[#EEF1F7] dark:border-[#292A2A] transition-colors last:border-0 hover:bg-[#F8F9FC] dark:hover:bg-[#292A2A]">
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{idx + 1}</td>
                <td className="px-4 py-3 font-medium text-[#1A1D2E] dark:text-[#FFFFFF]">{h.name}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{h.expense}</td>
                <td className="px-4 py-3 text-right font-bold text-[#1A1D2E] dark:text-[#FFFFFF]">{fmt(h.amount)}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{h.type}</td>
                <td className="px-4 py-3 text-[#5B6078] dark:text-[#C2C8E0]">{h.date}</td>
                <td className="px-4 py-3 text-center">
                  {h.approved ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-green-500">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-[#E02D2D]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 3l6 6M9 3l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                  )}
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
