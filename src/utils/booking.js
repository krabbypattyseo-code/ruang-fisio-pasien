const MONTH_NAMES = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const DAY_NAMES = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export function fmt(n) {
  return `Rp ${n.toLocaleString('id-ID')}`
}

export function formatJadwal(selectedDates, selectedTimes) {
  if (!selectedDates || selectedDates.length === 0) return '—'
  return selectedDates.map((d) => {
    const dayIdx = new Date(d.year, d.month - 1, d.date).getDay()
    const dayName = DAY_NAMES[dayIdx]
    const key = `${d.year}-${d.month}-${d.date}`
    const time = selectedTimes?.[key] || ''
    return `${dayName} ${d.date} ${MONTH_NAMES[d.month]}${time ? ' · ' + time + ' WIB' : ''}`
  }).join(', ')
}

export function modeLabel(mode) {
  const map = {
    klinik: 'Klinik — Bayar penuh di awal',
    homecare: 'Homecare — DP 50% + sisa di tempat',
    online: 'Online — Bayar penuh di awal',
  }
  return map[mode] || 'Klinik — Bayar penuh di awal'
}

export function lokasiByMode(mode) {
  if (mode === 'klinik') return 'Klinik RF — Jl. Kemang Raya No.88'
  if (mode === 'homecare') return 'Alamat pasien (dicatat saat konfirmasi)'
  return 'Via Google Meet / Zoom'
}

export function buildBookingDetail({ terapis, pkg, mode, layanan, selectedDates, selectedTimes }) {
  return [
    { label: 'Terapis', value: `${terapis.nama}, ${terapis.gelar}` },
    { label: 'Mode', value: modeLabel(mode) },
    { label: 'Layanan', value: layanan },
    { label: 'Paket', value: `${pkg.sesi} Sesi${pkg.popular ? ' · Populer' : ''}` },
    { label: 'Jadwal', value: formatJadwal(selectedDates, selectedTimes) },
    { label: 'Lokasi', value: lokasiByMode(mode) },
  ]
}

export function buildSuccessSummary({ terapis, pkg, mode, layanan, selectedDates, selectedTimes }) {
  const modeNames = { klinik: 'Klinik', homecare: 'Homecare', online: 'Online' }
  return [
    { label: 'Terapis', value: `${terapis.nama}, ${terapis.gelar}` },
    { label: 'Mode', value: `${modeNames[mode] || 'Klinik'} — ${layanan}` },
    { label: 'Paket', value: `${pkg.sesi} Sesi · ${fmt(pkg.total)} ✓ Lunas` },
    { label: 'Jadwal', value: formatJadwal(selectedDates, selectedTimes) },
    { label: 'Lokasi', value: lokasiByMode(mode) },
  ]
}
