import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const DOKUMEN = [
  {
    id: 'tos',
    title: 'Syarat & Ketentuan Layanan',
    icon: '📋',
    updated: '1 Juni 2026',
    babs: [
      {
        judul: '1. Tentang Platform',
        isi: 'Ruang Fisio adalah platform yang menghubungkan pasien dengan fisioterapis berlisensi di wilayah Tangerang Raya. Kami bertindak sebagai perantara dan bukan penyedia layanan medis langsung.',
      },
      {
        judul: '2. Kewajiban Pasien',
        isi: 'Pasien wajib memberikan informasi kesehatan yang akurat saat booking. Informasi yang tidak akurat dapat mengakibatkan pembatalan sesi tanpa refund.',
      },
      {
        judul: '3. Status Terapis Mitra',
        isi: 'Terapis dengan label "Mitra" adalah fisioterapis independen terverifikasi — bukan karyawan Ruang Fisio. Ruang Fisio tidak bertanggung jawab atas cedera akibat ketidakpatuhan instruksi terapis.',
      },
      {
        judul: '4. Harga & Perubahan',
        isi: 'Ruang Fisio berhak mengubah harga layanan dengan pemberitahuan minimal 7 hari sebelumnya. Paket yang sudah dibeli tidak terdampak perubahan harga.',
      },
      {
        judul: '5. Akun',
        isi: 'Akun Ruang Fisio bersifat personal dan tidak dapat dipindahtangankan. Penyalahgunaan akun dapat mengakibatkan pemblokiran permanen.',
      },
    ],
  },
  {
    id: 'privasi',
    title: 'Kebijakan Privasi',
    icon: '🔒',
    updated: '1 Juni 2026',
    babs: [
      {
        judul: '1. Data yang Dikumpulkan',
        isi: 'Kami mengumpulkan: nama, nomor kontak, email, riwayat sesi, kondisi medis yang disebutkan pasien, dan lokasi (khusus layanan Homecare).',
      },
      {
        judul: '2. Penggunaan Data',
        isi: 'Data Anda digunakan untuk memfasilitasi sesi fisioterapi, mengirim notifikasi relevan, dan meningkatkan kualitas layanan. Data TIDAK dijual atau dibagikan ke pihak ketiga untuk tujuan komersial.',
      },
      {
        judul: '3. Akses Data Medis',
        isi: 'Data medis hanya dapat diakses oleh terapis yang menangani Anda dan admin Ruang Fisio. Data ini dilindungi dengan enkripsi standar industri.',
      },
      {
        judul: '4. Hak Pasien',
        isi: 'Pasien berhak meminta penghapusan data kapan saja, kecuali data yang diwajibkan disimpan oleh hukum. Ajukan permintaan melalui halaman Bantuan.',
      },
      {
        judul: '5. Penyimpanan Data',
        isi: 'Semua data disimpan di server Indonesia sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP). Cookies hanya digunakan untuk fungsi aplikasi, bukan tracking iklan.',
      },
    ],
  },
  {
    id: 'pembatalan',
    title: 'Kebijakan Pembatalan & Refund',
    icon: '↩️',
    updated: '1 Juni 2026',
    babs: [
      {
        judul: 'Pembatalan oleh Pasien (>4 jam)',
        isi: 'Pembatalan lebih dari 4 jam sebelum sesi: refund 100%. Proses 1–3 hari kerja ke metode pembayaran asal.',
      },
      {
        judul: 'Pembatalan oleh Pasien (<4 jam)',
        isi: 'Pembatalan kurang dari 4 jam sebelum sesi: refund 50%. Sisa 50% dianggap biaya pembatalan mendadak.',
      },
      {
        judul: 'No-Show (Tidak Hadir)',
        isi: 'Jika pasien tidak hadir tanpa konfirmasi pembatalan, sesi dianggap selesai dan tidak ada refund.',
      },
      {
        judul: 'Pembatalan oleh Terapis',
        isi: 'Jika terapis sakit atau berhalangan: refund 100% otomatis + reschedule gratis ke jadwal pilihan pasien.',
      },
      {
        judul: 'Terapis Terlambat >30 Menit',
        isi: 'Pasien berhak memilih: refund 100% atau reschedule gratis. Proses klaim melalui halaman Bantuan.',
      },
      {
        judul: 'Gangguan Teknis Aplikasi',
        isi: 'Jika sesi gagal karena gangguan teknis dari pihak Ruang Fisio: refund 100% otomatis.',
      },
    ],
  },
  {
    id: 'homecare',
    title: 'Kebijakan Layanan Homecare',
    icon: '🏠',
    updated: '1 Juni 2026',
    babs: [
      {
        judul: 'Area Layanan',
        isi: 'Layanan Homecare tersedia di seluruh Tangerang Raya (Kota Tangerang, Tangerang Selatan, Kabupaten Tangerang) dengan radius hingga 30 km dari klinik.',
      },
      {
        judul: 'Biaya Transportasi',
        isi: 'Biaya transport dihitung Rp 5.000/km pulang-pergi (PP) dari klinik ke lokasi pasien. Estimasi biaya ditampilkan saat booking sebelum konfirmasi.',
      },
      {
        judul: 'Tanggung Jawab Pasien',
        isi: 'Pasien bertanggung jawab menyediakan: ruang minimal 2×3 meter, matras atau kasur, akses parkir untuk terapis, dan informasikan kondisi medis lengkap.',
      },
      {
        judul: 'Keamanan & Verifikasi',
        isi: 'Terapis Homecare wajib menunjukkan ID Mitra Ruang Fisio saat tiba. Jangan izinkan masuk jika tidak ada ID. Laporkan segera ke admin jika ada insiden.',
      },
      {
        judul: 'Pembatalan Homecare',
        isi: 'Batal gratis hingga 6 jam sebelum jadwal. Kurang dari 6 jam: DP tidak dikembalikan sebagai kompensasi perjalanan terapis yang sudah disiapkan.',
      },
    ],
  },
]

export default function ProfilKetentuan({ onNavigate }) {
  const [activeDok, setActiveDok] = useState(null)
  const [expandedBab, setExpandedBab] = useState(null)

  const dok = DOKUMEN.find((d) => d.id === activeDok)

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* Fixed Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.07)]">
        <StatusBar />
        <div className="flex items-center px-4 h-[52px]">
          <button
            onClick={() => activeDok ? (setActiveDok(null), setExpandedBab(null)) : onNavigate('profil')}
            className="text-[20px] text-[#1a1a1a]"
          >‹</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">
            {dok ? dok.title : 'Syarat & Ketentuan'}
          </p>
        </div>
      </div>
      <div className="h-[96px]" />

      <div className="px-4 flex flex-col gap-4">

        {!activeDok ? (
          <>
            {/* Status persetujuan */}
            <div className="bg-[#e8f6eb] rounded-[12px] px-4 py-3 flex items-center gap-3">
              <span className="text-[22px]">✅</span>
              <div>
                <p className="text-[12px] font-semibold text-[#2aa148]">Semua dokumen telah disetujui</p>
                <p className="text-[10px] text-[#6b7280]">Disetujui pada 1 Januari 2026 · Versi 1.0</p>
              </div>
            </div>

            {/* List dokumen */}
            {DOKUMEN.map((d) => (
              <button
                key={d.id}
                onClick={() => { setActiveDok(d.id); setExpandedBab(null) }}
                className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] px-4 py-3 flex items-center gap-3 text-left w-full"
              >
                <span className="text-[24px]">{d.icon}</span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{d.title}</p>
                  <p className="text-[10px] text-[#9ca3af]">Terakhir diperbarui: {d.updated}</p>
                </div>
                <span className="text-[#9ca3af] text-[16px]">›</span>
              </button>
            ))}

            {/* Tombol aksi */}
            <div className="flex gap-3">
              <button className="flex-1 bg-white border border-[#e5e9eb] rounded-[10px] py-3 text-[12px] font-semibold text-[#2aa148] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
                📄 Unduh PDF
              </button>
              <button className="flex-1 bg-white border border-[#e5e9eb] rounded-[10px] py-3 text-[12px] font-semibold text-[#3b82f6] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
                📧 Kirim ke Email
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Meta dokumen */}
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-[#9ca3af]">Terakhir diperbarui: {dok.updated}</p>
              <span className="text-[9px] bg-[#e8f6eb] text-[#2aa148] font-semibold px-2 py-0.5 rounded-full">✓ Disetujui</span>
            </div>

            {/* Accordion bab */}
            <div className="flex flex-col gap-2">
              {dok.babs.map((bab, i) => (
                <div key={i} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden">
                  <button
                    className="w-full flex items-center gap-3 px-4 py-3 text-left"
                    onClick={() => setExpandedBab(expandedBab === i ? null : i)}
                  >
                    <p className="flex-1 text-[12px] font-semibold text-[#1a1a1a]">{bab.judul}</p>
                    <span className="text-[10px] text-[#9ca3af] flex-shrink-0">{expandedBab === i ? '▲' : '▼'}</span>
                  </button>
                  {expandedBab === i && (
                    <div className="px-4 pb-4 border-t border-[#f0f0f0] pt-3">
                      <p className="text-[11px] text-[#6b7280] leading-relaxed">{bab.isi}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tombol aksi per dokumen */}
            <div className="flex gap-3">
              <button className="flex-1 bg-white border border-[#e5e9eb] rounded-[10px] py-3 text-[12px] font-semibold text-[#2aa148]">
                📄 Unduh PDF
              </button>
              <button className="flex-1 bg-white border border-[#e5e9eb] rounded-[10px] py-3 text-[12px] font-semibold text-[#3b82f6]">
                📧 Kirim ke Email
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNav active="profil" onNavigate={onNavigate} />
    </div>
  )
}
