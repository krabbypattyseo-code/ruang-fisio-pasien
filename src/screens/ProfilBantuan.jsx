import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const FAQ_DATA = {
  Booking: [
    { q: 'Bagaimana cara membooking sesi?', a: 'Buka Tab Booking → pilih fisioterapis → pilih paket → pilih jadwal → konfirmasi & bayar.' },
    { q: 'Berapa lama slot di-hold setelah pilih jadwal?', a: '30 menit. Setelah itu slot akan dilepas jika belum ada pembayaran.' },
    { q: 'Minimum booking berapa hari sebelumnya?', a: 'Klinik & Homecare: H-1 | Zona jauh (>15km): H-2 | Online: minimal 2 jam sebelumnya.' },
    { q: 'Apakah bisa booking untuk orang lain?', a: 'Bisa. Isi nama pasien yang berbeda saat mengisi detail keluhan di form booking.' },
    { q: 'Bagaimana cara reschedule?', a: 'Buka halaman Detail Booking → tap "Reschedule" → pilih tanggal & waktu baru.' },
    { q: 'Bagaimana cara membatalkan booking?', a: 'Buka Detail Booking → tap "Batalkan Booking" → konfirmasi. Refund sesuai kebijakan pembatalan.' },
  ],
  Pembayaran: [
    { q: 'Metode pembayaran apa yang tersedia?', a: 'QRIS (GoPay/OVO/Dana/m-banking) dan Transfer Bank (BCA, Mandiri, BRI, BNI).' },
    { q: 'Berapa biaya tambahan untuk QRIS?', a: '0.7% dari total transaksi.' },
    { q: 'Untuk homecare, kenapa harus DP dulu?', a: 'DP 50% untuk konfirmasi ketersediaan terapis dan mengcover biaya perjalanan.' },
    { q: 'Berapa lama konfirmasi transfer bank?', a: 'Maksimal 1×24 jam pada hari kerja (Senin–Sabtu).' },
    { q: 'Apakah ada refund jika dibatalkan?', a: 'Pembatalan >4 jam sebelum sesi: refund penuh. <4 jam: refund 50%.' },
  ],
  Layanan: [
    { q: 'Berapa lama sesi berlangsung?', a: 'Fisioterapi Umum: 45–60 mnt | Sport Therapy: 60 mnt | Pasca Operasi: 60–90 mnt | Online: 30–60 mnt.' },
    { q: 'Apakah satu paket harus dengan terapis yang sama?', a: 'Ya, paket sesi terikat dengan satu terapis. Hubungi admin jika perlu ganti terapis.' },
    { q: 'Berapa lama masa berlaku paket sesi?', a: '3 bulan sejak tanggal pembelian paket.' },
    { q: 'Apakah bisa ganti terapis di tengah paket?', a: 'Tidak bisa secara mandiri. Hubungi admin Ruang Fisio via WhatsApp untuk bantuan.' },
  ],
  Terapis: [
    { q: 'Apa perbedaan Ruang Fisio dan Mitra?', a: 'Ruang Fisio = fisioterapis staff internal klinik. Mitra = fisioterapis independen terverifikasi IFI.' },
    { q: 'Apakah semua terapis bersertifikat?', a: 'Ya. Semua terapis memiliki STR dan SIP aktif yang diverifikasi oleh Ruang Fisio.' },
    { q: 'Bagaimana cara memilih terapis yang tepat?', a: 'Filter berdasarkan spesialisasi kondisi di Tab Layanan, lalu cek profil & ulasan terapis.' },
    { q: 'Bagaimana cara menyimpan terapis favorit?', a: 'Buka profil terapis → tap ikon ♡ di pojok kanan atas.' },
  ],
  Homecare: [
    { q: 'Area mana saja yang dijangkau layanan Homecare?', a: 'Seluruh Tangerang Raya, radius hingga 30 km dari klinik Ruang Fisio.' },
    { q: 'Bagaimana biaya transportasi dihitung?', a: 'Rp 5.000/km dihitung pulang-pergi (PP) dari klinik ke lokasi pasien.' },
    { q: 'Apa yang perlu disiapkan sebelum terapis datang?', a: 'Ruang bersih minimal 2×3 meter, matras/kasur, akses parkir, dan air minum.' },
    { q: 'Bagaimana jika terapis terlambat lebih dari 30 menit?', a: 'Kamu berhak memilih: reschedule gratis atau refund DP 100%.' },
  ],
  Akun: [
    { q: 'Bagaimana cara mengubah data profil?', a: 'Buka Tab Profil → tap tombol "Edit" di kartu profil.' },
    { q: 'Bagaimana cara ganti nomor HP?', a: 'Profil → Pengaturan Akun → Ganti Nomor HP. Diperlukan verifikasi OTP.' },
    { q: 'Bagaimana jika lupa password?', a: 'Di halaman Login → tap "Lupa Password" → ikuti instruksi reset via email.' },
    { q: 'Apakah bisa menghapus akun?', a: 'Bisa. Hubungi admin melalui WhatsApp atau form laporan masalah di halaman ini.' },
  ],
}

const KATEGORI = Object.keys(FAQ_DATA)
const KATEGORI_ICON = { Booking: '📅', Pembayaran: '💳', Layanan: '🏥', Terapis: '👨‍⚕️', Homecare: '🏠', Akun: '👤' }

const TOPIK_LAPORAN = ['Booking bermasalah', 'Pembayaran', 'Terapis tidak datang', 'Kualitas layanan', 'Aplikasi error', 'Lainnya']

export default function ProfilBantuan({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [activeKategori, setActiveKategori] = useState(null)
  const [expandedQ, setExpandedQ] = useState(null)
  const [topik, setTopik] = useState(TOPIK_LAPORAN[0])
  const [deskripsi, setDeskripsi] = useState('')
  const [terkirim, setTerkirim] = useState(false)

  const searchResults = search.trim()
    ? KATEGORI.flatMap((k) =>
        FAQ_DATA[k]
          .filter((item) =>
            item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => ({ ...item, kategori: k }))
      )
    : []

  function kirimLaporan() {
    if (!deskripsi.trim()) return
    setTerkirim(true)
    setDeskripsi('')
    setTimeout(() => setTerkirim(false), 3000)
  }

  const faqToShow = activeKategori ? FAQ_DATA[activeKategori] : []

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* Fixed Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.07)]">
        <StatusBar />
        <div className="flex items-center px-4 h-[52px]">
          <button onClick={() => onNavigate('profil')} className="text-[20px] text-[#1a1a1a]">‹</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Bantuan & FAQ</p>
        </div>
      </div>
      <div className="h-[96px]" />

      <div className="px-4 flex flex-col gap-4">

        {/* Search bar */}
        <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] flex items-center px-3 h-[44px] gap-2">
          <span className="text-[14px] text-[#9ca3af]">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setActiveKategori(null) }}
            placeholder="Cari pertanyaan atau topik..."
            className="flex-1 text-[12px] text-[#1a1a1a] placeholder-[#9ca3af] outline-none bg-transparent"
          />
          {search && <button onClick={() => setSearch('')} className="text-[#9ca3af] text-[14px]">✕</button>}
        </div>

        {/* Search results */}
        {search.trim() && (
          <div className="flex flex-col gap-2">
            <p className="text-[11px] text-[#6b7280]">{searchResults.length} hasil untuk "{search}"</p>
            {searchResults.length === 0 ? (
              <div className="bg-white rounded-[12px] p-5 text-center shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
                <p className="text-[12px] text-[#9ca3af]">Tidak ada hasil. Coba kata kunci lain atau hubungi kami langsung.</p>
              </div>
            ) : (
              searchResults.map((item, i) => (
                <div key={i} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden">
                  <button
                    className="w-full flex items-start gap-3 p-3 text-left"
                    onClick={() => setExpandedQ(expandedQ === `s${i}` ? null : `s${i}`)}
                  >
                    <span className="text-[14px]">{KATEGORI_ICON[item.kategori]}</span>
                    <p className="flex-1 text-[12px] font-medium text-[#1a1a1a]">{item.q}</p>
                    <span className="text-[10px] text-[#9ca3af]">{expandedQ === `s${i}` ? '▲' : '▼'}</span>
                  </button>
                  {expandedQ === `s${i}` && (
                    <div className="px-4 pb-3 border-t border-[#f0f0f0] pt-2">
                      <p className="text-[11px] text-[#6b7280] leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {!search.trim() && (
          <>
            {/* Hubungi kami */}
            <div>
              <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Hubungi Kami</p>
              <div className="flex flex-col gap-2">
                {[
                  { icon: '💬', title: 'WhatsApp', sub: 'Sen–Sab 08.00–20.00 · Respons < 1 jam', color: 'bg-[#e8f6eb]', href: 'https://wa.me/6281234567890' },
                  { icon: '📧', title: 'Email', sub: 'support@ruangfisio.id · Respons 1×24 jam', color: 'bg-[#eaeffe]', href: null },
                  { icon: '📞', title: 'Telepon', sub: 'Sen–Sab 09.00–17.00', color: 'bg-[#fff3cd]', href: null },
                ].map((c) => (
                  <div key={c.title} className={`${c.color} rounded-[12px] px-4 py-3 flex items-center gap-3`}>
                    <span className="text-[22px]">{c.icon}</span>
                    <div>
                      <p className="text-[12px] font-semibold text-[#1a1a1a]">{c.title}</p>
                      <p className="text-[10px] text-[#6b7280]">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori FAQ */}
            <div>
              <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">
                {activeKategori ? (
                  <button onClick={() => setActiveKategori(null)} className="flex items-center gap-2">
                    <span className="text-[#2aa148]">‹</span> {KATEGORI_ICON[activeKategori]} {activeKategori}
                  </button>
                ) : 'Kategori FAQ'}
              </p>

              {!activeKategori ? (
                <div className="grid grid-cols-3 gap-2">
                  {KATEGORI.map((k) => (
                    <button
                      key={k}
                      onClick={() => { setActiveKategori(k); setExpandedQ(null) }}
                      className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-3 flex flex-col items-center gap-1.5"
                    >
                      <span className="text-[22px]">{KATEGORI_ICON[k]}</span>
                      <p className="text-[10px] font-medium text-[#1a1a1a] text-center">{k}</p>
                      <p className="text-[9px] text-[#9ca3af]">{FAQ_DATA[k].length} pertanyaan</p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {faqToShow.map((item, i) => (
                    <div key={i} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden">
                      <button
                        className="w-full flex items-center gap-3 p-3 text-left"
                        onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                      >
                        <p className="flex-1 text-[12px] font-medium text-[#1a1a1a]">{item.q}</p>
                        <span className="text-[10px] text-[#9ca3af] flex-shrink-0">{expandedQ === i ? '▲' : '▼'}</span>
                      </button>
                      {expandedQ === i && (
                        <div className="px-4 pb-3 border-t border-[#f0f0f0] pt-2">
                          <p className="text-[11px] text-[#6b7280] leading-relaxed">{item.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form laporan masalah */}
            <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4">
              <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Laporkan Masalah</p>
              {terkirim ? (
                <div className="text-center py-4">
                  <p className="text-[24px] mb-2">✅</p>
                  <p className="text-[13px] font-semibold text-[#2aa148]">Laporan Terkirim!</p>
                  <p className="text-[11px] text-[#6b7280] mt-1">Tim kami akan merespons dalam 1×24 jam</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] text-[#6b7280] mb-1">Topik</p>
                    <select
                      value={topik}
                      onChange={(e) => setTopik(e.target.value)}
                      className="w-full h-10 border border-[#e5e9eb] rounded-[8px] px-3 text-[12px] text-[#1a1a1a] bg-white"
                    >
                      {TOPIK_LAPORAN.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#6b7280] mb-1">Deskripsi masalah</p>
                    <textarea
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      placeholder="Ceritakan masalah yang kamu alami..."
                      rows={3}
                      className="w-full border border-[#e5e9eb] rounded-[8px] px-3 py-2 text-[12px] text-[#1a1a1a] outline-none resize-none placeholder-[#9ca3af]"
                    />
                  </div>
                  <button
                    onClick={kirimLaporan}
                    disabled={!deskripsi.trim()}
                    className={`w-full rounded-[10px] py-3 text-[12px] font-semibold transition-colors ${
                      deskripsi.trim() ? 'bg-[#2aa148] text-white' : 'bg-[#e5e9eb] text-[#9ca3af]'
                    }`}
                  >
                    Kirim Laporan
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <BottomNav active="profil" onNavigate={onNavigate} />
    </div>
  )
}
