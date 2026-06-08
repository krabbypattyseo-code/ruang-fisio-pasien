import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'

const treatments = [
  { label: 'Manual Therapy', done: true },
  { label: 'ROM Exercise', done: true },
  { label: 'TENS', done: true },
  { label: 'Ultrasound', done: false },
  { label: 'Kinesio Taping', done: true },
  { label: 'Strengthening', done: false },
]

export default function LaporanSesi({ onNavigate, from = 'beranda' }) {
  const [rating, setRating] = useState(4)

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">
      <StatusBar />

      <div className="bg-white flex items-center px-4 h-[52px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate(from)} className="text-[20px] text-[#1a1a1a]">‹</button>
        <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Laporan Sesi Fisioterapi</p>
      </div>

      <div className="px-4 mt-3 flex flex-col gap-3">
        {/* Therapist info */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] p-3 flex items-center gap-3">
          <Avatar initials="RK" size="md" />
          <div>
            <Badge label="Ruang Fisio" />
            <p className="text-[13px] font-semibold text-[#1a1a1a] mt-0.5">Rina Kusuma, S.Ft</p>
            <p className="text-[10px] text-[#6b7280]">Sel, 20 Mei 2026 · 10:00–11:05 WIB</p>
          </div>
        </div>

        {/* Tindakan */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-3">
          <p className="text-[13px] font-semibold text-[#1a1a1a]">Tindakan yang Dilakukan</p>
          <hr className="my-2 border-[#e5e9eb]" />
          <div className="grid grid-cols-2 gap-y-3 gap-x-4">
            {treatments.map((t) => (
              <div key={t.label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center flex-shrink-0 ${
                  t.done ? 'bg-[#2aa148]' : 'bg-white border border-[#e5e9eb]'
                }`}>
                  {t.done && <span className="text-[10px] font-bold text-white">✓</span>}
                </div>
                <span className={`text-[12px] ${t.done ? 'font-medium text-[#1a1a1a]' : 'text-[#6b7280]'}`}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Catatan */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-3">
          <p className="text-[13px] font-semibold text-[#1a1a1a]">Catatan Kondisi Pasien</p>
          <hr className="my-2 border-[#e5e9eb]" />
          <p className="text-[11px] text-[#6b7280]">
            VAS Score: 6/10. Ketegangan otot lumbar bilateral. Fleksibilitas lumbar terbatas 40%. Progress baik dibanding sesi sebelumnya.
          </p>
        </div>

        {/* Follow-up */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-3">
          <p className="text-[13px] font-semibold text-[#1a1a1a]">Rekomendasi Follow-up</p>
          <hr className="my-2 border-[#e5e9eb]" />
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#6b7280]">Perlu sesi lanjutan:</span>
            <span className="bg-[#e8f6eb] text-[#2aa148] text-[10px] font-medium px-2 py-0.5 rounded-[4px]">Ya</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] text-[#6b7280]">Frekuensi:</span>
            <span className="text-[11px] font-medium text-[#1a1a1a]">2x / minggu selama 4 minggu</span>
          </div>
        </div>

        {/* Ulasan */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-3">
          <p className="text-[12px] font-semibold text-[#1a1a1a]">Berikan Ulasan untuk Rina Kusuma, S.Ft</p>
          <hr className="my-2 border-[#e5e9eb]" />
          <p className="text-[11px] text-[#6b7280] mb-2">Ketuk bintang untuk memberi rating</p>
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)} className={`text-[22px] ${i < rating ? 'text-[#ffbd18]' : 'text-[#d1d1d1]'}`}>
                {i < rating ? '★' : '☆'}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <input
              className="flex-1 border border-[#e5e9eb] rounded-[8px] h-7 px-3 text-[10px] text-[#bfbfbf] placeholder-[#bfbfbf] outline-none"
              placeholder="Komentar opsional..."
            />
            <button className="bg-[#2aa148] w-5 h-7 rounded-[4px] flex items-center justify-center flex-shrink-0">
              <span className="text-[12px] font-bold text-white">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[390px] px-4 py-3 bg-white border-t border-[#e5e9eb] shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.05)]">
        <div className="flex gap-3">
          <button className="flex-1 bg-[#2aa148] text-white text-[13px] font-semibold rounded-[10px] h-10">
            Kirim Ulasan
          </button>
          <button
            onClick={() => onNavigate('profil-terapis')}
            className="flex-1 bg-[#e8f6eb] text-[#2aa148] text-[13px] font-semibold rounded-[10px] h-10"
          >
            Booking Lagi
          </button>
        </div>
      </div>

      <BottomNav active={from} onNavigate={onNavigate} />
    </div>
  )
}
