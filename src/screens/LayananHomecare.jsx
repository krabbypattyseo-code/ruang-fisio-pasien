import StatusBar from '../components/StatusBar'

const zones = [
  { emoji: '🟢', label: 'Dekat', sub: '0–7 km', eta: 'Tiba 20–30 mnt', booking: 'Min. H-1' },
  { emoji: '🟡', label: 'Sedang', sub: '7–15 km', eta: 'Tiba 30–45 mnt', booking: 'Min. H-1' },
  { emoji: '🔴', label: 'Jauh', sub: '15–30 km', eta: 'Tiba 45–60 mnt', booking: 'Min. H-2' },
]
const prepare = [
  'Ruang kosong minimal 2×3 meter untuk terapi',
  'Matras atau kasur yang bisa digunakan',
  'Akses parkir tersedia untuk terapis',
  'Informasikan kondisi medis lengkap saat booking',
]
const rules = [
  'Batal gratis hingga 6 jam sebelum jadwal',
  'Terapis wajib tunjukkan ID Mitra Ruang Fisio',
]

export default function LayananHomecare({ onNavigate }) {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* ── FIXED HEADER ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30">
        <StatusBar />
        <div className="bg-white flex items-center px-4 h-[52px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <button onClick={() => onNavigate('beranda')} className="text-[12px] text-[#2aa148]">
            {'< Kembali'}
          </button>
          <p className="flex-1 text-center text-[16px] font-semibold text-[#1a1a1a]">Layanan Homecare</p>
        </div>
        <div className="bg-[#2aa148] px-5 h-[90px] flex flex-col justify-center">
          <p className="text-[17px] font-bold text-white">Fisioterapis Datang ke Rumahmu</p>
          <p className="text-[10px] text-[#d1f7db] mt-1">Layanan setara klinik — kamu cukup di rumah atau kantor</p>
        </div>
      </div>
      {/* Spacer: StatusBar 44 + Navbar 52 + Hero 90 = 186px */}
      <div className="h-[186px]" />

      {/* Info chips */}
      <div className="flex gap-2 px-4 mt-4">
        {[
          { label: 'Biaya transport', value: 'Rp 5.000/km PP' },
          { label: 'Cakupan', value: 'Tangerang Raya' },
          { label: 'Durasi', value: '60–90 menit' },
        ].map((c) => (
          <div key={c.label} className="flex-1 bg-white rounded-[10px] px-2 py-2">
            <p className="text-[9px] text-[#6b7280]">{c.label}</p>
            <p className="text-[11px] font-semibold text-[#1a1a1a] mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>

      <hr className="mx-4 mt-4 border-[#e5e9eb]" />

      <div className="px-4 mt-4">
        {/* Zona */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mb-3">Zona Layanan</p>
        <div className="flex flex-col gap-2">
          {zones.map((z) => (
            <div key={z.label} className="bg-white rounded-[8px] h-[38px] flex items-center px-3">
              <div className="w-28">
                <p className="text-[11px] font-semibold text-[#1a1a1a]">{z.emoji} {z.label}</p>
                <p className="text-[9px] text-[#6b7280]">{z.sub}</p>
              </div>
              <p className="flex-1 text-[10px] text-[#6b7280]">{z.eta}</p>
              <p className="text-[10px] font-semibold text-[#2aa148]">{z.booking}</p>
            </div>
          ))}
        </div>

        <hr className="mt-4 border-[#e5e9eb]" />

        {/* Estimasi biaya */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mt-4 mb-3">Estimasi Biaya</p>
        <div className="bg-[#e8f6eb] rounded-[10px] p-3">
          <p className="text-[10px] font-semibold text-[#1e7835]">Contoh perhitungan</p>
          <p className="text-[10px] text-[#1a1a1a] mt-1">Sesi Rp 350.000 + Transport 12km (Rp 120.000 PP)</p>
          <p className="text-[11px] font-semibold text-[#1a1a1a] mt-1">Total: Rp 470.000</p>
          <p className="text-[9px] text-[#6b7280] mt-1">DP saat booking: Rp 235.000 &nbsp;•&nbsp; Sisa setelah sesi: Rp 235.000</p>
        </div>

        <hr className="mt-4 border-[#e5e9eb]" />

        {/* Yang perlu disiapkan */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mt-4 mb-2">Yang Perlu Disiapkan</p>
        <div className="flex flex-col gap-2">
          {prepare.map((p) => (
            <div key={p} className="flex items-start gap-2">
              <span className="text-[11px] font-semibold text-[#2aa148] mt-0.5">•</span>
              <p className="text-[11px] text-[#1a1a1a]">{p}</p>
            </div>
          ))}
        </div>

        <hr className="mt-4 border-[#e5e9eb]" />

        {/* Ketentuan */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mt-4 mb-2">Ketentuan Penting</p>
        <div className="flex flex-col gap-2">
          {rules.map((r) => (
            <div key={r} className="flex items-start gap-2">
              <span className="text-[11px] font-semibold text-[#2aa148] mt-0.5">•</span>
              <p className="text-[11px] text-[#1a1a1a]">{r}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white px-4 py-4 z-50">
        <button
          onClick={() => onNavigate('layanan', { initialModeFilter: 'Homecare' })}
          className="w-full bg-[#2aa148] text-white text-[13px] font-bold rounded-[12px] h-12"
        >
          Cari Fisioterapis Homecare →
        </button>
      </div>
    </div>
  )
}
