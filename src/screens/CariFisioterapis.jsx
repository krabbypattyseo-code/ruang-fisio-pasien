import { useState, useEffect, useMemo } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import TherapistCard from '../components/TherapistCard'
import { useDebounce } from '../hooks/useDebounce'
import { fisioterapis, SPESIALISASI_LIST, jadwalOrder } from '../data/fisioterapis'

const MODE_FILTERS = ['Semua', 'Klinik', 'Homecare', 'Online', 'Top Rating']
const SORT_OPTIONS = [
  { id: 'jadwal', label: 'Jadwal Terdekat' },
  { id: 'rating_desc', label: 'Rating Tertinggi' },
  { id: 'harga_asc', label: 'Harga Terendah' },
  { id: 'harga_desc', label: 'Harga Tertinggi' },
]

const MODE_CARDS = [
  {
    id: 'Klinik',
    title: 'Klinik',
    sub: 'Di klinik RF',
    details: ['⏱ 45–90 mnt/sesi', '💳 Bayar penuh di awal', '📍 Tangerang'],
    harga: 'Mulai Rp 300.000',
  },
  {
    id: 'Homecare',
    title: 'Homecare',
    sub: 'Terapis ke rumah',
    details: ['🚗 +Rp 5.000/km (PP)', '💳 DP 50% + sisa', '📍 Tangerang Raya'],
    harga: 'Mulai Rp 300.000',
  },
  {
    id: 'Online',
    title: 'Online',
    sub: 'Video call',
    details: ['💻 Meet / Zoom', '⏱ 30–60 mnt/sesi', '💳 Bayar penuh'],
    harga: 'Mulai Rp 150.000',
  },
]

export default function LayananPage({ onNavigate, initialSpesialisasi = null, initialModeFilter = 'Semua' }) {
  const [modeFilter, setModeFilter] = useState(initialModeFilter || 'Semua')
  const [spesialisasiFilter, setSpesialisasiFilter] = useState(initialSpesialisasi)
  const [searchRaw, setSearchRaw] = useState('')
  const [sortBy, setSortBy] = useState('jadwal')
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  const search = useDebounce(searchRaw, 300)

  useEffect(() => {
    setSpesialisasiFilter(initialSpesialisasi)
  }, [initialSpesialisasi])

  useEffect(() => {
    if (modeFilter === 'Top Rating') setSortBy('rating_desc')
  }, [modeFilter])

  const results = useMemo(() => {
    let list = [...fisioterapis]
    if (modeFilter === 'Klinik') list = list.filter((f) => f.tersedia_klinik)
    else if (modeFilter === 'Homecare') list = list.filter((f) => f.tersedia_homecare)
    else if (modeFilter === 'Online') list = list.filter((f) => f.tersedia_online)
    else if (modeFilter === 'Top Rating') list = list.filter((f) => f.rating >= 4.7)

    if (spesialisasiFilter) {
      const target = spesialisasiFilter.toLowerCase()
      list = list.filter((f) =>
        f.spesialisasi.some((s) => s.toLowerCase() === target)
      )
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((f) =>
        f.nama.toLowerCase().includes(q) ||
        f.spesialisasi.some((s) => s.toLowerCase().includes(q)) ||
        f.kondisi_ditangani.some((k) => k.toLowerCase().includes(q))
      )
    }

    if (sortBy === 'rating_desc') list.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'harga_asc') list.sort((a, b) => a.harga_mulai - b.harga_mulai)
    else if (sortBy === 'harga_desc') list.sort((a, b) => b.harga_mulai - a.harga_mulai)
    else list.sort((a, b) => jadwalOrder(a.jadwal_terdekat) - jadwalOrder(b.jadwal_terdekat))

    return list
  }, [modeFilter, spesialisasiFilter, search, sortBy])

  function handleModeFilter(f) {
    setModeFilter(f)
    if (f !== 'Top Rating') setSortBy('jadwal')
  }

  function handleModeCard(id) {
    // Toggle: tap card yang sudah aktif → kembali ke Semua
    if (modeFilter === id) {
      setModeFilter('Semua')
      setSortBy('jadwal')
    } else {
      handleModeFilter(id)
    }
  }

  function clearSpesialisasi() {
    setSpesialisasiFilter(null)
  }

  const currentSort = SORT_OPTIONS.find((s) => s.id === sortBy)

  const counterLabel = (() => {
    const n = results.length
    if (search.trim()) return `${n} fisioterapis ditemukan untuk "${search.trim()}"`
    return `${n} fisioterapis ditemukan`
  })()

  // Fixed header: StatusBar 44 + search bar 52 + filter chips 44 = 140px
  const HEADER_H = 140

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* ── FIXED HEADER ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.09)]">
        <StatusBar />

        {/* Title + Search bar */}
        <div className="flex items-center gap-2 px-3 h-[52px]">
          <p className="text-[15px] font-bold text-[#1a1a1a] mr-1">Layanan</p>
          <div className="flex-1 bg-[#f4f4f4] rounded-[10px] h-10 flex items-center px-3 gap-2">
            <span className="text-[#9ca3af] text-[14px]">🔍</span>
            <input
              type="text"
              value={searchRaw}
              onChange={(e) => setSearchRaw(e.target.value)}
              placeholder="Cari fisioterapis atau kondisi..."
              className="flex-1 bg-transparent text-[11px] text-[#1a1a1a] placeholder-[#a6a6a6] outline-none"
            />
            {searchRaw && (
              <button onClick={() => setSearchRaw('')} className="text-[#9ca3af] text-[14px] leading-none">✕</button>
            )}
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 px-4 py-2 overflow-x-auto border-t border-[#f0f0f0]">
          {MODE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => handleModeFilter(f)}
              className={`h-7 px-3 rounded-[14px] text-[11px] whitespace-nowrap flex-shrink-0 transition-colors ${
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
      {/* ── END FIXED HEADER ── */}

      <div style={{ height: HEADER_H }} />

      {/* ── 3 CARD MODE LAYANAN ── */}
      <div className="px-4 pt-4 pb-3">
        <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Mode Layanan</p>
        <div className="flex gap-2">
          {MODE_CARDS.map((card) => {
            const isActive = modeFilter === card.id
            return (
              <button
                key={card.id}
                onClick={() => handleModeCard(card.id)}
                className={`flex-1 rounded-[10px] p-2.5 text-left transition-all border-[1.5px] ${
                  isActive
                    ? 'bg-[#e8f5ed] border-[#2aa148] shadow-[0px_2px_8px_0px_rgba(42,161,72,0.15)]'
                    : 'bg-white border-[#e5e7eb] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]'
                }`}
              >
                <p className={`text-[12px] font-bold ${isActive ? 'text-[#2aa148]' : 'text-[#1a1a1a]'}`}>
                  {card.title}
                </p>
                <p className="text-[9px] text-[#6b7280] mt-0.5">{card.sub}</p>
                <div className="mt-2 flex flex-col gap-0.5">
                  {card.details.map((d) => (
                    <p key={d} className="text-[9px] text-[#6b7280] leading-tight">{d}</p>
                  ))}
                </div>
                <p className={`text-[9px] font-semibold mt-2 ${isActive ? 'text-[#2aa148]' : 'text-[#2aa148]'}`}>
                  {card.harga}
                </p>
                {isActive && (
                  <span className="inline-block mt-1 text-[8px] font-semibold text-[#2aa148] bg-white border border-[#2aa148] rounded-full px-1.5 py-0.5">
                    ✓ Aktif
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-4">
        {/* Banner spesialisasi filter */}
        {spesialisasiFilter && (
          <div className="border border-[#1a7a3c] bg-[#e8f5ed] rounded-[10px] px-3 py-2 mb-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#1a7a3c]">
                🔍 Fisioterapis Spesialis {spesialisasiFilter}
              </p>
              <p className="text-[10px] text-[#1a7a3c]">{results.length} fisioterapis ditemukan</p>
            </div>
            <button
              onClick={clearSpesialisasi}
              className="text-[#1a7a3c] text-[11px] font-semibold flex items-center gap-1 bg-white border border-[#1a7a3c] rounded-full px-2 py-0.5"
            >
              ✕ Hapus filter
            </button>
          </div>
        )}

        {/* Counter + sort */}
        <div className="flex items-center mb-3">
          <span className="text-[12px] text-[#6b7280]">{counterLabel}</span>
          <div className="ml-auto relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="text-[12px] font-medium text-[#2aa148] flex items-center gap-1"
            >
              ⇅ {currentSort?.label}
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 top-7 bg-white border border-[#e5e9eb] rounded-[10px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] z-50 min-w-[180px] overflow-hidden">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => { setSortBy(opt.id); setShowSortDropdown(false) }}
                    className={`w-full text-left px-4 py-2.5 text-[12px] border-b border-[#f0f0f0] last:border-0 ${
                      sortBy === opt.id ? 'text-[#2aa148] font-semibold bg-[#f0faf4]' : 'text-[#1a1a1a]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* List fisioterapis — tombol "Lihat" ke profil terapis, bukan ke booking */}
        {results.length === 0 ? (
          <EmptyState query={search} onFilter={(s) => setSpesialisasiFilter(s)} />
        ) : (
          <div className="flex flex-col gap-3">
            {results.map((t) => (
              <TherapistCard
                key={t.id}
                terapis={t}
                actionLabel="Lihat"
                onAction={(terapis) => onNavigate('profil-terapis', { terapis })}
              />
            ))}
          </div>
        )}
      </div>

      {showSortDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowSortDropdown(false)} />
      )}

      <BottomNav active="layanan" onNavigate={onNavigate} />
    </div>
  )
}


function EmptyState({ query, onFilter }) {
  const suggestions = ['Muskuloskeletal', 'Neurologi', 'Cedera Olahraga']
  return (
    <div className="bg-white rounded-[12px] p-5 text-center mt-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)]">
      <p className="text-[14px] font-semibold text-[#1a1a1a]">
        {query ? `Tidak ada fisioterapis untuk "${query}"` : 'Tidak ada fisioterapis ditemukan'}
      </p>
      <p className="text-[11px] text-[#6b7280] mt-1">
        Coba cari dengan nama lengkap atau kondisi medis
      </p>
      <div className="flex justify-center gap-2 mt-3">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onFilter(s)}
            className="bg-[#e8f6eb] text-[#2aa148] text-[10px] font-medium rounded-full px-3 h-7"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
