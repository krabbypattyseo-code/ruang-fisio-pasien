import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Badge from '../components/Badge'
import { fisioterapis } from '../data/fisioterapis'
import { getJadwal } from '../utils/jadwal'

// Fallback jika tidak ada data terapis yang di-pass
const DEFAULT_TERAPIS = fisioterapis[0]

/** Harga per mode layanan */
function getTarif(terapis) {
  const base = terapis.harga_mulai
  return [
    { type: 'Klinik', price: `Rp ${base.toLocaleString('id-ID')}`, note: 'Bayar penuh', available: terapis.tersedia_klinik },
    { type: 'Homecare', price: `Rp ${base.toLocaleString('id-ID')}`, note: '+biaya perjalanan', available: terapis.tersedia_homecare },
    { type: 'Online', price: `Rp ${Math.round(base * 0.67 / 1000) * 1000}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.'), note: 'Bayar penuh', available: terapis.tersedia_online },
  ].filter(t => t.available)
}

/** Identitas untuk tab Background — generate dari data */
function getIdentitas(terapis) {
  const thnLahir = 1994 - (terapis.id.split('-')[1] % 10)
  const kota = ['Tangerang', 'Jakarta Selatan', 'Depok', 'Bekasi', 'Bogor']
  const kotaIdx = terapis.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % kota.length
  return [
    { label: 'Nama lengkap', value: `${terapis.nama}, ${terapis.gelar}` },
    { label: 'Domisili', value: kota[kotaIdx] },
    { label: 'Status mitra', value: terapis.status === 'ruang_fisio' ? 'Internal Ruang Fisio ✓' : 'Mitra Terverifikasi ✓' },
    { label: 'Bahasa', value: 'Indonesia, Inggris' },
  ]
}

function getPendidikan(terapis) {
  const institusi = ['Universitas Indonesia', 'Universitas Airlangga', 'Universitas Padjadjaran', 'UNS Solo', 'UNJ']
  const idx = terapis.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % institusi.length
  const tahun = 2015 + (idx % 8)
  return [
    { label: 'Jenjang / Prodi', value: 'D4 Fisioterapi' },
    { label: 'Institusi', value: institusi[idx] },
    { label: 'Tahun lulus / Gelar', value: `${tahun} / S.Ft` },
  ]
}

function getStatistik(terapis) {
  const base = terapis.jumlah_ulasan
  const thn = 4 + Math.round(base / 30)
  const perBulan = Math.round(base / (thn * 12))
  return [
    { value: String(base * 3), label: 'Total Pasien' },
    { value: String(terapis.rating), label: 'Avg Rating' },
    { value: String(thn), label: 'Thn Pengalaman' },
    { value: String(Math.max(8, perBulan)), label: 'Sesi / Bulan' },
  ]
}

function getLegalitas(terapis) {
  const num = terapis.id.replace('fisio-', '').padStart(4, '0')
  return [
    { label: 'STR', value: `No. ${num}7-IFI-2024 (valid s/d Des 2026)` },
    { label: 'SIP', value: `No. ${num}5/TNG/2024 (Kota Tangerang)` },
    { label: 'Organisasi', value: 'IFI — Ikatan Fisioterapi Indonesia' },
    { label: 'Sertifikasi', value: terapis.spesialisasi.join(', ') },
  ]
}

/* ─────────────────── Sub-components ─────────────────── */

function ProfilTab({ terapis, onNavigate, selectedMode, setSelectedMode }) {
  const tarif = getTarif(terapis)
  const jadwal = getJadwal(terapis)

  return (
    <div className="px-5 mt-4 flex flex-col gap-4 pb-[160px]">
      {/* Kondisi yang Ditangani */}
      <div>
        <p className="text-[13px] font-semibold text-[#1a1a1a]">Kondisi yang Ditangani</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {terapis.kondisi_ditangani.map((c) => (
            <span key={c} className="bg-[#e8f6eb] text-[#2aa148] text-[10px] font-medium rounded-full px-3 h-[26px] flex items-center">
              {c}
            </span>
          ))}
        </div>
      </div>
      <hr className="border-[#e5e9eb]" />

      {/* Tarif Sesi — interaktif */}
      <div>
        <p className="text-[13px] font-semibold text-[#1a1a1a]">Tarif Sesi</p>
        <p className="text-[10px] text-[#6b7280] mt-0.5">Ketuk untuk pilih mode layanan</p>
        <div className="flex gap-2 mt-2">
          {tarif.map((r) => {
            const isSelected = selectedMode === r.type
            return (
              <button
                key={r.type}
                onClick={() => setSelectedMode(r.type)}
                className={`flex-1 rounded-[10px] p-2 text-left transition-all border-[1.5px] ${
                  isSelected
                    ? 'bg-[#e8f6eb] border-[#2aa148] shadow-[0px_2px_8px_0px_rgba(42,161,72,0.15)]'
                    : 'bg-white border-transparent shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]'
                }`}
              >
                <p className={`text-[11px] font-semibold ${isSelected ? 'text-[#2aa148]' : 'text-[#1a1a1a]'}`}>{r.type}</p>
                <p className={`text-[13px] font-bold mt-1 ${isSelected ? 'text-[#2aa148]' : 'text-[#1a1a1a]'}`}>{r.price}</p>
                <p className="text-[9px] text-[#6b7280]">{r.note}</p>
                {isSelected && (
                  <span className="inline-block mt-1 text-[8px] font-semibold text-[#2aa148] bg-white rounded-full px-1.5 py-0.5">
                    ✓ Dipilih
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
      <hr className="border-[#e5e9eb]" />

      {/* Tentang */}
      <div>
        <p className="text-[13px] font-semibold text-[#1a1a1a]">Tentang</p>
        <p className="text-[11px] text-[#6b7280] mt-1">
          Fisioterapis berpengalaman spesialis {terapis.spesialisasi.join(' dan ')}.
          Anggota IFI. Melayani {terapis.mode_layanan.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ')}.
        </p>
      </div>
      <hr className="border-[#e5e9eb]" />

      {/* Jadwal — informasi saja, pilihan hari di halaman Pilih Jadwal */}
      <div>
        <p className="text-[13px] font-semibold text-[#1a1a1a]">Jadwal Tersedia (30 hari ke depan)</p>
        <p className="text-[10px] text-[#6b7280] mt-0.5">Hari aktif = terapis buka layanan</p>
        <div className="flex gap-1 mt-2">
          {jadwal.map((d) => (
            <div
              key={d.day}
              className={`flex-1 h-[38px] rounded-[8px] flex items-center justify-center ${
                d.available ? 'bg-[#2aa148]' : 'bg-[#ededed]'
              }`}
            >
              <span className={`text-[11px] font-semibold ${d.available ? 'text-white' : 'text-[#d1d1d1]'}`}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#6b7280] mt-1.5">⏰ Terdekat: {terapis.jadwal_terdekat}</p>
      </div>
    </div>
  )
}

function BackgroundTab({ terapis }) {
  const identitas = getIdentitas(terapis)
  const pendidikan = getPendidikan(terapis)
  const statistik = getStatistik(terapis)
  const legalitas = getLegalitas(terapis)

  const Section = ({ title, rows }) => (
    <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden mb-3">
      <p className="text-[11px] font-bold text-[#2aa148] px-4 py-2 bg-[#f8f9fa]">{title}</p>
      {rows.map((item) => (
        <div key={item.label} className="flex px-4 py-2 border-b border-[#f5f5f5] last:border-0">
          <span className="text-[10px] text-[#6b7280] w-[110px] flex-shrink-0">{item.label}</span>
          <span className="text-[10px] font-medium text-[#1a1a1a]">{item.value}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="px-4 mt-4 flex flex-col gap-1 pb-[160px]">
      <Section title="A — Identitas Diri" rows={identitas} />
      <Section title="B — Pendidikan" rows={pendidikan} />

      {/* C — Statistik */}
      <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden mb-3">
        <p className="text-[11px] font-bold text-[#2aa148] px-4 py-2 bg-[#f8f9fa]">C — Statistik Layanan</p>
        <div className="grid grid-cols-4 px-4 py-3 gap-2">
          {statistik.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[18px] font-bold text-[#2aa148]">{s.value}</p>
              <p className="text-[9px] text-[#6b7280] leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="px-4 pb-3">
          <p className="text-[10px] text-[#6b7280]">
            Mode: {terapis.mode_layanan.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(' · ')}
          </p>
        </div>
      </div>

      <Section title="D — Legalitas & Sertifikasi" rows={legalitas} />
    </div>
  )
}

/* ─────────────────── Main Component ─────────────────── */

export default function ProfilFisioterapis({ onNavigate, terapis: terapisProp = null }) {
  const [tab, setTab] = useState('profil')
  const terapis = terapisProp || DEFAULT_TERAPIS

  // Lifted up dari ProfilTab agar sticky CTA bisa akses selectedMode
  const tarif = getTarif(terapis)
  const [selectedMode, setSelectedMode] = useState(tarif[0]?.type || null)

  const badgeLabel = terapis.status === 'ruang_fisio' ? 'Internal RF' : 'Mitra ✓'
  const stars = Math.round(terapis.rating)

  // Diukur dari DOM: fixed header = 325px
  const HEADER_H = 325

  return (
    <div className="bg-[#f8f9fa] min-h-screen">

      {/* ── FIXED HEADER ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
        <StatusBar />

        {/* Hero */}
        <div className="bg-[#2aa148] h-[130px] relative">
          <button onClick={() => onNavigate('layanan')} className="absolute top-3 left-3 text-white text-[15px] font-medium">
            ← Profil Fisioterapis
          </button>
          <div className="absolute left-1/2 -translate-x-1/2 top-[66px]">
            <div className="w-20 h-20 rounded-full bg-[#99e0a8] flex items-center justify-center border-4 border-white">
              <span className="text-[18px] font-bold text-[#1e7835]">{terapis.inisial}</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white pt-12 pb-3 text-center">
          <p className="text-[16px] font-bold text-[#1a1a1a]">{terapis.nama}, {terapis.gelar}</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Badge label={badgeLabel} />
            <span className="text-[11px] text-[#ffbd18]">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
            <span className="text-[11px] text-[#6b7280]">{terapis.rating} · {terapis.jumlah_ulasan} ulasan</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white flex border-b border-[#e5e9eb]">
          {['profil', 'background'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 text-[12px] font-semibold capitalize border-b-2 transition-colors ${
                tab === t ? 'border-[#2aa148] text-[#2aa148]' : 'border-transparent text-[#6b7280]'
              }`}
            >
              {t === 'profil' ? 'Profil' : 'Background'}
            </button>
          ))}
        </div>
      </div>
      {/* ── END FIXED HEADER ── */}

      {/* Spacer */}
      <div style={{ height: HEADER_H }} />

      {tab === 'profil'
        ? <ProfilTab terapis={terapis} onNavigate={onNavigate} selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
        : <BackgroundTab terapis={terapis} />
      }

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white border-t border-[#e5e9eb] px-5 py-3 z-50">
        <p className="text-[10px] text-[#6b7280] mb-2">
          {selectedMode === 'Online'
            ? `Online mulai Rp ${(Math.round(terapis.harga_mulai * 0.5 / 5000) * 5000).toLocaleString('id-ID')} · Pilih jenis konsultasi`
            : selectedMode === 'Homecare'
            ? `Homecare Rp ${terapis.harga_mulai.toLocaleString('id-ID')} + biaya perjalanan`
            : `Klinik Rp ${terapis.harga_mulai.toLocaleString('id-ID')}`
          }
        </p>
        <button
          onClick={() => {
            if (selectedMode === 'Online') {
              onNavigate('layanan-online', { terapis, from: 'profil-terapis', fromState: { terapis } })
            } else {
              onNavigate('booking-pilih-paket', { terapis })
            }
          }}
          className="w-full bg-[#2aa148] text-white text-[13px] font-semibold rounded-[10px] h-10"
        >
          {selectedMode === 'Online' ? 'Lihat Paket Konsultasi Online →' : 'Booking Sekarang'}
        </button>
      </div>
    </div>
  )
}
