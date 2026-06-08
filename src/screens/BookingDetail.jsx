import { useState, useMemo } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'
import StepIndicator from '../components/StepIndicator'
import { areaTubuh, kondisiKhususDefault } from '../data/areaTubuh'

const modes = [
  { id: 'klinik', label: 'Klinik', note: 'Bayar penuh' },
  { id: 'homecare', label: 'Homecare', note: 'DP + sisa di tempat' },
  { id: 'online', label: 'Online', note: 'Bayar penuh' },
]

/** Bottom sheet untuk pilih area tubuh */
function AreaTubuhSheet({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sheet */}
      <div className="relative bg-white rounded-t-[20px] max-h-[75vh] overflow-hidden flex flex-col w-full left-1/2 -translate-x-1/2" style={{ maxWidth: 390 }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f0f0]">
          <p className="text-[14px] font-semibold text-[#1a1a1a]">Pilih Area Tubuh</p>
          <button onClick={onClose} className="text-[#9ca3af] text-[18px] leading-none">✕</button>
        </div>
        <div className="overflow-y-auto flex-1 pb-4">
          {areaTubuh.map((area) => (
            <button
              key={area.id}
              onClick={() => { onSelect(area); onClose() }}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[#f8f9fa] border-b border-[#f5f5f5] last:border-0 text-left"
            >
              <span className="text-[22px] w-8 flex-shrink-0">{area.icon}</span>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#1a1a1a]">{area.label}</p>
                <p className="text-[10px] text-[#6b7280]">{area.keluhanUmum.length} keluhan umum</p>
              </div>
              <span className="text-[#d1d5db] text-[16px]">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BookingDetail({ onNavigate }) {
  const [mode, setMode] = useState('klinik')
  const [selectedArea, setSelectedArea] = useState(null)
  const [showAreaSheet, setShowAreaSheet] = useState(false)
  const [keluhan, setKeluhan] = useState('')
  const [selectedKondisi, setSelectedKondisi] = useState(['none'])

  // TASK 4 — Kondisi khusus dinamis per area
  const kondisiList = useMemo(() => {
    if (!selectedArea) return kondisiKhususDefault
    return [
      ...kondisiKhususDefault,
      ...selectedArea.kondisiKhususTambahan.map((label) => ({
        id: label.toLowerCase().replace(/\s+/g, '_'),
        label,
      })),
    ]
  }, [selectedArea])

  function toggleKondisi(id) {
    if (id === 'none') {
      setSelectedKondisi(['none'])
    } else {
      setSelectedKondisi((prev) => {
        const without = prev.filter((k) => k !== 'none')
        if (without.includes(id)) return without.filter((k) => k !== id) || ['none']
        return [...without, id]
      })
    }
  }

  function handleLanjut() {
    // Pass selectedArea ke BookingPilihPaket untuk smart highlight
    onNavigate('booking-pilih-paket', { selectedArea })
  }

  // StatusBar 44 + Title 52 + StepIndicator 52 = 148px
  const HEADER_H = 148

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[160px]">

      {/* ── FIXED HEADER ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
        <StatusBar />
        <div className="flex items-center px-4 h-[52px]">
          <button onClick={() => onNavigate('booking-jadwal')} className="text-[20px] text-[#1a1a1a]">←</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Detail Sesi</p>
        </div>
        <StepIndicator step={2} />
      </div>

      {/* Spacer setinggi fixed header */}
      <div style={{ height: HEADER_H }} />

      {/* Hold timer */}
      <div className="mx-4 mt-3 bg-[#fef3dc] rounded-[8px] h-8 flex items-center px-3">
        <span className="text-[11px] font-medium text-[#f59e0b]">⏱ Slot on-hold: 24:38 tersisa</span>
      </div>

      {/* Booking summary */}
      <div className="mx-4 mt-2 bg-white rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-3 flex items-center gap-3">
        <Avatar initials="RK" size="sm" />
        <div>
          <p className="text-[12px] font-semibold text-[#1a1a1a]">Rina Kusuma, S.Ft</p>
          <p className="text-[10px] text-[#6b7280]">Jum, 28 Mei 2026 · 10:00 WIB · Klinik</p>
        </div>
      </div>

      <div className="px-4 mt-3 flex flex-col gap-4">
        {/* Mode */}
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Mode Layanan</p>
          <div className="flex gap-2">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex-1 rounded-[10px] p-2 border-[1.5px] transition-colors ${
                  mode === m.id ? 'bg-[#e8f6eb] border-[#2aa148]' : 'bg-white border-transparent shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]'
                }`}
              >
                <p className={`text-[12px] font-semibold ${mode === m.id ? 'text-[#2aa148]' : 'text-[#1a1a1a]'}`}>{m.label}</p>
                <p className="text-[9px] text-[#6b7280]">{m.note}</p>
              </button>
            ))}
          </div>
        </div>

        {/* TASK 1 — Area Tubuh Dropdown */}
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-1">Area Tubuh</p>
          <button
            onClick={() => setShowAreaSheet(true)}
            className={`w-full flex items-center justify-between px-3 h-11 rounded-[10px] border border-[#e5e9eb] bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] ${
              selectedArea ? 'text-[#1a1a1a]' : 'text-[#9ca3af]'
            }`}
          >
            <div className="flex items-center gap-2">
              {selectedArea ? (
                <>
                  <span className="text-[16px]">{selectedArea.icon}</span>
                  <span className="text-[11px] font-medium">{selectedArea.label}</span>
                </>
              ) : (
                <span className="text-[11px]">Pilih area tubuh yang bermasalah</span>
              )}
            </div>
            <span className="text-[12px] text-[#6b7280]">▾</span>
          </button>
        </div>

        {/* TASK 2 — Keluhan Utama + Suggestion Chips */}
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-1">Keluhan Utama</p>
          <input
            value={keluhan}
            onChange={(e) => setKeluhan(e.target.value)}
            className="w-full border border-[#e5e9eb] rounded-[10px] h-11 px-3 text-[11px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none focus:border-[#2aa148]"
            placeholder="Contoh: Nyeri punggung bawah setelah duduk lama"
          />

          {/* Suggestion chips */}
          <div className="mt-2">
            {selectedArea ? (
              <>
                <p className="text-[10px] text-[#6b7280] mb-1.5">
                  Keluhan umum {selectedArea.label}:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArea.keluhanUmum.map((k) => (
                    <button
                      key={k}
                      onClick={() => setKeluhan(k)}
                      className={`h-7 px-2.5 rounded-full text-[10px] border transition-colors ${
                        keluhan === k
                          ? 'bg-[#2aa148] text-white border-[#2aa148] font-medium'
                          : 'bg-white text-[#2aa148] border-[#2aa148]'
                      }`}
                    >
                      {k}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-[10px] text-[#9ca3af] italic">Pilih area tubuh dulu untuk melihat keluhan umum</p>
            )}
          </div>
        </div>

        {/* TASK 4 — Kondisi Khusus dinamis */}
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Kondisi Khusus</p>
          <div className="flex flex-col gap-2">
            {kondisiList.map((opt) => (
              <button
                key={opt.id}
                onClick={() => toggleKondisi(opt.id)}
                className="flex items-center gap-3 text-left"
              >
                <div className={`w-[14px] h-[14px] rounded-[4px] flex items-center justify-center flex-shrink-0 ${
                  selectedKondisi.includes(opt.id) ? 'bg-[#2aa148]' : 'bg-white border border-[#e5e9eb]'
                }`}>
                  {selectedKondisi.includes(opt.id) && <span className="text-[9px] font-bold text-white">✓</span>}
                </div>
                <span className="text-[12px] text-[#1a1a1a]">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Catatan */}
        <div className="pb-2">
          <div className="flex items-center mb-1">
            <p className="text-[13px] font-semibold text-[#1a1a1a]">Catatan untuk Fisioterapis</p>
            <span className="ml-auto text-[10px] text-[#6b7280]">Opsional</span>
          </div>
          <textarea
            className="w-full border border-[#e5e9eb] rounded-[10px] h-[80px] px-3 py-2 text-[11px] text-[#1a1a1a] placeholder-[#bfbfbf] outline-none resize-none focus:border-[#2aa148]"
            placeholder="Informasi tambahan atau permintaan khusus"
          />
        </div>
      </div>

      {/* CTA — fixed di atas bottom nav */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-[390px] px-4 py-3 bg-white border-t border-[#e5e9eb] shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleLanjut}
          className="w-full bg-[#2aa148] text-white text-[13px] font-semibold rounded-[10px] h-10"
        >
          Lanjut – Ringkasan & Bayar
        </button>
      </div>

      <BottomNav active="booking" onNavigate={onNavigate} />

      {/* Bottom Sheet */}
      {showAreaSheet && (
        <AreaTubuhSheet
          onSelect={setSelectedArea}
          onClose={() => setShowAreaSheet(false)}
        />
      )}
    </div>
  )
}
