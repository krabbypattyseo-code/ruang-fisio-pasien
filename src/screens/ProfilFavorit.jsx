import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import { fisioterapis } from '../data/fisioterapis'

const FILTER_OPTIONS = ['Semua', 'Klinik', 'Homecare', 'Online']

// Mock: 3 terapis pertama sebagai favorit
const FAVORIT_IDS = ['fisio-001', 'fisio-002', 'fisio-004']

export default function ProfilFavorit({ onNavigate }) {
  const [filter, setFilter] = useState('Semua')
  const [favorites, setFavorites] = useState(FAVORIT_IDS)
  const [confirmHapus, setConfirmHapus] = useState(null)

  const terapisFavorit = fisioterapis.filter((f) => favorites.includes(f.id))

  const filtered = terapisFavorit.filter((t) => {
    if (filter === 'Semua') return true
    if (filter === 'Klinik') return t.tersedia_klinik
    if (filter === 'Homecare') return t.tersedia_homecare
    if (filter === 'Online') return t.tersedia_online
    return true
  })

  function hapusFavorit(id) {
    setFavorites((prev) => prev.filter((f) => f !== id))
    setConfirmHapus(null)
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* Fixed Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.07)]">
        <StatusBar />
        <div className="flex items-center px-4 h-[52px]">
          <button onClick={() => onNavigate('profil')} className="text-[20px] text-[#1a1a1a]">‹</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Terapis Favorit</p>
          <div className="bg-[#2aa148] rounded-full w-5 h-5 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">{favorites.length}</span>
          </div>
        </div>
      </div>
      <div className="h-[96px]" />

      <div className="px-4 flex flex-col gap-3">

        {/* Filter chips */}
        <div className="flex gap-2">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-7 px-3 rounded-[14px] text-[11px] font-medium transition-colors ${
                filter === f ? 'bg-[#2aa148] text-white' : 'bg-white border border-[#e5e9eb] text-[#6b7280]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List / Empty state */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-[12px] p-8 text-center shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] mt-4">
            <p className="text-[32px] mb-3">⭐</p>
            <p className="text-[14px] font-semibold text-[#1a1a1a]">Belum ada terapis favorit</p>
            <p className="text-[11px] text-[#6b7280] mt-1 leading-relaxed">
              Tap ♡ di profil terapis untuk menyimpan ke favorit
            </p>
            <button
              onClick={() => onNavigate('layanan')}
              className="mt-4 bg-[#2aa148] text-white text-[12px] font-semibold rounded-[10px] px-6 py-2"
            >
              Cari Fisioterapis →
            </button>
          </div>
        ) : (
          filtered.map((t) => (
            <div key={t.id} className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] p-3">
              {/* Top row */}
              <div className="flex gap-3">
                <Avatar initials={t.inisial} size="lg" />
                <div className="flex-1 min-w-0">
                  <Badge label={t.status === 'ruang_fisio' ? 'Ruang Fisio' : 'Mitra ✓'} />
                  <p className="text-[13px] font-semibold text-[#1a1a1a] mt-0.5">{t.nama}, {t.gelar}</p>
                  <p className="text-[10px] text-[#6b7280]">{t.spesialisasi.slice(0, 2).join(' · ')}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] text-[#ffbd18]">{'★'.repeat(Math.round(t.rating))}</span>
                    <span className="text-[10px] text-[#6b7280]">{t.rating} · {t.jumlah_ulasan} ulasan</span>
                  </div>
                </div>
                <button
                  onClick={() => setConfirmHapus(t.id)}
                  className="text-[18px] text-[#ef4444] flex-shrink-0"
                >♥</button>
              </div>

              {/* Info chips */}
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {t.mode_layanan.map((m) => (
                  <span key={m} className="text-[9px] bg-[#f4f4f4] text-[#6b7280] rounded-full px-2 py-0.5 capitalize">{m}</span>
                ))}
                <span className="text-[9px] text-[#6b7280] ml-auto">⏰ {t.jadwal_terdekat}</span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <p className="text-[11px] font-semibold text-[#2aa148]">Rp {t.harga_mulai.toLocaleString('id-ID')}/sesi</p>
              </div>

              <button
                onClick={() => onNavigate('booking-pilih-paket', { terapis: t })}
                className="w-full mt-2 bg-[#2aa148] text-white text-[12px] font-semibold rounded-[10px] h-10"
              >
                Booking Sekarang
              </button>
            </div>
          ))
        )}
      </div>

      {/* Modal konfirmasi hapus */}
      {confirmHapus && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setConfirmHapus(null)} />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white rounded-t-[20px] z-50 px-5 pt-5 pb-8">
            <p className="text-[15px] font-semibold text-[#1a1a1a] text-center">Hapus dari Favorit?</p>
            <p className="text-[12px] text-[#6b7280] text-center mt-1">
              {fisioterapis.find((f) => f.id === confirmHapus)?.nama} akan dihapus dari daftar favorit kamu
            </p>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setConfirmHapus(null)}
                className="flex-1 border border-[#e5e9eb] rounded-[10px] py-3 text-[13px] font-medium text-[#1a1a1a]"
              >
                Batal
              </button>
              <button
                onClick={() => hapusFavorit(confirmHapus)}
                className="flex-1 bg-[#ef4444] rounded-[10px] py-3 text-[13px] font-semibold text-white"
              >
                Hapus
              </button>
            </div>
          </div>
        </>
      )}

      <BottomNav active="profil" onNavigate={onNavigate} />
    </div>
  )
}
