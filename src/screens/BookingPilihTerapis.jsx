import { useState, useMemo } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import StepIndicator from '../components/StepIndicator'
import TherapistCard from '../components/TherapistCard'
import { useDebounce } from '../hooks/useDebounce'
import { fisioterapis, jadwalOrder } from '../data/fisioterapis'

const MODE_FILTERS = ['Semua', 'Klinik', 'Homecare', 'Online', 'Top Rating']

const STEPS_5 = [
  { num: 1, label: 'Terapis' },
  { num: 2, label: 'Paket' },
  { num: 3, label: 'Jadwal' },
  { num: 4, label: 'Detail' },
  { num: 5, label: 'Bayar' },
]

export default function BookingPilihTerapis({ onNavigate }) {
  const [modeFilter, setModeFilter] = useState('Semua')
  const [searchRaw, setSearchRaw] = useState('')
  const [sortBy, setSortBy] = useState('jadwal')

  const search = useDebounce(searchRaw, 300)

  const results = useMemo(() => {
    let list = [...fisioterapis]
    if (modeFilter === 'Klinik') list = list.filter((f) => f.tersedia_klinik)
    else if (modeFilter === 'Homecare') list = list.filter((f) => f.tersedia_homecare)
    else if (modeFilter === 'Online') list = list.filter((f) => f.tersedia_online)
    else if (modeFilter === 'Top Rating') list = list.filter((f) => f.rating >= 4.7)

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((f) =>
        f.nama.toLowerCase().includes(q) ||
        f.spesialisasi.some((s) => s.toLowerCase().includes(q)) ||
        f.kondisi_ditangani.some((k) => k.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'rating_desc') list.sort((a, b) => b.rating - a.rating)
    else list.sort((a, b) => jadwalOrder(a.jadwal_terdekat) - jadwalOrder(b.jadwal_terdekat))

    return list
  }, [modeFilter, search, sortBy])

  // Fixed header: StatusBar 44 + nav bar 52 + step indicator 44 + filter chips 44 = 184px
  const HEADER_H = 184

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* ── FIXED HEADER ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
        <StatusBar />

        {/* Nav bar */}
        <div className="flex items-center gap-2 px-3 h-[52px]">
          <button onClick={() => onNavigate('booking-home')} className="text-[20px] text-[#1a1a1a]">←</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Pilih Terapis</p>
          <div className="w-6" />
        </div>

        {/* Step indicator 5-step */}
        <StepIndicator step={1} steps={STEPS_5} />

        {/* Search + filter */}
        <div className="px-3 pt-2 pb-2 border-t border-[#f0f0f0]">
          <div className="bg-[#f4f4f4] rounded-[10px] h-9 flex items-center px-3 gap-2 mb-2">
            <span className="text-[#9ca3af] text-[13px]">🔍</span>
            <input
              type="text"
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              placeholder="Cari fisioterapis atau kondisi..."
              className="flex-1 bg-transparent text-[11px] text-[#1a1a1a] placeholder-[#a6a6a6] outline-none"
            />
            {searchRaw && (
              <button onClick={() => setSearchRaw('')} className="text-[#9ca3af] text-[13px] leading-none">✕</button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {MODE_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setModeFilter(f)}
                className={`h-6 px-3 rounded-[12px] text-[10px] whitespace-nowrap flex-shrink-0 transition-colors ${
                  modeFilter === f
                    ? 'bg-[#2aa148] text-white font-semibold'
                    : 'bg-[#f4f4f4] text-[#6b7280]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* ── END FIXED HEADER ── */}

      <div style={{ height: HEADER_H }} />

      <div className="px-4 mt-3">
        <p className="text-[12px] text-[#6b7280] mb-3">
          {results.length} fisioterapis tersedia
        </p>

        {results.length === 0 ? (
          <div className="bg-white rounded-[12px] p-5 text-center shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)]">
            <p className="text-[14px] font-semibold text-[#1a1a1a]">Tidak ada fisioterapis ditemukan</p>
            <p className="text-[11px] text-[#6b7280] mt-1">Coba kata kunci lain</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((t) => (
              <TherapistCard
                key={t.id}
                terapis={t}
                actionLabel="Pilih"
                onAction={(terapis) => onNavigate('booking-pilih-paket', { terapis })}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav active="booking" onNavigate={onNavigate} />
    </div>
  )
}

