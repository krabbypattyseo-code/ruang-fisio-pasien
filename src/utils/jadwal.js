const ALL_DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

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
 * Mapping nama hari → indeks kolom kalender (May 2026, mulai Jum = col 5)
 * Kolom: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
 * Rumus: colIndex = (date + 4) % 7
 */
export const DAY_COL_INDEX = {
  Min: 0, Sen: 1, Sel: 2, Rab: 3, Kam: 4, Jum: 5, Sab: 6,
}

/**
 * Hitung kolom hari untuk tanggal di Mei 2026
 * (May 1 = Jumat = col 5)
 */
export function getColForDate(date) {
  return (date + 4) % 7
}

/**
 * Apakah tanggal tersebut tersedia untuk terapis?
 */
export function isDateAvailable(date, terapis) {
  const jadwal = getJadwal(terapis)
  const colIndex = getColForDate(date)
  const dayLabels = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
  const dayName = dayLabels[colIndex]
  // Minggu (Min) selalu libur
  if (dayName === 'Min') return false
  const found = jadwal.find(j => j.day === dayName)
  return found ? found.available : false
}
