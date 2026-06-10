const ALL_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

/**
 * Returns array of { day, available } untuk seorang terapis.
 * Deterministik berdasarkan terapis.id — sama setiap render.
 */
export function getJadwal(terapis) {
  const hash = terapis.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return ALL_DAYS.map((day, i) => ({
    day,
    available: ((hash + i) % 3) !== 0,
  }))
}

/**
 * Apakah tanggal tersebut tersedia untuk terapis?
 * Menggunakan Date API agar akurat di semua bulan.
 */
export function isDateAvailable(year, month, date, terapis) {
  const dayOfWeek = new Date(year, month - 1, date).getDay()
  if (dayOfWeek === 0) return false
  const dayName = DAY_LABELS[dayOfWeek]
  const jadwal = getJadwal(terapis)
  const found = jadwal.find(j => j.day === dayName)
  return found ? found.available : false
}
