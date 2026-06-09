import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import Avatar from '../components/Avatar'

/**
 * Hitung harga konsultasi online dari harga_mulai klinik terapis.
 * Rasio: Asesmen Awal 67%, Follow-up 50%, Program Latihan 58%
 * Dibulatkan ke kelipatan 5.000 terdekat.
 */
function buildOnlineConsult(base) {
  const r5k = (n) => Math.round(n / 5000) * 5000
  return [
    {
      id: 'asesmen',
      label: 'Asesmen Awal',
      desc: 'Evaluasi kondisi baru & rekomendasi',
      duration: '60 mnt',
      price: r5k(base * 0.67),
    },
    {
      id: 'followup',
      label: 'Follow-up',
      desc: 'Evaluasi progress & koreksi teknik',
      duration: '30–45 mnt',
      price: r5k(base * 0.50),
    },
    {
      id: 'latihan',
      label: 'Program Latihan',
      desc: 'Desain program + panduan video step-by-step',
      duration: '45 mnt',
      price: r5k(base * 0.58),
    },
  ]
}

// Harga representatif kalau tidak ada konteks terapis (dari Beranda)
const DEFAULT_BASE = 300000

const suitableFor = [
  'Follow-up terapi rutin',
  'Konsultasi cedera ringan',
  'Panduan latihan mandiri',
  'Evaluasi program rehabilitasi',
]
const prepare = [
  'Internet stabil — minimal 5 Mbps',
  'Kamera yang bisa tampilkan area keluhan',
  'Pakaian olahraga sesuai area yang diterapi',
  'Ruangan cukup cahaya dan latar bersih',
]

function fmt(n) {
  return `Rp ${n.toLocaleString('id-ID')}`
}

export default function LayananOnline({ onNavigate, terapis = null, from = 'beranda', fromState = {} }) {
  const base = terapis?.harga_mulai ?? DEFAULT_BASE
  const consultTypes = buildOnlineConsult(base)
  const minPrice = Math.min(...consultTypes.map((c) => c.price))

  const [selected, setSelected] = useState(null)

  function handleBook() {
    if (!terapis) {
      // Dari Beranda → ke halaman layanan dengan filter Online
      onNavigate('layanan', { initialModeFilter: 'Online' })
      return
    }
    if (!selected) return
    // Dari ProfilFisioterapis → langsung ke Mode & Jadwal, skip PilihPaket
    // Buat pkg 1 sesi dari harga jenis konsultasi yang dipilih
    const pkg = {
      sesi: 1,
      perSesi: selected.price,
      total: selected.price,
      save: null,
      popular: false,
    }
    onNavigate('booking-jadwal', {
      terapis,
      selectedPkg: pkg,
      layanan: `Online – ${selected.label}`,
      initialMode: 'online',
      backScreen: 'layanan-online',
      backState: { terapis, from, fromState },
    })
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* ── FIXED HEADER ── */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30">
        <StatusBar />
        <div className="bg-white flex items-center px-4 h-[52px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
          <button onClick={() => onNavigate(from, fromState)} className="text-[12px] text-[#2aa148]">
            {'< Kembali'}
          </button>
          <p className="flex-1 text-center text-[16px] font-semibold text-[#1a1a1a]">Layanan Online</p>
        </div>
        <div className="bg-[#2aa148] px-5 py-4">
          <p className="text-[17px] font-bold text-white">Konsultasi dari Mana Saja</p>
          <p className="text-[10px] text-[#d1f7db] mt-1">
            Via in-app atau Google Meet • Bayar penuh di awal • Fleksibel s/d 21.00
          </p>
        </div>
      </div>
      {/* Spacer: StatusBar 44 + Navbar 52 + Hero ~64 = 160px */}
      <div className="h-[160px]" />

      {/* Terapis context banner — hanya muncul kalau ada konteks terapis */}
      {terapis && (
        <div className="mx-4 mt-3 bg-white rounded-[10px] border border-[#e5e9eb] p-3 flex items-center gap-3 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
          <Avatar initials={terapis.inisial} size="sm" />
          <div>
            <p className="text-[12px] font-semibold text-[#1a1a1a]">{terapis.nama}, {terapis.gelar}</p>
            <p className="text-[10px] text-[#6b7280]">Harga disesuaikan dengan tarif terapis ini</p>
          </div>
        </div>
      )}

      {/* Info chips */}
      <div className="flex gap-2 px-4 mt-3">
        {[
          { label: 'Mulai dari', value: fmt(minPrice) },
          { label: 'Durasi', value: '30–60 menit' },
          { label: 'Platform', value: 'Meet / Zoom' },
        ].map((c) => (
          <div key={c.label} className="flex-1 bg-white rounded-[10px] px-2 py-2 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
            <p className="text-[9px] text-[#6b7280]">{c.label}</p>
            <p className="text-[11px] font-semibold text-[#1a1a1a] mt-0.5">{c.value}</p>
          </div>
        ))}
      </div>

      <hr className="mx-4 mt-4 border-[#e5e9eb]" />

      <div className="px-4 mt-4">
        {/* Pilih jenis konsultasi */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mb-1">Pilih Jenis Konsultasi</p>
        <p className="text-[10px] text-[#6b7280] mb-3">
          {terapis
            ? `Harga berdasarkan tarif ${terapis.nama}`
            : 'Harga representatif — sesuai terapis yang dipilih'}
        </p>
        <div className="flex flex-col gap-2">
          {consultTypes.map((c) => {
            const isSelected = selected?.id === c.id
            return (
              <button
                key={c.id}
                onClick={() => setSelected(isSelected ? null : c)}
                className={`w-full rounded-[10px] px-3 py-3 flex items-center justify-between transition-all border-[1.5px] text-left ${
                  isSelected
                    ? 'bg-[#e8f5ed] border-[#2aa148] shadow-[0px_2px_8px_0px_rgba(42,161,72,0.12)]'
                    : 'bg-white border-[#e5e9eb] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]'
                }`}
              >
                <div>
                  <p className={`text-[12px] font-semibold ${isSelected ? 'text-[#2aa148]' : 'text-[#1a1a1a]'}`}>
                    {c.label}
                    {isSelected && <span className="ml-2 text-[9px] font-normal">✓ Dipilih</span>}
                  </p>
                  <p className="text-[10px] text-[#6b7280] mt-0.5">{c.desc}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <p className="text-[13px] font-bold text-[#2aa148]">{fmt(c.price)}</p>
                  <p className="text-[9px] text-[#6b7280]">{c.duration}</p>
                </div>
              </button>
            )
          })}
        </div>

        <hr className="mt-4 border-[#e5e9eb]" />

        {/* Cocok untuk */}
        <p className="text-[14px] font-semibold text-[#1a1a1a] mt-4 mb-2">Cocok Untuk</p>
        <div className="flex flex-col gap-2">
          {suitableFor.map((s) => (
            <div key={s} className="flex items-start gap-2">
              <span className="text-[11px] font-semibold text-[#2aa148] mt-0.5">•</span>
              <p className="text-[11px] text-[#1a1a1a]">{s}</p>
            </div>
          ))}
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

        {/* Warning */}
        <div className="bg-[#fff7e0] rounded-[8px] px-3 py-3 mt-4">
          <p className="text-[10px] text-[#a06414]">
            ⚠ Tidak cocok untuk kondisi akut, pasca operasi baru, atau nyeri hebat
          </p>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white border-t border-[#e5e9eb] px-4 py-4 z-50">
        {selected && (
          <p className="text-[10px] text-[#6b7280] mb-1 text-center">
            {selected.label} · {fmt(selected.price)} · {selected.duration}
          </p>
        )}
        <button
          onClick={handleBook}
          disabled={!!terapis && !selected}
          className={`w-full text-[13px] font-bold rounded-[12px] h-12 transition-colors ${
            terapis && !selected
              ? 'bg-[#e5e9eb] text-[#9ca3af] cursor-default'
              : 'bg-[#2aa148] text-white'
          }`}
        >
          {selected
            ? `Booking ${selected.label} →`
            : terapis
            ? 'Pilih Jenis Konsultasi dulu'
            : 'Konsultasi Online Sekarang →'}
        </button>
      </div>
    </div>
  )
}
