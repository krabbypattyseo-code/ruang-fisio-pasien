const BASE = 'http://localhost:3002/api'

export async function getFisioterapis() {
  const res = await fetch(`${BASE}/fisioterapis`)
  if (!res.ok) throw new Error('Gagal mengambil data fisioterapis')
  return res.json()
}

export async function getFisioterapisById(id) {
  const res = await fetch(`${BASE}/fisioterapis/${id}`)
  if (!res.ok) throw new Error('Fisioterapis tidak ditemukan')
  return res.json()
}

export async function getJadwalTerapis(terapisId, params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/jadwal/${terapisId}?${qs}`)
  if (!res.ok) throw new Error('Gagal mengambil jadwal')
  return res.json()
}

export async function getJadwalBulan(terapisId, tahun, bulan) {
  const res = await fetch(`${BASE}/jadwal/${terapisId}/bulan/${tahun}/${bulan}`)
  if (!res.ok) throw new Error('Gagal mengambil jadwal')
  return res.json()
}

export async function createBooking(data) {
  const res = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const body = await res.json()
  if (!res.ok) throw new Error(body.error || 'Gagal membuat booking')
  return body
}

export async function getMyBookings(pasienId) {
  const res = await fetch(`${BASE}/bookings?pasien_id=${pasienId}`)
  if (!res.ok) throw new Error('Gagal mengambil riwayat booking')
  return res.json()
}
