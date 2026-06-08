import { useState, useEffect, useMemo } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { fisioterapis, jadwalOrder } from '../data/fisioterapis'

const MODE_FILTERS = ['Semua', 'Klinik', 'Homecare', 'Online', 'Top Rating']

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// Step indicator khusus 5-step untuk flow dari BookingHome
function StepIndicator5({ step }) {
  const steps = [
    { num: 1, label: 'Terapis' },
    { num: 2, label: 'Paket' },
    { num: 3, label: 'Jadwal' },
    { num: 4, label: 'Detail' },
    { num: 5, label: 'Bayar' },
  ]
  return (
    <div className="bg-white h-[44px] flex items-center justify-center px-3 border-b border-[#e5e9eb]">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className={`h-[20px] flex items-center px-2 rounded-full text-[9px] font-semibold whitespace-nowrap ${
            s.num < step
              ? 'bg-[#e8f6eb] text-[#2aa148]'
              : s.num === step
              ? 'bg-[#2aa148] text-white'
              : 'bg-[#f0f0f0] text-[#9ca3af]'
          }`}>
            {s.num < step ? `✓ ${s.label}` : `${s.num} ${s.label}`}
          </div>
          {i < 4 && <div className="w-2 h-px bg-[#e5e9eb] mx-0.5" />}
        </div>
      ))}
    </div>
  )
}

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
        <StepIndicator5 step={1} />

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
              <TerapisCard key={t.id} terapis={t} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>

      <BottomNav active="booking" onNavigate={onNavigate} />
    </div>
  )
}

function TerapisCard({ terapis: t, onNavigate }) {
  return (
    <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] p-3">
      <div className="flex gap-3">
        <Avatar initials={t.inisial} size="lg" />
        <div className="flex-1 min-w-0">
          <Badge label={t.status === 'ruang_fisio' ? 'Ruang Fisio' : 'Mitra ✓'} />
          <p className="text-[13px] font-semibold text-[#1a1a1a] mt-0.5">{t.nama}, {t.gelar}</p>
          <p className="text-[11px] text-[#6b7280]">{t.spesialisasi.join(' · ')}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[11px] text-[#ffbd18]">{'★'.repeat(Math.round(t.rating))}</span>
            <span className="text-[10px] text-[#6b7280]">{t.rating} · {t.jumlah_ulasan} ulasan</span>
          </div>
          <p className="text-[9px] text-[#6b7280] mt-0.5">
            {t.mode_layanan.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(' · ')} · ⏰ {t.jadwal_terdekat}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          <p className="text-[12px] font-semibold text-[#2aa148]">
            Rp {t.harga_mulai.toLocaleString('id-ID')}
          </p>
          <button
            onClick={() => onNavigate('booking-pilih-paket', { terapis: t })}
            className="bg-[#2aa148] text-white text-[10px] font-semibold rounded-[6px] px-4 h-6"
          >
            Pilih
          </button>
        </div>
      </div>
    </div>
  )
}
