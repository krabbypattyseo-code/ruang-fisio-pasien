import StatusBar from '../components/StatusBar'
import { fisioterapis } from '../data/fisioterapis'
import { buildSuccessSummary } from '../utils/booking'

const DEFAULT_TERAPIS = fisioterapis[0]
const DEFAULT_PKG = { sesi: 1, perSesi: 300000, total: 300000, save: null, popular: false }

export default function BookingBerhasil({
  onNavigate,
  terapis: terapisProp = null,
  pkg: pkgProp = null,
  mode = 'klinik',
  layanan = 'Fisioterapi Umum',
  selectedDates = [],
  selectedTimes = {},
}) {
  const terapis = terapisProp || DEFAULT_TERAPIS
  const pkg = pkgProp || DEFAULT_PKG

  const summary = buildSuccessSummary({ terapis, pkg, mode, layanan, selectedDates, selectedTimes })

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <StatusBar />

      {/* Header */}
      <div className="bg-white h-[52px] flex items-center justify-center shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <p className="text-[16px] font-semibold text-[#1a1a1a]">Booking Berhasil</p>
      </div>

      <div className="px-4 mt-8 flex flex-col items-center">
        {/* Checkmark */}
        <div className="w-20 h-20 rounded-full bg-[#e8f6eb] flex items-center justify-center mb-5">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 20L16 28L32 12" stroke="#2aa148" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <p className="text-[20px] font-bold text-[#1a1a1a] text-center">Booking berhasil dikonfirmasi!</p>
        <p className="text-[12px] text-[#6b7280] mt-1 text-center">Terapis akan membalas dalam 2 jam</p>

        {/* Ringkasan */}
        <div className="w-full mt-5 bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] overflow-hidden">
          <p className="text-[12px] font-semibold text-[#2aa148] px-4 pt-3 pb-2">Ringkasan Booking</p>
          <hr className="border-[#f0f0f0]" />
          {summary.map((s) => (
            <div key={s.label} className="flex px-4 py-2 border-b border-[#f0f0f0] last:border-0">
              <span className="text-[11px] text-[#6b7280] w-16 flex-shrink-0">{s.label}</span>
              <span className="text-[11px] font-medium text-[#1a1a1a]">{s.value}</span>
            </div>
          ))}
        </div>

        {/* WhatsApp note */}
        <div className="w-full mt-3 bg-[#fff7e0] rounded-[10px] px-4 py-3">
          <p className="text-[10px] text-[#a06414]">
            💬 Terapis menghubungimu via WhatsApp 30 menit sebelum sesi. Pastikan nomor HP aktif.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full mt-5 bg-[#2aa148] text-white text-[13px] font-bold rounded-[12px] h-12"
        >
          Lihat Detail Booking
        </button>
        <button
          onClick={() => onNavigate('beranda')}
          className="w-full mt-2 bg-white border border-[#e5e9eb] text-[#1a1a1a] text-[13px] font-medium rounded-[12px] h-12"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  )
}
