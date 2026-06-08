export default function Avatar({ initials, size = 'md' }) {
  const sizes = {
    sm: 'w-[40px] h-[40px] text-[11px]',
    md: 'w-[44px] h-[44px] text-[12px]',
    lg: 'w-[52px] h-[52px] text-[14px]',
    xl: 'w-[80px] h-[80px] text-[18px]',
  }
  return (
    <div className={`${sizes[size]} bg-[#e8f6eb] rounded-full flex items-center justify-center flex-shrink-0`}>
      <span className="font-semibold text-[#2aa148]">{initials}</span>
    </div>
  )
}
