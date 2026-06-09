import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const NOTIF_CONFIG = [
  {
    section: 'Transaksi & Booking',
    items: [
      { id: 'konfirmasi_booking', label: 'Konfirmasi booking berhasil', push: true, email: true, wa: true },
      { id: 'perubahan_jadwal', label: 'Perubahan jadwal oleh terapis', push: true, email: true, wa: true },
      { id: 'pembatalan', label: 'Pembatalan booking', push: true, email: true, wa: true },
      { id: 'konfirmasi_bayar', label: 'Konfirmasi pembayaran diterima', push: true, email: true, wa: true },
      { id: 'bayar_pending', label: 'Pembayaran pending', push: true, email: false, wa: true },
    ],
  },
  {
    section: 'Pengingat Sesi',
    items: [
      { id: 'reminder_h1', label: 'Pengingat sesi H-1 (24 jam)', push: true, email: true, wa: true },
      { id: 'reminder_h0', label: 'Pengingat sesi H-0 (2 jam)', push: true, email: false, wa: true },
      { id: 'reminder_ulasan', label: 'Pengingat ulasan setelah sesi', push: true, email: false, wa: true },
    ],
  },
  {
    section: 'Promosi & Info',
    items: [
      { id: 'promo', label: 'Promo & penawaran spesial', push: true, email: true, wa: false },
      { id: 'update_fitur', label: 'Update layanan & fitur baru', push: true, email: true, wa: false },
    ],
  },
]

const RIWAYAT_NOTIF = [
  { id: 1, judul: 'Booking Dikonfirmasi', isi: 'Sesi dengan Rina Kusuma Sabtu 7 Jun · 10:00 WIB telah dikonfirmasi.', waktu: '2 jam lalu', dibaca: false, icon: '✅' },
  { id: 2, judul: 'Pengingat Sesi Besok', isi: 'Jangan lupa! Sesi Klinik bersama Rina Kusuma besok pukul 10:00 WIB.', waktu: '1 hari lalu', dibaca: true, icon: '⏰' },
  { id: 3, judul: 'Pembayaran Diterima', isi: 'Pembayaran Rp 300.000 untuk sesi 31 Mei telah dikonfirmasi.', waktu: '8 hari lalu', dibaca: true, icon: '💳' },
  { id: 4, judul: 'Promo Paket 6 Sesi', isi: 'Hemat 14% dengan Paket 6 Sesi! Berlaku hingga 30 Juni 2026.', waktu: '10 hari lalu', dibaca: true, icon: '🎁' },
]

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 flex-shrink-0 ${value ? 'bg-[#2aa148]' : 'bg-[#d1d5db]'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

export default function ProfilNotifikasi({ onNavigate }) {
  const [masterOn, setMasterOn] = useState(true)
  const [confirmMasterOff, setConfirmMasterOff] = useState(false)
  const [prefs, setPrefs] = useState(() => {
    const map = {}
    NOTIF_CONFIG.forEach((s) => s.items.forEach((item) => {
      map[item.id] = { aktif: true, push: item.push, email: item.email, wa: item.wa }
    }))
    return map
  })
  const [riwayat, setRiwayat] = useState(RIWAYAT_NOTIF)

  function toggleItem(id, field) {
    setPrefs((prev) => ({ ...prev, [id]: { ...prev[id], [field]: !prev[id][field] } }))
  }

  function tandaiSemuaDibaca() {
    setRiwayat((prev) => prev.map((n) => ({ ...n, dibaca: true })))
  }

  const unreadCount = riwayat.filter((n) => !n.dibaca).length

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* Fixed Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.07)]">
        <StatusBar />
        <div className="flex items-center px-4 h-[52px]">
          <button onClick={() => onNavigate('profil')} className="text-[20px] text-[#1a1a1a]">‹</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Notifikasi</p>
          {unreadCount > 0 && (
            <div className="bg-[#ef4444] rounded-full w-5 h-5 flex items-center justify-center">
              <span className="text-[9px] font-bold text-white">{unreadCount}</span>
            </div>
          )}
        </div>
      </div>
      <div className="h-[96px]" />

      <div className="px-4 flex flex-col gap-4">

        {/* Master toggle */}
        <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] px-4 py-3 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold text-[#1a1a1a]">Aktifkan Semua Notifikasi</p>
            <p className="text-[10px] text-[#6b7280] mt-0.5">Kontrol semua notifikasi sekaligus</p>
          </div>
          <Toggle value={masterOn} onChange={(v) => { if (!v) setConfirmMasterOff(true); else setMasterOn(true) }} />
        </div>

        {/* Sections */}
        {NOTIF_CONFIG.map((section) => (
          <div key={section.section} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <p className="text-[11px] font-semibold text-[#6b7280] px-4 py-2 border-b border-[#f0f0f0] bg-[#f8f9fa]">
              {section.section}
            </p>
            {section.items.map((item, i) => {
              const p = prefs[item.id]
              return (
                <div key={item.id} className={`px-4 py-3 ${i < section.items.length - 1 ? 'border-b border-[#f0f0f0]' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[12px] font-medium text-[#1a1a1a] flex-1 pr-3">{item.label}</p>
                    <Toggle value={p.aktif} onChange={(v) => toggleItem(item.id, 'aktif')} />
                  </div>
                  {p.aktif && (
                    <div className="flex gap-3">
                      {[
                        { key: 'push', label: 'Push' },
                        { key: 'email', label: 'Email' },
                        { key: 'wa', label: 'WA' },
                      ].map((ch) => (
                        <button
                          key={ch.key}
                          onClick={() => toggleItem(item.id, ch.key)}
                          className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border transition-colors ${
                            p[ch.key]
                              ? 'bg-[#e8f6eb] text-[#2aa148] border-[#2aa148]'
                              : 'bg-white text-[#9ca3af] border-[#e5e9eb]'
                          }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}

        {/* Riwayat notifikasi */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#1a1a1a]">Riwayat Notifikasi</p>
            {unreadCount > 0 && (
              <button onClick={tandaiSemuaDibaca} className="text-[11px] font-medium text-[#2aa148]">
                Tandai semua dibaca
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {riwayat.map((n) => (
              <button
                key={n.id}
                onClick={() => setRiwayat((prev) => prev.map((r) => r.id === n.id ? { ...r, dibaca: true } : r))}
                className={`w-full text-left rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] p-3 flex items-start gap-3 ${
                  !n.dibaca ? 'bg-[#f0faf4] border border-[#c3e6cb]' : 'bg-white'
                }`}
              >
                <span className="text-[20px] flex-shrink-0">{n.icon}</span>
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{n.judul}</p>
                  <p className="text-[10px] text-[#6b7280] mt-0.5 leading-relaxed">{n.isi}</p>
                  <p className="text-[9px] text-[#9ca3af] mt-1">{n.waktu}</p>
                </div>
                {!n.dibaca && <div className="w-2 h-2 rounded-full bg-[#2aa148] flex-shrink-0 mt-1" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal konfirmasi matikan semua */}
      {confirmMasterOff && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setConfirmMasterOff(false)} />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white rounded-t-[20px] z-50 px-5 pt-5 pb-8">
            <p className="text-[15px] font-semibold text-[#1a1a1a] text-center">Matikan Semua Notifikasi?</p>
            <p className="text-[12px] text-[#6b7280] text-center mt-1">Kamu tidak akan menerima notifikasi apapun dari Ruang Fisio</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setConfirmMasterOff(false)} className="flex-1 border border-[#e5e9eb] rounded-[10px] py-3 text-[13px] font-medium">Batal</button>
              <button onClick={() => { setMasterOn(false); setConfirmMasterOff(false) }} className="flex-1 bg-[#ef4444] rounded-[10px] py-3 text-[13px] font-semibold text-white">Matikan</button>
            </div>
          </div>
        </>
      )}

      <BottomNav active="profil" onNavigate={onNavigate} />
    </div>
  )
}
