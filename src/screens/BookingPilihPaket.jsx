import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import StepIndicator from '../components/StepIndicator'
import { fisioterapis } from '../data/fisioterapis'

const layananTypes = ['Fisioterapi Umum', 'Sport Therapy', 'Pasca Operasi', 'Lansia']

const fmt = (n) => `Rp ${n.toLocaleString('id-ID')}`

const round5k = (n) => Math.round(n / 5000) * 5000

function buildPackages(base) {
  const p1  = base
  const p3  = round5k(base * 0.933)
  const p6  = round5k(base * 0.867)
  const p12 = round5k(base * 0.8)
  return [
    { sesi: 1,  perSesi: p1,  total: p1,        save: null,              popular: false },
    { sesi: 3,  perSesi: p3,  total: p3 * 3,    save: (p1 - p3) * 3,   popular: false },
    { sesi: 6,  perSesi: p6,  total: p6 * 6,    save: (p1 - p6) * 6,   popular: true  },
    { sesi: 12, perSesi: p12, total: p12 * 12,  save: (p1 - p12) * 12, popular: false },
  ]
}

const DEFAULT_TERAPIS = fisioterapis[0]

export default function BookingPilihPaket({ onNavigate, terapis: terapisProp = null }) {
  const terapis = terapisProp || DEFAULT_TERAPIS
  const packages = buildPackages(terapis.harga_mulai)

  const [layanan, setLayanan] = useState('Fisioterapi Umum')
  const [selectedPkg, setSelectedPkg] = useState(6)

  const pkg = packages.find(p => p.sesi === selectedPkg)

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">
      <StatusBar />

      <div className="bg-white flex items-center px-4 h-[52px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate('profil-terapis', { terapis })} className="text-[20px] text-[#1a1a1a]">←</button>
        <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Pilih Paket</p>
      </div>

      <StepIndicator step={1} />

      {/* Booking summary */}
      <div className="mx-4 mt-3 bg-[#e8f6eb] rounded-[10px] px-3 py-2 flex items-center justify-between">
        <p className="text-[11px] font-medium text-[#1e7835]">
          {terapis.nama}, {terapis.gelar} · Jadwal dipilih di langkah berikutnya
        </p>
        <span className="bg-[#f59e0b] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full ml-2 flex-shrink-0">
          45 mnt
        </span>
      </div>

      <div className="px-4 mt-4">
        {/* Jenis Layanan */}
        <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Jenis Layanan</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {layananTypes.map((t) => (
            <button
              key={t}
              onClick={() => setLayanan(t)}
              className={`h-8 px-4 rounded-full text-[11px] font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                layanan === t
                  ? 'bg-[#2aa148] text-white border-2 border-[#2aa148]'
                  : 'bg-white border border-[#e5e9eb] text-[#6b7280]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Pilih Paket */}
        <p className="text-[13px] font-semibold text-[#1a1a1a] mt-4 mb-2">Pilih Paket</p>
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] overflow-hidden divide-y divide-[#f0f0f0]">
          {packages.map((p) => (
            <button
              key={p.sesi}
              onClick={() => setSelectedPkg(p.sesi)}
              className={`w-full flex items-center px-4 py-3 transition-colors ${
                selectedPkg === p.sesi ? 'bg-[#e8f6eb]' : 'bg-white'
              }`}
            >
              {/* Radio */}
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                selectedPkg === p.sesi ? 'border-[#2aa148]' : 'border-[#d1d1d1]'
              }`}>
                {selectedPkg === p.sesi && <div className="w-2 h-2 rounded-full bg-[#2aa148]" />}
              </div>

              <div className="flex-1 text-left">
                <p className={`text-[12px] font-semibold ${selectedPkg === p.sesi ? 'text-[#2aa148]' : 'text-[#1a1a1a]'}`}>
                  {p.sesi} Sesi
                </p>
                <p className="text-[10px] text-[#6b7280]">{fmt(p.perSesi)}/sesi</p>
              </div>

              <div className="text-right">
                <p className={`text-[12px] font-semibold ${selectedPkg === p.sesi ? 'text-[#2aa148]' : 'text-[#1a1a1a]'}`}>
                  {fmt(p.total)}
                </p>
                {p.save && (
                  <p className="text-[10px] text-[#2aa148]">Hemat {fmt(p.save)}</p>
                )}
              </div>

              {p.popular && (
                <span className="ml-2 bg-[#f59e0b] text-white text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                  ★ Populer
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Ringkasan biaya */}
        <p className="text-[13px] font-semibold text-[#1a1a1a] mt-4 mb-2">Ringkasan Biaya</p>
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-3">
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-[#6b7280]">Biaya sesi ({pkg.sesi} × {fmt(pkg.perSesi)})</span>
            <span className="text-[11px] text-[#1a1a1a]">{fmt(pkg.total)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-[11px] text-[#6b7280]">Biaya platform (0%)</span>
            <span className="text-[11px] text-[#1a1a1a]">Rp 0</span>
          </div>
          <hr className="border-[#e5e9eb]" />
          <div className="flex justify-between mt-2">
            <span className="text-[12px] font-semibold text-[#1a1a1a]">Total yang dibayar</span>
            <span className="text-[13px] font-bold text-[#2aa148]">{fmt(pkg.total)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[390px] px-4 py-3 bg-white border-t border-[#e5e9eb] shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => onNavigate('booking-jadwal', { selectedPkg: pkg, terapis, layanan })}
          className="w-full bg-[#2aa148] text-white text-[13px] font-semibold rounded-[10px] h-10"
        >
          Pilih Mode & Jadwal →
        </button>
      </div>

      <BottomNav active="booking" onNavigate={onNavigate} />
    </div>
  )
}
