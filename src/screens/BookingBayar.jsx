import { useState } from 'react'
import StatusBar from '../components/StatusBar'
import BottomNav from '../components/BottomNav'
import Avatar from '../components/Avatar'
import Badge from '../components/Badge'
import StepIndicator from '../components/StepIndicator'

const payments = [
  { id: 'ewallet', label: 'GoPay / OVO / DANA' },
  { id: 'qris', label: 'QRIS' },
  { id: 'bank', label: 'Transfer Bank' },
  { id: 'card', label: 'Kartu Kredit/Debit' },
]

export default function BookingBayar({ onNavigate }) {
  const [payment, setPayment] = useState('ewallet')

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-[80px]">
      <StatusBar />

      <div className="bg-white flex items-center px-4 h-[52px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)]">
        <button onClick={() => onNavigate('booking-detail')} className="text-[20px] text-[#1a1a1a]">‹</button>
        <p className="flex-1 text-center text-[15px] font-semibold text-[#1a1a1a]">Ringkasan & Bayar</p>
      </div>

      <StepIndicator step={3} />

      <div className="px-4 mt-3 flex flex-col gap-3">
        {/* Session summary */}
        <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] p-3">
          <div className="flex items-center gap-3">
            <Avatar initials="RK" size="md" />
            <div>
              <Badge label="Ruang Fisio" />
              <p className="text-[13px] font-semibold text-[#1a1a1a] mt-0.5">Rina Kusuma, S.Ft</p>
              <p className="text-[11px] text-[#6b7280]">Jum, 28 Mei 2026 · 10:00 WIB</p>
            </div>
          </div>
          <hr className="my-2 border-[#e5e9eb]" />
          <div className="flex flex-col gap-1">
            <div className="flex"><span className="text-[11px] text-[#6b7280] w-20">Mode:</span><span className="text-[11px] font-medium text-[#1a1a1a]">Klinik</span></div>
            <div className="flex"><span className="text-[11px] text-[#6b7280] w-20">Keluhan:</span><span className="text-[11px] font-medium text-[#1a1a1a]">Nyeri Punggung Bawah</span></div>
            <div className="flex"><span className="text-[11px] text-[#6b7280] w-20">Area:</span><span className="text-[11px] font-medium text-[#1a1a1a]">Punggung Bawah (Lumbar)</span></div>
          </div>
        </div>

        {/* Biaya */}
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Rincian Biaya</p>
          <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] p-3">
            <div className="flex justify-between mb-2">
              <span className="text-[12px] text-[#1a1a1a]">Tarif sesi fisioterapi</span>
              <span className="text-[12px] text-[#1a1a1a]">Rp 300.000</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[12px] text-[#1a1a1a]">Platform fee (15%)</span>
              <span className="text-[12px] text-[#1a1a1a]">Rp 45.000</span>
            </div>
            <hr className="border-[#e5e9eb]" />
            <div className="flex justify-between mt-2">
              <span className="text-[13px] font-semibold text-[#1a1a1a]">Total dibayar sekarang</span>
              <span className="text-[14px] font-bold text-[#2aa148]">Rp 345.000</span>
            </div>
          </div>
        </div>

        {/* Metode */}
        <div>
          <p className="text-[13px] font-semibold text-[#1a1a1a] mb-2">Metode Pembayaran</p>
          <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)] divide-y divide-[#e5e9eb]">
            {payments.map((pm) => (
              <button
                key={pm.id}
                onClick={() => setPayment(pm.id)}
                className="w-full flex items-center gap-3 px-4 py-3"
              >
                <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center ${
                  payment === pm.id ? 'bg-[#2aa148]' : 'bg-white border border-[#e5e9eb]'
                }`}>
                  {payment === pm.id && <span className="text-[10px] text-white">●</span>}
                </div>
                <span className={`text-[12px] ${payment === pm.id ? 'font-semibold text-[#1a1a1a]' : 'text-[#6b7280]'}`}>
                  {pm.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Warning */}
        <div className="bg-[#fef3dc] rounded-[8px] p-3">
          <p className="text-[10px] text-[#f59e0b]">ℹ Setelah bayar, terapis memiliki 2 jam untuk konfirmasi.</p>
          <p className="text-[10px] text-[#f59e0b]">Booking otomatis batal jika tidak direspon.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="fixed bottom-[80px] left-1/2 -translate-x-1/2 w-[390px] px-4 py-3 bg-white border-t border-[#e5e9eb] shadow-[0px_-2px_6px_0px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => onNavigate('dashboard')}
          className="w-full bg-[#2aa148] text-white text-[13px] font-semibold rounded-[10px] h-[42px]"
        >
          Bayar Rp 345.000 via Midtrans
        </button>
      </div>

      <BottomNav active="booking" onNavigate={onNavigate} />
    </div>
  )
}
