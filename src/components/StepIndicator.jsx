export default function StepIndicator({ step }) {
  const steps = [
    { num: 1, label: 'Paket' },
    { num: 2, label: 'Mode & Jadwal' },
    { num: 3, label: 'Pembayaran' },
  ]
  return (
    <div className="bg-white h-[52px] flex items-center justify-center px-4 border-b border-[#e5e9eb]">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`h-[22px] flex items-center px-3 rounded-full text-[10px] font-semibold whitespace-nowrap ${
              s.num < step
                ? 'bg-[#e8f6eb] text-[#2aa148]'
                : s.num === step
                ? 'bg-[#2aa148] text-white'
                : 'bg-[#f0f0f0] text-[#9ca3af]'
            }`}>
              {s.num < step ? `✓ ${s.label}` : `${s.num} ${s.label}`}
            </div>
          </div>
          {i < 2 && <div className="w-3 h-px bg-[#e5e9eb] mx-0.5" />}
        </div>
      ))}
    </div>
  )
}
