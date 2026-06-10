import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'

// ── Data sesi aktif (mock untuk State B) ──────────────────────────────────────
const SESI_BERIKUTNYA = {
  inisial: 'RK',
  nama: 'Rina Kusuma, S.Ft',
  tanggal: 'Besok, Sab 7 Jun 2026',
  waktu: '10:00 WIB',
  mode: 'Klinik',
  layanan: 'Fisioterapi Umum',
  sesiKe: 3,
  totalSesi: 6,
  status: 'Dikonfirmasi',
}

const PAKET_AKTIF = {
  inisial: 'RK',
  nama: 'Rina Kusuma, S.Ft',
  layanan: 'Fisioterapi Umum',
  area: 'Lutut',
  sesiSisa: 3,
  totalSesi: 6,
}

const RIWAYAT_TERDEKAT = {
  inisial: 'RK',
  nama: 'Rina Kusuma, S.Ft',
  tanggal: '31 Mei',
  mode: 'Klinik',
  rating: 5,
  sudahUlasan: true,
}

const UPCOMING_LIST = [
  { inisial: 'RK', nama: 'Rina Kusuma, S.Ft', tanggal: 'Sab 7 Jun · 10:00 WIB', mode: 'Klinik', status: 'Dikonfirmasi' },
  { inisial: 'RK', nama: 'Rina Kusuma, S.Ft', tanggal: 'Sel 10 Jun · 09:00 WIB', mode: 'Klinik', status: 'Menunggu' },
]

// ── State A — Belum ada booking ───────────────────────────────────────────────
function StateKosong({ onNavigate }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-8 py-16">
      {/* Ikon kalender */}
      <div className="w-20 h-20 rounded-full bg-[#f0f0f0] flex items-center justify-center mb-5">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="3" stroke="#9ca3af" strokeWidth="1.8" fill="none" />
          <path d="M16 2V6M8 2V6M3 10H21" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-[16px] font-bold text-[#1a1a1a] text-center">Belum ada sesi terjadwal</p>
      <p className="text-[13px] text-[#6b7280] text-center mt-2 leading-relaxed">
        Buat booking pertama kamu bersama fisioterapis pilihan
      </p>
      <button
        onClick={() => onNavigate('booking-pilih-terapis')}
        className="mt-6 w-full bg-[#2aa148] text-white text-[14px] font-semibold rounded-[10px] h-12"
      >
        Buat Booking Baru
      </button>
      <button
        onClick={() => onNavigate('layanan')}
        className="mt-3 text-[13px] font-medium text-[#2aa148]"
      >
        Lihat fisioterapis tersedia →
      </button>
    </div>
  )
}

// ── State B — Ada booking aktif ───────────────────────────────────────────────
function StateAktif({ onNavigate }) {
  const [tab, setTab] = useState('semua')

  return (
    <div className="px-4 mt-4 flex flex-col gap-4 pb-4">
      {/* Sesi Berikutnya */}
      <div>
        <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Sesi Berikutnya</p>
        <div className="bg-[#e8f5ed] border border-[#2aa148] rounded-[12px] p-3 shadow-[0px_2px_8px_0px_rgba(42,161,72,0.10)]">
          <div className="flex items-start gap-3">
            <Avatar initials={SESI_BERIKUTNYA.inisial} size="md" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[12px] font-bold text-[#1a1a1a]">{SESI_BERIKUTNYA.nama}</p>
                <span className="bg-[#2aa148] text-white text-[8px] font-semibold px-2 py-0.5 rounded-full">
                  {SESI_BERIKUTNYA.status}
                </span>
              </div>
              <p className="text-[11px] text-[#1e7835] mt-0.5 font-medium">
                {SESI_BERIKUTNYA.tanggal} · {SESI_BERIKUTNYA.waktu}
              </p>
              <p className="text-[10px] text-[#6b7280]">
                {SESI_BERIKUTNYA.mode} · {SESI_BERIKUTNYA.layanan} · Sesi {SESI_BERIKUTNYA.sesiKe} dari {SESI_BERIKUTNYA.totalSesi}
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex-1 bg-[#2aa148] text-white text-[11px] font-semibold rounded-[8px] h-8"
            >
              Lihat Detail
            </button>
            <button
              onClick={() => onNavigate('booking-jadwal')}
              className="flex-1 bg-white border border-[#2aa148] text-[#2aa148] text-[11px] font-semibold rounded-[8px] h-8"
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>

      {/* Paket Aktif */}
      <div>
        <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Paket Aktif</p>
        <div className="bg-white border border-[#e5e9eb] rounded-[12px] p-3 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <Avatar initials={PAKET_AKTIF.inisial} size="sm" />
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-[#1a1a1a]">
                🦿 {PAKET_AKTIF.area} — {PAKET_AKTIF.layanan}
              </p>
              <p className="text-[10px] text-[#6b7280]">{PAKET_AKTIF.nama}</p>
            </div>
          </div>
          {/* Progress bar sesi */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-[#6b7280]">Sisa sesi</span>
              <span className="text-[10px] font-semibold text-[#2aa148]">{PAKET_AKTIF.sesiSisa} dari {PAKET_AKTIF.totalSesi}</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: PAKET_AKTIF.totalSesi }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full ${i < PAKET_AKTIF.sesiSisa ? 'bg-[#2aa148]' : 'bg-[#e5e9eb]'}`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => onNavigate('booking-pilih-paket', { terapis: { id: 'fisio-001', nama: 'Rina Kusuma', gelar: 'S.Ft', inisial: 'RK', status: 'ruang_fisio', harga_mulai: 300000, tersedia_klinik: true, tersedia_homecare: true, tersedia_online: false, mode_layanan: ['klinik', 'homecare'], spesialisasi: ['Muskuloskeletal'] } })}
            className="w-full mt-3 bg-[#f0faf4] border border-[#2aa148] text-[#2aa148] text-[11px] font-semibold rounded-[8px] h-8"
          >
            Booking Sesi Lanjutan →
          </button>
        </div>
      </div>

      {/* Booking Aktif / Upcoming */}
      <div>
        <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Booking Aktif</p>
        <div className="flex flex-col gap-2">
          {UPCOMING_LIST.map((b, i) => (
            <div key={i} className="bg-white rounded-[10px] border border-[#e5e9eb] p-3 flex items-center gap-3 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
              <Avatar initials={b.inisial} size="sm" />
              <div className="flex-1">
                <p className="text-[11px] font-semibold text-[#1a1a1a]">{b.nama}</p>
                <p className="text-[10px] text-[#6b7280]">{b.tanggal} · {b.mode}</p>
              </div>
              <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                b.status === 'Dikonfirmasi'
                  ? 'bg-[#e8f5ed] text-[#2aa148]'
                  : 'bg-[#fef3dc] text-[#f59e0b]'
              }`}>
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Riwayat Terdekat */}
      <div>
        <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Sesi Selesai</p>
        <div className="bg-white rounded-[10px] border border-[#e5e9eb] p-3 flex items-center gap-3 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
          <Avatar initials={RIWAYAT_TERDEKAT.inisial} size="sm" />
          <div className="flex-1">
            <p className="text-[11px] font-semibold text-[#1a1a1a]">{RIWAYAT_TERDEKAT.nama}</p>
            <p className="text-[10px] text-[#6b7280]">{RIWAYAT_TERDEKAT.tanggal} · {RIWAYAT_TERDEKAT.mode}</p>
            <p className="text-[10px] text-[#ffbd18]">{'★'.repeat(RIWAYAT_TERDEKAT.rating)}</p>
          </div>
          <span className="bg-[#e8f5ed] text-[#2aa148] text-[9px] font-semibold px-2 py-0.5 rounded-full">Selesai</span>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function BookingHome({ onNavigate }) {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px] flex flex-col">
      <StatusBar />

      {/* Header */}
      <div className="bg-white flex items-center justify-between px-5 h-[52px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <p className="text-[17px] font-bold text-[#1a1a1a]">Booking</p>
        <button
          onClick={() => onNavigate('booking-pilih-terapis')}
          className="bg-[#2aa148] text-white text-[11px] font-semibold rounded-[8px] px-3 h-7 flex items-center gap-1"
        >
          + Buat Baru
        </button>
      </div>

      {/* Content — show active state as default */}
      <StateAktif onNavigate={onNavigate} />

      <BottomNav active="booking" onNavigate={onNavigate} />
    </div>
  )
}
