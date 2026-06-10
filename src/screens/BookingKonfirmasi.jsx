import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import StepIndicator from '../components/StepIndicator'
import { fisioterapis } from '../data/fisioterapis'
import { buildBookingDetail, fmt } from '../utils/booking'
import { createBooking } from '../api'

const DEFAULT_TERAPIS = fisioterapis[0]
const DEFAULT_PKG = { sesi: 1, perSesi: 300000, total: 300000, save: null, popular: false }
const PASIEN_ID = 'pasien-demo-001'
const PASIEN_NAMA = 'Budi Pratama'

export default function BookingKonfirmasi({
  onNavigate,
  terapis: terapisProp = null,
  pkg: pkgProp = null,
  selectedDates = [],
  selectedTimes = {},
  mode = 'klinik',
  layanan = 'Fisioterapi Umum',
  backScreen = 'booking-pilih-paket',
  backState = null,
}) {
  const [method, setMethod] = useState('qris')
  const [paying, setPaying] = useState(false)

  const terapis = terapisProp || DEFAULT_TERAPIS
  const pkg = pkgProp || DEFAULT_PKG

  const bookingDetail = buildBookingDetail({ terapis, pkg, mode, layanan, selectedDates, selectedTimes })

  const HEADER_H = 148

  async function handleBayar() {
    setPaying(true)
    try {
      // Coba kirim ke backend; jika tidak tersedia (mode demo), tetap lanjut
      for (const d of selectedDates) {
        const key = `${d.year}-${d.month}-${d.date}`
        const jam = selectedTimes[key]
        const tanggal = `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.date).padStart(2, '0')}`
        await createBooking({
          pasien_nama: PASIEN_NAMA,
          pasien_id: PASIEN_ID,
          terapis_id: terapis.id,
          tanggal,
          jam,
          lokasi: mode,
          keluhan: layanan,
          paket: pkg.sesi === 1 ? 'Sesi Tunggal' : `Paket ${pkg.sesi} Sesi`,
          harga: pkg.total,
        }).catch(() => {})   // backend opsional — tetap lanjut ke success page
      }
    } finally {
      setPaying(false)
      onNavigate('booking-berhasil', { terapis, pkg, mode, layanan, selectedDates, selectedTimes })
    }
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[160px]">

      {/* ── FIXED HEADER ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
        <StatusBar />
        <div className="flex items-center px-4 h-[52px]">
          <button
            onClick={() => onNavigate('booking-jadwal', {
              selectedPkg: pkg,
              terapis,
              layanan,
              initialDates: selectedDates,
              initialTimes: selectedTimes,
              initialMode: mode,
              backScreen,
              backState,
            })}
            className="text-[20px] text-[#1a1a1a]"
          >←</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Konfirmasi & Bayar</p>
        </div>
        <StepIndicator step={3} />
      </div>

      {/* Spacer */}
      <div style={{ height: HEADER_H + 12 }} />

      <div className="px-4 flex flex-col gap-3">
        {/* Detail Booking */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          <p className="text-[13px] font-semibold text-[#1a1a1a] px-4 pt-3 pb-2">Detail Booking</p>
          <hr className="border-[#f0f0f0]" />
          {bookingDetail.map((d) => (
            <div key={d.label} className="flex px-4 py-2 border-b border-[#f0f0f0] last:border-0">
              <span className="text-[11px] text-[#6b7280] w-20 flex-shrink-0">{d.label}</span>
              <span className="text-[11px] font-medium text-[#1a1a1a]">{d.value}</span>
            </div>
          ))}
        </div>

        {/* Ringkasan biaya */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-4">
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Ringkasan Biaya</p>
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-[#6b7280]">Biaya sesi {pkg.sesi}× ({fmt(pkg.perSesi)}/sesi)</span>
            <span className="text-[11px] text-[#1a1a1a]">{fmt(pkg.total)}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-[11px] text-[#6b7280]">Biaya platform</span>
            <span className="text-[11px] text-[#1a1a1a]">Rp 0</span>
          </div>
          <hr className="border-[#f0f0f0] mb-3" />
          <div className="flex justify-between">
            <span className="text-[13px] font-bold text-[#2aa148]">Total: {fmt(pkg.total)}</span>
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-4">
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Metode Pembayaran</p>
          <div className="flex flex-col gap-3">
            {[
              { id: 'qris', label: 'QRIS — Scan di aplikasi (Default)' },
              { id: 'bank', label: 'Transfer Bank (BCA · BNI · Mandiri)' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className="flex items-center gap-3"
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  method === m.id ? 'border-[#2aa148]' : 'border-[#d1d1d1]'
                }`}>
                  {method === m.id && <div className="w-2 h-2 rounded-full bg-[#2aa148]" />}
                </div>
                <span className={`text-[12px] ${method === m.id ? 'font-semibold text-[#1a1a1a]' : 'text-[#6b7280]'}`}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>

          {method === 'qris' && (
            <div className="mt-4 mx-auto w-[140px] h-[140px] bg-[#f0f0f0] rounded-[10px] flex items-center justify-center">
              <span className="text-[11px] text-[#9ca3af] font-medium">QR CODE</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-1 mt-3">
            <span className="text-[11px] text-[#f59e0b]">⏱ 14:38 tersisa</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[390px] px-4 py-3 bg-white border-t border-[#e5e9eb] shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleBayar}
          disabled={paying}
          className="w-full bg-[#2aa148] text-white text-[13px] font-semibold rounded-[10px] h-10 disabled:opacity-60"
        >
          {paying ? 'Memproses...' : `Bayar Sekarang — ${fmt(pkg.total)}`}
        </button>
      </div>

      <BottomNav active="booking" onNavigate={onNavigate} />
    </div>
  )
}
