import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { fisioterapis, SPESIALISASI_LIST, spesialisasiToSlug } from '../data/fisioterapis'

const SPESIALISASI_ICONS = {
  'Muskuloskeletal': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2Z" fill="#2aa148"/>
      <path d="M8 8v4l-2 6h2l1.5-4 1.5 4h2l-2-6V8" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 10h4M14 13h3" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  'Neurologi': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="5" stroke="#2aa148" strokeWidth="1.4"/>
      <path d="M9 8c0-1.7 1.3-3 3-3" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M10 13v2l-2 4h8l-2-4v-2" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 15h4" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  'Cedera Olahraga': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#2aa148" strokeWidth="1.4"/>
      <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M12 8v4l2.5 2.5" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Rehabilitasi': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3C8.1 3 5 6.1 5 10c0 2.4 1.2 4.5 3 5.7V19h8v-3.3c1.8-1.2 3-3.3 3-5.7 0-3.9-3.1-7-7-7Z" stroke="#2aa148" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M9 19v2h6v-2" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 13h6" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  'Pasca Operasi': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v4M8 5l2.8 2.8M16 5l-2.8 2.8" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round"/>
      <rect x="5" y="9" width="14" height="10" rx="2" stroke="#2aa148" strokeWidth="1.4"/>
      <path d="M12 12v4M10 14h4" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  'Geriatri': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2.5" stroke="#2aa148" strokeWidth="1.4"/>
      <path d="M9 9.5c-.5 1-1 3 0 4l1 1v5h4v-5l1-1c1-1 .5-3 0-4" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14c-1 .5-2 1.5-2 3h14c0-1.5-1-2.5-2-3" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  'Nyeri Kronis': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 4c-3.3 0-6 2.7-6 6 0 2.5 1.5 4.6 3.7 5.5L11 20h2l1.3-4.5C16.5 14.6 18 12.5 18 10c0-3.3-2.7-6-6-6Z" stroke="#2aa148" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M10 10l1.5 1.5L14 8" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Sport Performa': (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13 3L5 13h7l-1 8 8-10h-7l1-8Z" stroke="#2aa148" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const modes = [
  {
    title: 'Klinik',
    sub: 'Di klinik RF',
    screen: 'layanan-klinik',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 21V7l9-4 9 4v14H3Z" stroke="#2aa148" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M9 21v-6h6v6" stroke="#2aa148" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M12 8v4M10 10h4" stroke="#2aa148" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Homecare',
    sub: 'Terapis ke rumah',
    screen: 'layanan-homecare',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M3 11.5L12 3l9 8.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11.5Z" stroke="#2aa148" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M9 22V14h6v8" stroke="#2aa148" strokeWidth="1.6" strokeLinejoin="round"/>
        <circle cx="18" cy="17" r="3" fill="#e8f6eb" stroke="#2aa148" strokeWidth="1.4"/>
        <path d="M17 17l.8.8 1.5-1.5" stroke="#2aa148" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Online',
    sub: 'Video call',
    screen: 'layanan-online',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="15" height="11" rx="2" stroke="#2aa148" strokeWidth="1.6"/>
        <path d="M17 9l5-3v8l-5-3V9Z" stroke="#2aa148" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M6 20h8" stroke="#2aa148" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M10 16v4" stroke="#2aa148" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const featuredTherapists = fisioterapis.filter((f) => f.featured)

export default function Beranda({ onNavigate }) {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">
      <StatusBar />

      {/* Navbar */}
      <div className="bg-white h-14 flex items-center px-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <span className="text-[18px] font-bold text-[#2aa148]">Ruang Fisio</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[11px] text-[#6b7280]">●</span>
          <div className="bg-[#e8f6eb] rounded-[6px] px-2 py-1">
            <span className="text-[10px] font-semibold text-[#2aa148]">IFI</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#2aa148] px-5 pt-4 pb-5">
        <p className="text-[18px] font-bold text-white">Cari Fisioterapis Terbaik</p>
        <p className="text-[12px] text-[#d1f7db] mt-1">Tersertifikasi IFI untuk cedera, rehabilitasi & nyeri</p>
        <button
          onClick={() => onNavigate('layanan')}
          className="mt-3 w-full bg-white rounded-[10px] h-[38px] flex items-center px-3 text-left"
        >
          <span className="text-[11px] text-[#a6a6a6]">🔍  Cari fisioterapis, kondisi (HNP, ACL, Stroke)...</span>
        </button>
      </div>

      <div className="px-4 mt-4">
        {/* Mode Layanan */}
        <p className="text-[14px] font-semibold text-[#1a1a1a]">Mode Layanan</p>
        <div className="flex gap-2 mt-3 items-stretch">
          {modes.map((m) => (
            <button
              key={m.title}
              onClick={() => onNavigate(m.screen)}
              className="bg-white rounded-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-3 flex-1 text-left flex flex-col items-center gap-2"
            >
              <div className="w-11 h-11 rounded-full bg-[#e8f6eb] flex items-center justify-center">
                {m.icon}
              </div>
              <p className="text-[12px] font-semibold text-[#2aa148] text-center">{m.title}</p>
              <p className="text-[9px] text-[#6b7280] text-center leading-tight">{m.sub}</p>
            </button>
          ))}
        </div>

        {/* Spesialisasi — grid icon */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mt-5">Spesialisasi</p>
        <div className="grid grid-cols-4 gap-3 mt-3">
          {SPESIALISASI_LIST.map((s) => (
            <button
              key={s}
              onClick={() => onNavigate('layanan', { initialSpesialisasi: s })}
              className="flex flex-col items-center gap-1.5"
            >
              <div className="w-14 h-14 rounded-[16px] bg-[#e8f6eb] flex items-center justify-center shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
                {SPESIALISASI_ICONS[s]}
              </div>
              <p className="text-[9px] font-medium text-[#1a1a1a] text-center leading-tight">{s}</p>
            </button>
          ))}
        </div>

        {/* Featured */}
        <div className="flex items-center mt-5">
          <p className="text-[14px] font-semibold text-[#1a1a1a]">Fisioterapis Featured</p>
          <button onClick={() => onNavigate('layanan')} className="ml-auto text-[11px] font-medium text-[#2aa148]">
            Lihat semua →
          </button>
        </div>
        <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
          {featuredTherapists.map((t) => (
            <div
              key={t.id}
              onClick={() => onNavigate('profil-terapis', { terapis: t })}
              className="bg-white rounded-[10px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] p-3 min-w-[170px] cursor-pointer"
            >
              <div className="flex items-start gap-2">
                <Avatar initials={t.inisial} size="lg" />
                <div className="flex-1 min-w-0">
                  <Badge label={t.status === 'ruang_fisio' ? 'Ruang Fisio' : 'Mitra ✓'} />
                  <p className="text-[11px] font-semibold text-[#1a1a1a] mt-1 leading-tight">{t.nama}, {t.gelar}</p>
                  <p className="text-[10px] text-[#6b7280]">{t.spesialisasi.join(' & ')}</p>
                  <p className="text-[11px] text-[#ffbd18]">{'★'.repeat(Math.round(t.rating))}{'☆'.repeat(5 - Math.round(t.rating))}</p>
                </div>
              </div>
              <p className="text-[10px] font-medium text-[#2aa148] mt-2">Rp {t.harga_mulai.toLocaleString('id-ID')}/sesi</p>
              <p className="text-[10px] text-[#6b7280]">⏰ {t.jadwal_terdekat}</p>
            </div>
          ))}
        </div>

        {/* Promo */}
        <div className="bg-[#e8f6eb] rounded-[10px] px-4 py-3 mt-3">
          <p className="text-[11px] font-medium text-[#1e7835]">💰 Mulai dari Rp 300.000/sesi fisioterapi</p>
          <p className="text-[10px] text-[#1e7835]">Homecare tersedia + biaya perjalanan sesuai zona</p>
        </div>
      </div>

      <BottomNav active="beranda" onNavigate={onNavigate} />
    </div>
  )
}
