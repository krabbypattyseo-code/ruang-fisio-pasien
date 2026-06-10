import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'

const quickAccess = [
  { emoji: '📅', label: 'Booking Saya', bg: 'bg-[#e8f6eb]', color: 'text-[#2aa148]', screen: 'booking-home' },
  { emoji: '♥', label: 'Terapis Favorit', bg: 'bg-[#feebee]', color: 'text-[#d62f57]', screen: 'profil-favorit' },
  { emoji: '📋', label: 'Laporan Sesi', bg: 'bg-[#e8f6eb]', color: 'text-[#2aa148]', screen: 'profil-laporan' },
  { emoji: '💳', label: 'Transaksi', bg: 'bg-[#eaeffe]', color: 'text-[#3b82f6]', screen: 'profil-pembayaran' },
]
const history = [
  { initials: 'RK', name: 'Rina Kusuma, S.Ft', detail: 'Sel 20 Mei · Homecare · Lutut', stars: 5 },
  { initials: 'AR', name: 'Ahmad Rasyid, S.Ft', detail: 'Kam 8 Mei · Klinik · Punggung', stars: 5 },
]

export default function Dashboard({ onNavigate }) {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">
      <StatusBar />

      {/* Header */}
      <div className="bg-[#2aa148] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[22px] font-bold text-white">Halo, Rizki!</p>
          <p className="text-[12px] text-[#c7f2d4] mt-1">Sesi fisioterapi Anda berikutnya:</p>
        </div>
        <div className="w-[42px] h-[42px] rounded-full bg-[#99e0a8] flex items-center justify-center">
          <span className="text-[12px] font-semibold text-[#1e7835]">RZ</span>
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Booking aktif */}
        <p className="text-[15px] font-semibold text-[#1a1a1a]">Booking Aktif</p>
        <div className="mt-2 bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.07)] overflow-hidden">
          <div className="flex">
            <div className="w-1 bg-[#f59e0b] flex-shrink-0" />
            <div className="p-3">
              <div className="bg-[#fef3dc] rounded-[5px] px-2 py-1 inline-flex items-center">
                <span className="text-[10px] font-medium text-[#f59e0b]">⏳ Menunggu Konfirmasi Terapis</span>
              </div>
              <p className="text-[14px] font-semibold text-[#1a1a1a] mt-2">Rina Kusuma, S.Ft</p>
              <p className="text-[11px] text-[#6b7280]">Sabtu, 23 Mei 2026 · 10:00 WIB · Klinik</p>
              <p className="text-[11px] text-[#6b7280]">Keluhan: Nyeri Punggung Bawah (Lumbar)</p>
              <p className="text-[11px] font-medium text-[#f59e0b] mt-1">Rp 345.000 menunggu link pembayaran →</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-3">
          {[
            { value: '2', label: 'Sesi Selesai', color: 'text-[#2aa148]' },
            { value: '4.8', label: 'Avg Rating', color: 'text-[#1a1a1a]', star: true },
            { value: '1', label: 'Menunggu', color: 'text-[#f59e0b]' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] p-3 flex-1">
              <div className="flex items-baseline gap-1">
                <p className={`text-[26px] font-bold ${s.color}`}>{s.value}</p>
                {s.star && <span className="text-[16px] text-[#ffbd18]">★</span>}
              </div>
              <p className="text-[10px] text-[#6b7280]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Akses cepat */}
        <p className="text-[15px] font-semibold text-[#1a1a1a] mt-4">Akses Cepat</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {quickAccess.map((qa) => (
            <button
              key={qa.label}
              onClick={() => qa.screen && onNavigate(qa.screen)}
              className={`${qa.bg} rounded-[10px] h-[50px] flex items-center px-4 gap-2`}
            >
              <span className="text-[16px]">{qa.emoji}</span>
              <span className={`text-[12px] font-medium ${qa.color}`}>{qa.label}</span>
            </button>
          ))}
        </div>

        {/* Riwayat */}
        <div className="flex items-center mt-4">
          <p className="text-[14px] font-semibold text-[#1a1a1a]">Riwayat Sesi Fisioterapi</p>
          <button onClick={() => onNavigate('profil-laporan')} className="ml-auto text-[11px] font-medium text-[#2aa148]">Lihat semua</button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {history.map((h) => (
            <div key={h.name} className="bg-white rounded-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] p-3 flex items-start gap-3">
              <Avatar initials={h.initials} size="sm" />
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-[#1a1a1a]">{h.name}</p>
                <p className="text-[10px] text-[#6b7280]">{h.detail}</p>
                <p className="text-[11px] text-[#ffbd18]">{'★'.repeat(h.stars)}</p>
              </div>
              <div className="text-right">
                <span className="bg-[#e8f6eb] text-[#2aa148] text-[9px] font-medium px-2 py-0.5 rounded-[4px]">Selesai</span>
                <button onClick={() => onNavigate('profil-laporan')} className="block text-[10px] font-medium text-[#2aa148] mt-2">Laporan Sesi</button>
                <button onClick={() => onNavigate('layanan')} className="block text-[10px] font-medium text-[#2aa148] mt-0.5">Booking Lagi</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="beranda" onNavigate={onNavigate} />
    </div>
  )
}
