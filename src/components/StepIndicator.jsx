const DEFAULT_STEPS = [
  { num: 1, label: 'Paket' },
  { num: 2, label: 'Mode & Jadwal' },
  { num: 3, label: 'Pembayaran' },
]

/**
 * Step progress indicator.
 *
 * Props:
 *   step   — current active step number (1-based)
 *   steps  — optional custom array of { num, label } objects
 *            defaults to the 3-step booking flow
 */
export default function StepIndicator({ step, steps = DEFAULT_STEPS }) {
  return (
    <div className="bg-white h-[44px] flex items-center justify-center px-3 border-b border-[#e5e9eb]">
      {steps.map((s, i) => (
        <div key={s.num} className="flex items-center">
          <div className={`h-[20px] flex items-center px-2 rounded-full text-[9px] font-semibold whitespace-nowrap ${
            s.num < step
              ? 'bg-[#e8f6eb] text-[#2aa148]'
              : s.num === step
              ? 'bg-[#2aa148] text-white'
              : 'bg-[#f0f0f0] text-[#9ca3af]'
          }`}>
            {s.num < step ? `✓ ${s.label}` : `${s.num} ${s.label}`}
          </div>
          {i < steps.length - 1 && <div className="w-2 h-px bg-[#e5e9eb] mx-0.5" />}
        </div>
      ))}
    </div>
  )
}
