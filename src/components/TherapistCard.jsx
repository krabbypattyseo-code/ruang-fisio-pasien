import Avatar from './Avatar'
import Badge from './Badge'

/**
 * Shared therapist card used in CariFisioterapis and BookingPilihTerapis.
 *
 * Props:
 *   terapis      — data object from fisioterapis.js
 *   actionLabel  — text for the CTA button (e.g. "Lihat", "Pilih")
 *   onAction     — called with `terapis` when the CTA button is clicked
 */
export default function TherapistCard({ terapis: t, actionLabel = 'Lihat', onAction }) {
  return (
    <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] p-3">
      <div className="flex gap-3">
        <Avatar initials={t.inisial} size="lg" />
        <div className="flex-1 min-w-0">
          <Badge label={t.status === 'ruang_fisio' ? 'Ruang Fisio' : 'Mitra ✓'} />
          <p className="text-[13px] font-semibold text-[#1a1a1a] mt-0.5">{t.nama}, {t.gelar}</p>
          <p className="text-[11px] text-[#6b7280]">{t.spesialisasi.join(' · ')}</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-[11px] text-[#ffbd18]">{'★'.repeat(Math.round(t.rating))}</span>
            <span className="text-[10px] text-[#6b7280]">{t.rating} · {t.jumlah_ulasan} ulasan</span>
          </div>
          <p className="text-[9px] text-[#6b7280] mt-0.5">
            {t.mode_layanan.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(' · ')} · ⏰ {t.jadwal_terdekat}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between flex-shrink-0">
          <p className="text-[12px] font-semibold text-[#2aa148]">
            Rp {t.harga_mulai.toLocaleString('id-ID')}
          </p>
          <button
            onClick={() => onAction(t)}
            className="bg-[#2aa148] text-white text-[10px] font-semibold rounded-[6px] px-4 h-6"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
