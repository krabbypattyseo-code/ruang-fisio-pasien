import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

const PERIODE_OPTIONS = ['1 Bulan', '3 Bulan', '6 Bulan', 'Semua']

const AKTIVITAS_DATA = [
  { bulan: 'Jan', sesi: 2 },
  { bulan: 'Feb', sesi: 1 },
  { bulan: 'Mar', sesi: 3 },
  { bulan: 'Apr', sesi: 5 },
  { bulan: 'Mei', sesi: 3 },
  { bulan: 'Jun', sesi: 2 },
]

const DONUT_DATA = [
  { name: 'Klinik', value: 10, color: '#2aa148' },
  { name: 'Homecare', value: 4, color: '#60c478' },
  { name: 'Online', value: 2, color: '#b7ebc3' },
]

const KONDISI_DATA = [
  { kondisi: 'Nyeri Punggung Bawah', count: 6 },
  { kondisi: 'ACL / Lutut', count: 4 },
  { kondisi: 'Bahu / Rotator Cuff', count: 4 },
  { kondisi: 'HNP', count: 2 },
]

const TOP_TERAPIS = [
  { inisial: 'RK', nama: 'Rina Kusuma', gelar: 'S.Ft', sesi: 8, rating: 5 },
  { inisial: 'AR', nama: 'Ahmad Rasyid', gelar: 'S.Ft', sesi: 3, rating: 4 },
  { inisial: 'AP', nama: 'Adhi Prasetyo', gelar: 'S.Ft', sesi: 2, rating: 5 },
]

const RIWAYAT = [
  { id: 1, inisial: 'RK', nama: 'Rina Kusuma, S.Ft', tanggal: '31 Mei 2026', mode: 'Klinik', kondisi: 'Nyeri Punggung Bawah', durasi: '60 mnt', status: 'Selesai', rating: 5 },
  { id: 2, inisial: 'AR', nama: 'Ahmad Rasyid, S.Ft', tanggal: '8 Mei 2026', mode: 'Klinik', kondisi: 'ACL / Lutut', durasi: '45 mnt', status: 'Selesai', rating: 4 },
  { id: 3, inisial: 'RK', nama: 'Rina Kusuma, S.Ft', tanggal: '24 Apr 2026', mode: 'Homecare', kondisi: 'Nyeri Punggung Bawah', durasi: '90 mnt', status: 'Dibatalkan', rating: null },
  { id: 4, inisial: 'AP', nama: 'Adhi Prasetyo, S.Ft', tanggal: '10 Apr 2026', mode: 'Online', kondisi: 'Bahu / Rotator Cuff', durasi: '30 mnt', status: 'Selesai', rating: 5 },
]

const STATS = [
  { value: '16', label: 'Total Sesi', color: 'text-[#2aa148]' },
  { value: '3', label: 'Bln Ini', color: 'text-[#2aa148]' },
  { value: '4.8', label: 'Avg Rating', color: 'text-[#ffbd18]' },
  { value: '5', label: 'Streak (mgg)', color: 'text-[#3b82f6]' },
]

export default function ProfilLaporan({ onNavigate, from = 'profil' }) {
  const [periode, setPeriode] = useState('6 Bulan')
  const [expandedId, setExpandedId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('Semua')

  const riwayatFiltered = RIWAYAT.filter((r) =>
    filterStatus === 'Semua' ? true : r.status === filterStatus
  )

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* Fixed Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.07)]">
        <StatusBar />
        <div className="flex items-center px-4 h-[52px]">
          <button onClick={() => onNavigate(from)} className="text-[20px] text-[#1a1a1a]">‹</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Laporan Sesi Saya</p>
        </div>
      </div>
      <div className="h-[96px]" />

      <div className="px-4 flex flex-col gap-4">

        {/* Filter periode */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {PERIODE_OPTIONS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriode(p)}
              className={`h-7 px-3 rounded-[14px] text-[11px] whitespace-nowrap flex-shrink-0 font-medium transition-colors ${
                periode === p ? 'bg-[#2aa148] text-white' : 'bg-white border border-[#e5e9eb] text-[#6b7280]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Stat cards 2x2 */}
        <div className="grid grid-cols-2 gap-2">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4">
              <p className={`text-[28px] font-bold ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-[#6b7280] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bar chart aktivitas */}
        <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4">
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Aktivitas Sesi (6 Bulan Terakhir)</p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={AKTIVITAS_DATA} barSize={20}>
              <XAxis dataKey="bulan" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: '#f0faf4' }}
                contentStyle={{ borderRadius: 8, border: 'none', fontSize: 11, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                formatter={(v) => [`${v} sesi`, '']}
              />
              <Bar dataKey="sesi" fill="#2aa148" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut chart */}
        <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4">
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Breakdown per Layanan</p>
          <div className="flex items-center">
            <ResponsiveContainer width="50%" height={130}>
              <PieChart>
                <Pie data={DONUT_DATA} innerRadius={35} outerRadius={55} dataKey="value" paddingAngle={3}>
                  {DONUT_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 flex-1">
              {DONUT_DATA.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-[11px] text-[#1a1a1a]">{d.name}</span>
                  <span className="ml-auto text-[11px] font-semibold text-[#6b7280]">
                    {Math.round(d.value / DONUT_DATA.reduce((a, b) => a + b.value, 0) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kondisi yang ditangani */}
        <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4">
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Kondisi yang Ditangani</p>
          <div className="flex flex-wrap gap-2">
            {KONDISI_DATA.map((k) => (
              <div key={k.kondisi} className="flex items-center gap-1.5 bg-[#e8f6eb] rounded-full px-3 py-1">
                <span className="text-[11px] font-medium text-[#2aa148]">{k.kondisi}</span>
                <span className="text-[9px] font-bold text-white bg-[#2aa148] rounded-full w-4 h-4 flex items-center justify-center">{k.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top terapis */}
        <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4">
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Terapis Terbanyak</p>
          <div className="flex flex-col gap-3">
            {TOP_TERAPIS.map((t, i) => (
              <div key={t.nama} className="flex items-center gap-3">
                <span className="text-[12px] font-bold text-[#9ca3af] w-4">{i + 1}</span>
                <Avatar initials={t.inisial} size="sm" />
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{t.nama}, {t.gelar}</p>
                  <p className="text-[10px] text-[#ffbd18]">{'★'.repeat(t.rating)}</p>
                </div>
                <span className="text-[11px] font-bold text-[#2aa148]">{t.sesi} sesi</span>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat sesi lengkap */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#1a1a1a]">Riwayat Sesi Lengkap</p>
          </div>
          <div className="flex gap-2 mb-3">
            {['Semua', 'Selesai', 'Dibatalkan'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`h-7 px-3 rounded-[14px] text-[11px] font-medium transition-colors ${
                  filterStatus === s ? 'bg-[#2aa148] text-white' : 'bg-white border border-[#e5e9eb] text-[#6b7280]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {riwayatFiltered.map((r) => (
              <div key={r.id} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden">
                <button
                  className="w-full flex items-center gap-3 p-3 text-left"
                  onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                >
                  <Avatar initials={r.inisial} size="sm" />
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-[#1a1a1a]">{r.nama}</p>
                    <p className="text-[10px] text-[#6b7280]">{r.tanggal} · {r.mode}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      r.status === 'Selesai' ? 'bg-[#e8f5ed] text-[#2aa148]' : 'bg-[#fee2e2] text-[#ef4444]'
                    }`}>{r.status}</span>
                    <span className="text-[10px] text-[#9ca3af]">{expandedId === r.id ? '▲' : '▼'}</span>
                  </div>
                </button>
                {expandedId === r.id && (
                  <div className="px-3 pb-3 border-t border-[#f0f0f0] pt-2 flex flex-col gap-1.5">
                    <div className="flex gap-2"><span className="text-[10px] text-[#9ca3af] w-20">Kondisi</span><span className="text-[10px] text-[#1a1a1a]">{r.kondisi}</span></div>
                    <div className="flex gap-2"><span className="text-[10px] text-[#9ca3af] w-20">Durasi</span><span className="text-[10px] text-[#1a1a1a]">{r.durasi}</span></div>
                    {r.rating && <div className="flex gap-2"><span className="text-[10px] text-[#9ca3af] w-20">Rating</span><span className="text-[10px] text-[#ffbd18]">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span></div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Export */}
        <button className="w-full bg-white border border-[#e5e9eb] rounded-[12px] py-3 text-[12px] font-semibold text-[#2aa148] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
          📄 Export Laporan PDF
        </button>

      </div>
      <BottomNav active="profil" onNavigate={onNavigate} />
    </div>
  )
}
