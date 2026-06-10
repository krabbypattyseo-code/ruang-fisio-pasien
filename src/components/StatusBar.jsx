import { useState, useEffect } from 'react'

export default function StatusBar() {
  const [time, setTime] = useState(() => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
  })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`)
    }
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="h-11 bg-white flex items-center px-4">
      <span className="text-[15px] font-semibold text-[#1a1a1a]">{time}</span>
    </div>
  )
}
