import { useState, useMemo, useEffect } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import StepIndicator from '../components/StepIndicator'
import { fisioterapis } from '../data/fisioterapis'
import { getJadwal } from '../utils/jadwal'
import { getJadwalBulan } from '../api'

const DEFAULT_TERAPIS = fisioterapis[0]
const DEFAULT_PKG = { sesi: 1, perSesi: 300000, total: 300000, save: null, popular: false }

const TODAY = { year: 2026, month: 5, date: 26 }
const MIN_MONTH = { year: 2026, month: 5 }
const MAX_MONTH = { year: 2026, month: 7 }

const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const MONTH_NAMES = ['', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']
const MODES = [
  { id: 'klinik', label: 'Klinik', note: 'Bayar penuh' },
  { id: 'homecare', label: 'Homecare', note: 'DP + sisa di tempat' },
  { id: 'online', label: 'Online', note: 'Bayar penuh' },
]

function generateCalendar(year, month) {
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  while (cells.length % 7 !== 0) cells.push(null)
  const rows = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))
  return rows
}

function isDateAvailable(year, month, date, terapis) {
  const dayOfWeek = new Date(year, month - 1, date).getDay()
  if (dayOfWeek === 0) return false
  const dayName = DAY_LABELS[dayOfWeek]
  const jadwal = getJadwal(terapis)
  const found = jadwal.find(j => j.day === dayName)
  return found ? found.available : false
}

function isPast(year, month, date) {
  if (year < TODAY.year) return true
  if (year === TODAY.year && month < TODAY.month) return true
  if (year === TODAY.year && month === TODAY.month && date <= TODAY.date) return true
  return false
}

function dateKey(year, month, date) {
  return `${year}-${month}-${date}`
}

function dayLabel(year, month, date) {
  return DAY_LABELS[new Date(year, month - 1, date).getDay()]
}

export default function BookingJadwal({ onNavigate, selectedPkg: pkgProp = null, terapis: terapisProp = null, layanan = 'Fisioterapi Umum', initialDates = [], initialTimes = {}, initialMode = 'klinik', backScreen = 'booking-pilih-paket', backState = null }) {
  const terapis = terapisProp || DEFAULT_TERAPIS
  const pkg = pkgProp || DEFAULT_PKG
  const maxDates = pkg.sesi  // max tanggal = jumlah sesi

  const [curYear, setCurYear] = useState(2026)
  const [curMonth, setCurMonth] = useState(5)
  const [mode, setMode] = useState(initialMode)
  const [bookedSlots, setBookedSlots] = useState({}) // { 'YYYY-MM-DD': ['09:00', ...] }

  // selectedDates: array of {year, month, date} sorted by date
  const [selectedDates, setSelectedDates] = useState(initialDates)
  // selectedTimes: { 'key': '10:00', ... }
  const [selectedTimes, setSelectedTimes] = useState(initialTimes)

  const calendarRows = useMemo(() => generateCalendar(curYear, curMonth), [curYear, curMonth])

  // Fetch slot terisi dari API saat bulan berubah
  useEffect(() => {
    getJadwalBulan(terapis.id, curYear, curMonth)
      .then(data => {
        const filled = {}
        for (const [date, slots] of Object.entries(data)) {
          const terisi = slots.filter(s => s.status === 'terisi').map(s => s.jam)
          if (terisi.length) filled[date] = terisi
        }
        setBookedSlots(filled)
      })
      .catch(() => setBookedSlots({}))
  }, [curYear, curMonth, terapis.id])

  const canGoPrev = !(curYear === MIN_MONTH.year && curMonth === MIN_MONTH.month)
  const canGoNext = !(curYear === MAX_MONTH.year && curMonth === MAX_MONTH.month)

  function prevMonth() {
    if (!canGoPrev) return
    curMonth === 1 ? (setCurYear(y => y - 1), setCurMonth(12)) : setCurMonth(m => m - 1)
  }
  function nextMonth() {
    if (!canGoNext) return
    curMonth === 12 ? (setCurYear(y => y + 1), setCurMonth(1)) : setCurMonth(m => m + 1)
  }

  function handleSelectDate(date) {
    if (!date) return
    if (isPast(curYear, curMonth, date)) return
    if (!isDateAvailable(curYear, curMonth, date, terapis)) return

    const key = dateKey(curYear, curMonth, date)
    const existing = selectedDates.findIndex(d => dateKey(d.year, d.month, d.date) === key)

    if (existing !== -1) {
      // Deselect
      setSelectedDates(prev => prev.filter((_, i) => i !== existing))
      setSelectedTimes(prev => { const next = { ...prev }; delete next[key]; return next })
    } else if (selectedDates.length < maxDates) {
      // Select (sorted by date)
      const newEntry = { year: curYear, month: curMonth, date }
      setSelectedDates(prev =>
        [...prev, newEntry].sort((a, b) =>
          new Date(a.year, a.month - 1, a.date) - new Date(b.year, b.month - 1, b.date)
        )
      )
    }
  }

  function handleSelectTime(key, time) {
    setSelectedTimes(prev => ({ ...prev, [key]: time }))
  }

  const allTimesSelected = selectedDates.length === maxDates &&
    selectedDates.every(d => selectedTimes[dateKey(d.year, d.month, d.date)])

  const canContinue = selectedDates.length === maxDates && allTimesSelected

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[160px]">
      <StatusBar />

      <div className="bg-white flex items-center px-4 h-[52px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate(backScreen, backState || { terapis })} className="text-[20px] text-[#1a1a1a]">←</button>
        <p className="flex-1 text-center text-[16px] font-semibold text-[#1a1a1a]">Mode & Jadwal</p>
      </div>

      <StepIndicator step={2} />

      {/* Paket terpilih */}
      <div className="mx-4 mt-2 bg-white rounded-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] p-3 flex items-center gap-3">
        <Avatar initials={terapis.inisial} size="md" />
        <div className="flex-1">
          <Badge label={terapis.status === 'ruang_fisio' ? 'Ruang Fisio' : 'Mitra ✓'} />
          <p className="text-[12px] font-semibold text-[#1a1a1a] mt-0.5">{terapis.nama}, {terapis.gelar}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[11px] font-bold text-[#2aa148]">{pkg.sesi} Sesi</p>
          <p className="text-[10px] text-[#6b7280]">Rp {pkg.total.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Hold notice */}
      <div className="mx-4 mt-2 bg-[#fef3dc] rounded-[8px] h-8 flex items-center px-3">
        <span className="text-[11px] font-medium text-[#f59e0b]">
          ⏱ Pilih {maxDates} tanggal — slot di-hold 30 menit setelah dipilih
        </span>
      </div>

      {/* Mode Layanan */}
      <div className="mx-4 mt-3">
        <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Mode Layanan</p>
        <div className="flex gap-2">
          {MODES.map((m) => {
            const avail = terapis[`tersedia_${m.id}`]
            if (!avail) return null
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`flex-1 rounded-[10px] p-2 border-[1.5px] transition-all ${
                  mode === m.id ? 'bg-[#e8f6eb] border-[#2aa148]' : 'bg-white border-transparent shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]'
                }`}
              >
                <p className={`text-[12px] font-semibold ${mode === m.id ? 'text-[#2aa148]' : 'text-[#1a1a1a]'}`}>{m.label}</p>
                <p className="text-[9px] text-[#6b7280]">{m.note}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Kalender */}
      <div className="mx-4 mt-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[13px] font-semibold text-[#1a1a1a]">Pilih Tanggal</p>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
            selectedDates.length === maxDates ? 'bg-[#2aa148] text-white' : 'bg-[#f4f4f4] text-[#6b7280]'
          }`}>
            {selectedDates.length}/{maxDates} dipilih
          </span>
        </div>

        <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden">
          {/* Nav bulan */}
          <div className="flex items-center justify-between px-4 h-11 border-b border-[#f5f5f5]">
            <button onClick={prevMonth} disabled={!canGoPrev}
              className={`text-[20px] w-8 h-8 flex items-center justify-center rounded-full ${canGoPrev ? 'text-[#2aa148] hover:bg-[#e8f6eb]' : 'text-[#d1d5db] cursor-default'}`}>‹</button>
            <p className="text-[14px] font-bold text-[#1a1a1a]">{MONTH_NAMES[curMonth]} {curYear}</p>
            <button onClick={nextMonth} disabled={!canGoNext}
              className={`text-[20px] w-8 h-8 flex items-center justify-center rounded-full ${canGoNext ? 'text-[#2aa148] hover:bg-[#e8f6eb]' : 'text-[#d1d5db] cursor-default'}`}>›</button>
          </div>

          {/* Pill bulan */}
          <div className="flex justify-center gap-2 py-2 border-b border-[#f5f5f5]">
            {[5, 6, 7].map((m) => (
              <button key={m} onClick={() => setCurMonth(m)}
                className={`h-6 px-3 rounded-full text-[10px] font-medium transition-colors ${curMonth === m ? 'bg-[#2aa148] text-white' : 'bg-[#f4f4f4] text-[#6b7280]'}`}>
                {MONTH_NAMES[m].slice(0, 3)}
              </button>
            ))}
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 text-center px-2 pt-2">
            {DAY_LABELS.map(d => (
              <span key={d} className="text-[10px] font-medium text-[#9ca3af] py-1">{d}</span>
            ))}
          </div>

          {/* Dates */}
          <div className="px-2 pb-2">
            {calendarRows.map((row, ri) => (
              <div key={ri} className="grid grid-cols-7 text-center">
                {row.map((date, di) => {
                  if (!date) return <div key={`e-${ri}-${di}`} className="h-9" />
                  const past = isPast(curYear, curMonth, date)
                  const available = isDateAvailable(curYear, curMonth, date, terapis)
                  const key = dateKey(curYear, curMonth, date)
                  const isSelected = selectedDates.some(d => dateKey(d.year, d.month, d.date) === key)
                  const order = selectedDates.findIndex(d => dateKey(d.year, d.month, d.date) === key)
                  const isMaxed = !isSelected && selectedDates.length >= maxDates
                  const disabled = past || !available || isMaxed

                  return (
                    <button key={`${ri}-${di}`} disabled={disabled} onClick={() => handleSelectDate(date)}
                      className={`h-9 w-9 mx-auto flex items-center justify-center rounded-full text-[12px] transition-all relative ${
                        isSelected
                          ? 'bg-[#2aa148] text-white font-bold shadow-[0px_2px_6px_0px_rgba(42,161,72,0.35)]'
                          : past
                          ? 'text-[#e0e0e0] cursor-default'
                          : !available
                          ? 'text-[#d1d5db] cursor-default bg-[#fafafa]'
                          : isMaxed
                          ? 'text-[#c4c4c4] cursor-default'
                          : 'text-[#1a1a1a] hover:bg-[#e8f6eb] cursor-pointer'
                      }`}
                    >
                      {date}
                      {isSelected && maxDates > 1 && (
                        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#f59e0b] rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                          {order + 1}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legenda */}
          <div className="flex gap-3 px-4 pb-3 pt-1 border-t border-[#f5f5f5]">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#2aa148]" /><span className="text-[9px] text-[#6b7280]">Tersedia</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#d1d5db]" /><span className="text-[9px] text-[#6b7280]">Terapis libur</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#e0e0e0]" /><span className="text-[9px] text-[#6b7280]">Sudah lewat</span></div>
          </div>
        </div>
      </div>

      {/* ── SLOT WAKTU PER TANGGAL ── */}
      {selectedDates.length > 0 && (
        <div className="mx-4 mt-4 flex flex-col gap-4">
          {selectedDates.map((d, idx) => {
            const key = dateKey(d.year, d.month, d.date)
            const dLabel = dayLabel(d.year, d.month, d.date)
            return (
              <div key={key} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="flex items-center px-4 py-2.5 border-b border-[#f5f5f5]">
                  {maxDates > 1 && (
                    <span className="w-5 h-5 bg-[#f59e0b] rounded-full text-[9px] font-bold text-white flex items-center justify-center mr-2 flex-shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">
                    Slot Tersedia — {dLabel}, {d.date} {MONTH_NAMES[d.month]}
                  </p>
                  {selectedTimes[key] && (
                    <span className="ml-auto text-[10px] font-semibold text-[#2aa148]">✓ {selectedTimes[key]}</span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2 p-3">
                  {TIME_SLOTS.map((slot) => {
                    const dateStr = `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.date).padStart(2, '0')}`
                    const isFull = (bookedSlots[dateStr] || []).includes(slot)
                    const isChosen = selectedTimes[key] === slot
                    return (
                      <button key={slot} disabled={isFull}
                        onClick={() => !isFull && handleSelectTime(key, slot)}
                        className={`h-9 rounded-[8px] text-[11px] transition-all ${
                          isChosen
                            ? 'bg-[#2aa148] text-white font-semibold shadow-[0px_2px_6px_0px_rgba(42,161,72,0.25)]'
                            : isFull
                            ? 'bg-[#f4f4f4] text-[#c4c4c4] text-[9px]'
                            : 'bg-[#f8f9fa] border border-[#e5e9eb] text-[#1a1a1a] hover:border-[#2aa148]'
                        }`}>
                        {isFull ? `${slot}↑` : slot}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Prompt jika belum pilih tanggal */}
      {selectedDates.length === 0 && (
        <div className="mx-4 mt-3 bg-white rounded-[10px] border border-dashed border-[#d1d5db] p-4 text-center">
          <p className="text-[12px] text-[#9ca3af]">
            {maxDates === 1
              ? 'Pilih 1 tanggal untuk melihat slot waktu'
              : `Pilih ${maxDates} tanggal untuk ${pkg.sesi} sesi fisioterapi`}
          </p>
        </div>
      )}

      {/* Spacer agar konten tidak tertutup CTA */}
      <div className="h-8" />

      {/* CTA */}
      <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 w-[390px] px-4 py-3 bg-white border-t border-[#e5e9eb] shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.05)]">
        {canContinue && (
          <p className="text-[10px] text-[#2aa148] font-medium mb-1.5 line-clamp-1">
            ✓ {selectedDates.map(d => `${d.date} ${MONTH_NAMES[d.month].slice(0,3)}`).join(' · ')} — {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </p>
        )}
        <button
          disabled={!canContinue}
          onClick={() => onNavigate('booking-konfirmasi', { terapis, pkg, selectedDates, selectedTimes, mode, layanan, backScreen, backState })}
          className={`w-full text-[13px] font-semibold rounded-[10px] h-10 transition-colors ${
            canContinue
              ? 'bg-[#2aa148] text-white'
              : 'bg-[#e5e9eb] text-[#9ca3af] cursor-default'
          }`}
        >
          {canContinue
            ? 'Lanjut ke Pembayaran →'
            : selectedDates.length < maxDates
              ? `Pilih ${maxDates - selectedDates.length} tanggal lagi`
              : 'Pilih waktu untuk semua tanggal'
          }
        </button>
      </div>

      <BottomNav active="booking" onNavigate={onNavigate} />
    </div>
  )
}
