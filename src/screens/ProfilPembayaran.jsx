import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'

const REKENING = [
  { id: 1, bank: 'BCA', noRek: '1234****5678', nama: 'Rizki Pratama' },
  { id: 2, bank: 'Mandiri', noRek: '9012****3456', nama: 'Rizki Pratama' },
]

const TRANSAKSI = [
  { id: 1, tanggal: '31 Mei 2026', terapis: 'Rina Kusuma, S.Ft', jumlah: 300000, metode: 'QRIS', status: 'Lunas' },
  { id: 2, tanggal: '8 Mei 2026', terapis: 'Ahmad Rasyid, S.Ft', jumlah: 320000, metode: 'Transfer Bank', status: 'Lunas' },
  { id: 3, tanggal: '10 Apr 2026', terapis: 'Adhi Prasetyo, S.Ft', jumlah: 160000, metode: 'QRIS', status: 'Lunas' },
  { id: 4, tanggal: '5 Apr 2026', terapis: 'Rina Kusuma, S.Ft', jumlah: 300000, metode: 'Transfer Bank', status: 'Pending' },
]

const BANKS = ['BCA', 'Mandiri', 'BRI', 'BNI', 'CIMB', 'Permata', 'Danamon', 'BTN', 'OCBC', 'Jago']

function fmt(n) { return `Rp ${n.toLocaleString('id-ID')}` }

export default function ProfilPembayaran({ onNavigate }) {
  const [expandedTx, setExpandedTx] = useState(null)
  const [filterStatus, setFilterStatus] = useState('Semua')
  const [showForm, setShowForm] = useState(false)
  const [rekenings, setRekenings] = useState(REKENING)
  const [form, setForm] = useState({ bank: 'BCA', noRek: '', nama: '' })
  const [confirmHapus, setConfirmHapus] = useState(null)

  const txFiltered = TRANSAKSI.filter((t) =>
    filterStatus === 'Semua' ? true : t.status === filterStatus
  )

  const totalBulanIni = TRANSAKSI.filter((t) => t.tanggal.includes('Mei') && t.status === 'Lunas')
    .reduce((a, b) => a + b.jumlah, 0)
  const totalAll = TRANSAKSI.filter((t) => t.status === 'Lunas').reduce((a, b) => a + b.jumlah, 0)

  function tambahRekening() {
    if (!form.noRek || !form.nama) return
    const masked = form.noRek.slice(0, 4) + '****' + form.noRek.slice(-4)
    setRekenings((prev) => [...prev, { id: Date.now(), bank: form.bank, noRek: masked, nama: form.nama }])
    setForm({ bank: 'BCA', noRek: '', nama: '' })
    setShowForm(false)
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">

      {/* Fixed Header */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[390px] z-30 bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.07)]">
        <StatusBar />
        <div className="flex items-center px-4 h-[52px]">
          <button onClick={() => onNavigate('profil')} className="text-[20px] text-[#1a1a1a]">‹</button>
          <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Metode Pembayaran</p>
        </div>
      </div>
      <div className="h-[96px]" />

      <div className="px-4 flex flex-col gap-4">

        {/* Metode tersedia */}
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Metode Tersedia</p>
          <div className="flex flex-col gap-2">
            {[
              {
                icon: '📱', title: 'QRIS', badge: 'Direkomendasikan',
                points: ['GoPay, OVO, Dana, m-banking', 'Konfirmasi otomatis', 'Biaya 0.7% dari total', 'QR kadaluarsa 15 menit'],
              },
              {
                icon: '🏦', title: 'Transfer Bank', badge: null,
                points: ['BCA, Mandiri, BRI, BNI', 'Konfirmasi manual oleh admin', 'Gratis biaya transfer', 'Proses max 1×24 jam'],
              },
            ].map((m) => (
              <div key={m.title} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[18px]">{m.icon}</span>
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{m.title}</p>
                  {m.badge && (
                    <span className="ml-auto text-[9px] font-semibold bg-[#e8f6eb] text-[#2aa148] px-2 py-0.5 rounded-full">{m.badge}</span>
                  )}
                </div>
                {m.points.map((p) => (
                  <p key={p} className="text-[10px] text-[#6b7280] leading-relaxed">• {p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Rekening tersimpan */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#1a1a1a]">Rekening Tersimpan</p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-[11px] font-semibold text-[#2aa148]"
            >+ Tambah</button>
          </div>

          {showForm && (
            <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4 mb-3">
              <p className="text-[12px] font-semibold text-[#1a1a1a] mb-3">Tambah Rekening Baru</p>
              <div className="flex flex-col gap-2">
                <select
                  value={form.bank}
                  onChange={(e) => setForm({ ...form, bank: e.target.value })}
                  className="w-full h-10 border border-[#e5e9eb] rounded-[8px] px-3 text-[12px] text-[#1a1a1a] bg-white"
                >
                  {BANKS.map((b) => <option key={b}>{b}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Nomor Rekening"
                  value={form.noRek}
                  onChange={(e) => setForm({ ...form, noRek: e.target.value })}
                  className="w-full h-10 border border-[#e5e9eb] rounded-[8px] px-3 text-[12px] text-[#1a1a1a] outline-none"
                />
                <input
                  type="text"
                  placeholder="Nama Pemilik Rekening"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full h-10 border border-[#e5e9eb] rounded-[8px] px-3 text-[12px] text-[#1a1a1a] outline-none"
                />
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setShowForm(false)} className="flex-1 border border-[#e5e9eb] rounded-[8px] py-2 text-[12px] text-[#6b7280]">Batal</button>
                  <button onClick={tambahRekening} className="flex-1 bg-[#2aa148] rounded-[8px] py-2 text-[12px] font-semibold text-white">Simpan</button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {rekenings.map((r) => (
              <div key={r.id} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#e8f6eb] flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-[#2aa148]">{r.bank}</span>
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-semibold text-[#1a1a1a]">{r.bank} · {r.noRek}</p>
                  <p className="text-[10px] text-[#6b7280]">{r.nama}</p>
                </div>
                <button onClick={() => setConfirmHapus(r.id)} className="text-[#9ca3af] text-[18px]">🗑</button>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] p-4">
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-3">Total Pengeluaran</p>
          <div className="flex gap-3">
            <div className="flex-1 bg-[#f8f9fa] rounded-[8px] p-3">
              <p className="text-[9px] text-[#6b7280]">Bulan Ini</p>
              <p className="text-[14px] font-bold text-[#2aa148] mt-0.5">{fmt(totalBulanIni)}</p>
            </div>
            <div className="flex-1 bg-[#f8f9fa] rounded-[8px] p-3">
              <p className="text-[9px] text-[#6b7280]">Total Semua</p>
              <p className="text-[14px] font-bold text-[#1a1a1a] mt-0.5">{fmt(totalAll)}</p>
            </div>
          </div>
        </div>

        {/* Riwayat transaksi */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#1a1a1a]">Riwayat Transaksi</p>
          </div>
          <div className="flex gap-2 mb-3">
            {['Semua', 'Lunas', 'Pending'].map((s) => (
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
            {txFiltered.map((tx) => (
              <div key={tx.id} className="bg-white rounded-[12px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] overflow-hidden">
                <button
                  className="w-full flex items-center px-4 py-3 text-left gap-3"
                  onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                >
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-[#1a1a1a]">{tx.terapis}</p>
                    <p className="text-[10px] text-[#6b7280]">{tx.tanggal} · {tx.metode}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-[12px] font-bold text-[#1a1a1a]">{fmt(tx.jumlah)}</p>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      tx.status === 'Lunas' ? 'bg-[#e8f5ed] text-[#2aa148]' : 'bg-[#fff3cd] text-[#f59e0b]'
                    }`}>{tx.status}</span>
                  </div>
                </button>
                {expandedTx === tx.id && (
                  <div className="px-4 pb-3 border-t border-[#f0f0f0] pt-2">
                    {tx.status === 'Pending' && (
                      <button className="w-full border border-[#2aa148] text-[#2aa148] text-[11px] font-semibold rounded-[8px] py-2 mt-1">
                        📎 Upload Bukti Transfer
                      </button>
                    )}
                    {tx.status === 'Lunas' && (
                      <p className="text-[10px] text-[#6b7280]">Pembayaran telah dikonfirmasi oleh sistem.</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal hapus rekening */}
      {confirmHapus && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setConfirmHapus(null)} />
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white rounded-t-[20px] z-50 px-5 pt-5 pb-8">
            <p className="text-[15px] font-semibold text-[#1a1a1a] text-center">Hapus Rekening?</p>
            <p className="text-[12px] text-[#6b7280] text-center mt-1">Rekening ini akan dihapus dari daftar tersimpan</p>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setConfirmHapus(null)} className="flex-1 border border-[#e5e9eb] rounded-[10px] py-3 text-[13px] font-medium text-[#1a1a1a]">Batal</button>
              <button onClick={() => { setRekenings((p) => p.filter((r) => r.id !== confirmHapus)); setConfirmHapus(null) }} className="flex-1 bg-[#ef4444] rounded-[10px] py-3 text-[13px] font-semibold text-white">Hapus</button>
            </div>
          </div>
        </>
      )}

      <BottomNav active="profil" onNavigate={onNavigate} />
    </div>
  )
}
