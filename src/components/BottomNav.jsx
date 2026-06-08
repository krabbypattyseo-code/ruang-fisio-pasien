const icons = {
  beranda: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
        fill={active ? '#2aa148' : 'none'}
        stroke={active ? '#2aa148' : '#9ca3af'}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  ),
  layanan: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke={active ? '#2aa148' : '#9ca3af'}
        strokeWidth="1.8"
      />
      <path
        d="M16.5 16.5L21 21"
        stroke={active ? '#2aa148' : '#9ca3af'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  booking: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="3"
        stroke={active ? '#2aa148' : '#9ca3af'}
        strokeWidth="1.8"
        fill={active ? '#e8f6eb' : 'none'}
      />
      <path
        d="M16 2V6M8 2V6M3 10H21"
        stroke={active ? '#2aa148' : '#9ca3af'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01"
        stroke={active ? '#2aa148' : '#9ca3af'}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  profil: ({ active }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="8"
        r="4"
        fill={active ? '#2aa148' : 'none'}
        stroke={active ? '#2aa148' : '#9ca3af'}
        strokeWidth="1.8"
      />
      <path
        d="M4 20C4 17 7.58 14.5 12 14.5C16.42 14.5 20 17 20 20"
        stroke={active ? '#2aa148' : '#9ca3af'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
}

export default function BottomNav({ active, onNavigate }) {
  const tabs = [
    { id: 'beranda', label: 'Beranda', nav: 'beranda' },
    { id: 'layanan', label: 'Layanan', nav: 'layanan' },
    { id: 'booking', label: 'Booking', nav: 'booking-home' },
    { id: 'profil', label: 'Profil', nav: 'profil' },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white border-t border-[#e5e9eb] h-[72px] z-50 shadow-[0px_-2px_8px_0px_rgba(0,0,0,0.07)]">
      <div className="flex justify-around items-center h-full px-2">
        {tabs.map((tab) => {
          const isActive = active === tab.id
          const Icon = icons[tab.id]
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.nav)}
              className="flex flex-col items-center gap-1 flex-1 py-2"
            >
              <Icon active={isActive} />
              <span className={`text-[10px] ${isActive ? 'font-semibold text-[#2aa148]' : 'font-normal text-[#9ca3af]'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
