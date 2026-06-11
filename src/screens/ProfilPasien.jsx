import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'

const menuItems = [
  { label: '📊  Laporan Sesi Saya', screen: 'profil-laporan' },
  { label: '⭐  Terapis Favorit', screen: 'profil-favorit' },
  { label: '💳  Metode Pembayaran', screen: 'profil-pembayaran' },
  { label: '🔔  Notifikasi', screen: 'profil-notifikasi' },
  { label: '❓  Bantuan & FAQ', screen: 'profil-bantuan' },
  { label: '📋  Syarat & Ketentuan', screen: 'profil-ketentuan' },
]

// Riwayat sesi — dipindahkan dari Tab Booking ke Profil
const RIWAYAT_DATA = [
  {
    id: 1,
    inisial: 'RK',
    nama: 'Rina Kusuma, S.Ft',
    tanggal: '31 Mei 2026',
    mode: 'Klinik',
    layanan: 'Fisioterapi Umum',
    status: 'Selesai',
    rating: 5,
    sudahUlasan: true,
  },
  {
    id: 2,
    inisial: 'AR',
    nama: 'Ahmad Rasyid, S.Ft',
    tanggal: '8 Mei 2026',
    mode: 'Klinik',
    layanan: 'Fisioterapi Umum',
    status: 'Selesai',
    rating: 4,
    sudahUlasan: false,
  },
  {
    id: 3,
    inisial: 'RK',
    nama: 'Rina Kusuma, S.Ft',
    tanggal: '24 Apr 2026',
    mode: 'Homecare',
    layanan: 'Fisioterapi Umum',
    status: 'Dibatalkan',
    rating: null,
    sudahUlasan: false,
  },
]

const TAB_RIWAYAT = ['Semua', 'Selesai', 'Dibatalkan']

export default function ProfilPasien({ onNavigate }) {
  const { profile, signOut } = useAuth()
  const [tabRiwayat, setTabRiwayat] = useState('Semua')

  const riwayatFiltered = RIWAYAT_DATA.filter((r) => {
    if (tabRiwayat === 'Semua') return true
    return r.status === tabRiwayat
  })

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[76px]">
      <StatusBar />

      {/* Header */}
      <div className="bg-white px-4 h-14 flex items-center">
        <span className="text-[14px] font-semibold text-[#1a1a1a]">Profil Saya</span>
      </div>

      {/* Profile card */}
      <div className="mx-4 mt-4 bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] p-4 flex items-center gap-4">
        <div className="w-[64px] h-[64px] rounded-full bg-[#e8f6eb] flex items-center justify-center flex-shrink-0">
          <span className="text-[24px] font-bold text-[#2aa148]">R</span>
        </div>
        <div>
          <p className="text-[15px] font-bold text-[#1a1a1a]">Rizki Pratama</p>
          <p className="text-[11px] text-[#6b7280]">rizki@email.com</p>
          <p className="text-[11px] text-[#6b7280]">+62 812-3456-7890</p>
        </div>
        <button className="ml-auto text-[11px] font-medium text-[#2aa148] border border-[#2aa148] rounded-[8px] px-3 py-1.5">
          Edit
        </button>
      </div>

      {/* Stats */}
      <div className="mx-4 mt-3 flex gap-2">
        {[
          { value: '2', label: 'Sesi Selesai', color: 'text-[#2aa148]' },
          { value: '4.8', label: 'Avg Rating', color: 'text-[#ffbd18]' },
          { value: '1', label: 'Aktif', color: 'text-[#f59e0b]' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-3 flex-1 text-center">
            <p className={`text-[18px] font-bold ${s.color}`}>{s.value}</p>
            <p className="text-[9px] text-[#6b7280]">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── RIWAYAT SESI ── (dipindahkan dari Tab Booking) */}
      <div className="mx-4 mt-4">
        <p className="text-[14px] font-semibold text-[#1a1a1a] mb-3">Riwayat Sesi</p>

        {/* Tab filter */}
        <div className="flex gap-2 mb-3">
          {TAB_RIWAYAT.map((t) => (
            <button
              key={t}
              onClick={() => setTabRiwayat(t)}
              className={`h-7 px-3 rounded-[14px] text-[11px] font-medium transition-colors ${
                tabRiwayat === t
                  ? 'bg-[#2aa148] text-white'
                  : 'bg-white border border-[#e5e9eb] text-[#6b7280]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* List riwayat */}
        {riwayatFiltered.length === 0 ? (
          <div className="bg-white rounded-[12px] p-5 text-center shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
            <p className="text-[12px] text-[#9ca3af]">Belum ada riwayat sesi</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {riwayatFiltered.map((r) => (
              <div key={r.id} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] p-3 flex items-start gap-3">
                <Avatar initials={r.inisial} size="sm" />
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{r.nama}</p>
                  <p className="text-[10px] text-[#6b7280]">{r.tanggal} · {r.mode} · {r.layanan}</p>
                  {r.rating && (
                    <p className="text-[10px] text-[#ffbd18] mt-0.5">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                    r.status === 'Selesai'
                      ? 'bg-[#e8f5ed] text-[#2aa148]'
                      : 'bg-[#fee2e2] text-[#ef4444]'
                  }`}>
                    {r.status}
                  </span>
                  {r.status === 'Selesai' && !r.sudahUlasan && (
                    <button
                      onClick={() => onNavigate('laporan')}
                      className="text-[9px] font-semibold text-[#2aa148] bg-[#e8f5ed] px-2 py-0.5 rounded-full"
                    >
                      Beri Ulasan
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="mx-4 mt-4 bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            onClick={() => item.screen && onNavigate(item.screen, item.state || {})}
            className={`w-full flex items-center justify-between px-4 py-3 text-left ${
              i < menuItems.length - 1 ? 'border-b border-[#f0f0f0]' : ''
            }`}
          >
            <span className="text-[12px] text-[#1a1a1a]">{item.label}</span>
            <span className="text-[#9ca3af] text-[14px]">›</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-3 mb-2">
        <button
          onClick={async () => { await signOut(); onNavigate('beranda') }}
          className="w-full bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] py-3 text-[12px] font-semibold text-red-500"
        >
          Keluar
        </button>
      </div>

      <BottomNav active="profil" onNavigate={onNavigate} />
    </div>
  )
}
