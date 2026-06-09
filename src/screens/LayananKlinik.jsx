import StatusBar from '../components/StatusBar'

const packages = [
  { label: '1 Sesi', price: 'Rp 300.000', save: null, highlight: false },
  { label: '3 Sesi', price: 'Rp 840.000', save: 'Hemat Rp 60rb', highlight: false },
  { label: '6 Sesi ⭐', price: 'Rp 1.560.000', save: 'Hemat Rp 240rb', highlight: true },
  { label: '12 Sesi', price: 'Rp 2.880.000', save: 'Hemat Rp 720rb', highlight: false },
]
const steps = [
  'Pilih fisioterapis & jadwal yang kamu mau',
  'Pilih paket: 1, 3, 6, atau 12 sesi',
  'Bayar penuh via QRIS, Transfer, atau Kartu',
  'Terima konfirmasi dalam 2 jam via notifikasi',
  'Datang 10 menit sebelum sesi dimulai',
]
const rules = [
  'Batal gratis hingga 4 jam sebelum sesi',
  'Paket berlaku 3 bulan sejak tanggal beli',
  'Bawa pakaian nyaman untuk bergerak bebas',
]

export default function LayananKlinik({ onNavigate }) {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* ── FIXED HEADER ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30">
        <StatusBar />
        <div className="bg-white flex items-center px-4 h-[52px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <button onClick={() => onNavigate('beranda')} className="text-[12px] text-[#2aa148] font-normal">
            {'< Kembali'}
          </button>
          <p className="flex-1 text-center text-[16px] font-semibold text-[#1a1a1a]">Layanan Klinik</p>
        </div>
        <div className="bg-[#2aa148] px-5 h-[90px] flex flex-col justify-center">
          <p className="text-[17px] font-bold text-white">Terapi Langsung di Klinik</p>
          <p className="text-[10px] text-[#d1f7db] mt-1">Fisioterapis bersertifikat IFI • Alat lengkap • Lokasi Tangerang</p>
        </div>
      </div>
      {/* Spacer: StatusBar 44 + Navbar 52 + Hero 90 = 186px */}
      <div className="h-[186px]" />

      {/* Info chips */}
      <div className="flex gap-2 px-4 mt-4">
        {[
          { label: 'Mulai dari', value: 'Rp 300.000/sesi' },
          { label: 'Durasi', value: '45–90 menit' },
          { label: 'Jadwal', value: 'Sen–Sab 08:00' },
        ].map((c) => (
          <div key={c.label} className="flex-1 bg-white rounded-[10px] px-2 py-2">
            <p className="text-[9px] text-[#6b7280]">{c.label}</p>
            <p className="text-[11px] font-semibold text-[#1a1a1a] mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>

      <hr className="mx-4 mt-4 border-[#e5e9eb]" />

      <div className="px-4 mt-4">
        {/* Paket */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mb-3">Paket & Harga</p>
        <div className="flex flex-col gap-2">
          {packages.map((pkg) => (
            <div
              key={pkg.label}
              className={`flex items-center justify-between h-[34px] px-3 rounded-[8px] ${
                pkg.highlight ? 'bg-[#e8f6eb]' : 'bg-white'
              }`}
            >
              <p className="text-[11px] font-semibold text-[#1a1a1a]">{pkg.label}</p>
              <div className="flex items-center gap-2">
                {pkg.save && <p className="text-[9px] text-[#2aa148]">{pkg.save}</p>}
                <p className="text-[11px] font-semibold text-[#2aa148]">{pkg.price}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-[#2aa148] mt-2">★ Paket 6 Sesi paling banyak dipilih — hemat 14%</p>

        <hr className="mt-4 border-[#e5e9eb]" />

        {/* Cara booking */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mt-4 mb-3">Cara Booking</p>
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-[22px] h-[22px] rounded-full bg-[#e8f6eb] flex items-center justify-center flex-shrink-0">
                <span className="text-[10px] font-semibold text-[#2aa148]">{i + 1}</span>
              </div>
              <p className="text-[11px] text-[#1a1a1a] pt-0.5">{s}</p>
            </div>
          ))}
        </div>

        <hr className="mt-4 border-[#e5e9eb]" />

        {/* Ketentuan */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mt-4 mb-2">Ketentuan</p>
        <div className="flex flex-col gap-2">
          {rules.map((r) => (
            <div key={r} className="flex items-start gap-2">
              <span className="text-[11px] font-semibold text-[#2aa148] mt-0.5">•</span>
              <p className="text-[11px] text-[#1a1a1a]">{r}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white px-4 py-4 z-50">
        <button
          onClick={() => onNavigate('layanan', { initialModeFilter: 'Klinik' })}
          className="w-full bg-[#2aa148] text-white text-[13px] font-bold rounded-[12px] h-12"
        >
          Cari Fisioterapis Klinik →
        </button>
      </div>
    </div>
  )
}
