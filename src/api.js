import { supabase, isConfigured } from './lib/supabase'
import { fisioterapis as MOCK_FISIO } from './data/fisioterapis'
import { getJadwal } from './utils/jadwal'

// ── Helper ──────────────────────────────────────────────────

function mockDelay(data) {
  return new Promise(resolve => setTimeout(() => resolve(data), 100))
}

// ── Fisioterapis ─────────────────────────────────────────────

export async function getFisioterapis() {
  if (!isConfigured) return mockDelay(MOCK_FISIO)

  const { data, error } = await supabase
    .from('fisioterapis')
    .select('*')
    .order('nama')
  if (error) throw new Error(error.message)
  return data
}

export async function getFisioterapisById(id) {
  if (!isConfigured) {
    const found = MOCK_FISIO.find(f => f.id === id)
    if (!found) throw new Error('Fisioterapis tidak ditemukan')
    return mockDelay(found)
  }

  const { data, error } = await supabase
    .from('fisioterapis')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function getFisioterapisFeatured() {
  if (!isConfigured) return mockDelay(MOCK_FISIO.filter(f => f.featured))

  const { data, error } = await supabase
    .from('fisioterapis')
    .select('*')
    .eq('featured', true)
    .order('rating', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}

// ── Jadwal ───────────────────────────────────────────────────

export async function getJadwalTerapis(terapisId) {
  if (!isConfigured) {
    const terapis = MOCK_FISIO.find(f => f.id === terapisId) || { id: terapisId }
    return mockDelay(getJadwal(terapis))
  }

  const { data, error } = await supabase
    .from('jadwal_terapis')
    .select('*')
    .eq('terapis_id', terapisId)
    .eq('tersedia', true)
  if (error) throw new Error(error.message)
  return data
}

export async function getJadwalBulan(terapisId, tahun, bulan) {
  if (!isConfigured) {
    // Kembalikan objek kosong — calendar tetap berfungsi normal lewat isDateAvailable
    return mockDelay({})
  }

  // Query slot yang sudah dibooking di bulan tersebut
  const from = `${tahun}-${String(bulan).padStart(2, '0')}-01`
  const to   = `${tahun}-${String(bulan).padStart(2, '0')}-31`
  const { data, error } = await supabase
    .from('bookings')
    .select('tanggal, jam')
    .eq('terapis_id', terapisId)
    .gte('tanggal', from)
    .lte('tanggal', to)
    .neq('status', 'dibatalkan')
  if (error) throw new Error(error.message)

  // Format: { "26": ["09:00", "10:00"], ... }
  const result = {}
  for (const row of data) {
    const date = new Date(row.tanggal).getDate().toString()
    if (!result[date]) result[date] = []
    result[date].push(row.jam)
  }
  return result
}

// ── Bookings ─────────────────────────────────────────────────

export async function createBooking(data) {
  if (!isConfigured) {
    // Mode mock: simpan ke localStorage supaya ada persistensi minimal
    const existing = JSON.parse(localStorage.getItem('rf_bookings') || '[]')
    const newBooking = { ...data, id: crypto.randomUUID(), status: 'menunggu', created_at: new Date().toISOString() }
    localStorage.setItem('rf_bookings', JSON.stringify([...existing, newBooking]))
    return mockDelay(newBooking)
  }

  const { data: created, error } = await supabase
    .from('bookings')
    .insert([{
      pasien_id:   data.pasien_id,
      pasien_nama: data.pasien_nama,
      terapis_id:  data.terapis_id,
      tanggal:     data.tanggal,
      jam:         data.jam,
      mode:        data.lokasi,
      keluhan:     data.keluhan,
      paket:       data.paket,
      jumlah_sesi: data.jumlah_sesi || 1,
      harga:       data.harga,
    }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return created
}

export async function getMyBookings(pasienId) {
  if (!isConfigured) {
    const all = JSON.parse(localStorage.getItem('rf_bookings') || '[]')
    return mockDelay(all.filter(b => b.pasien_id === pasienId))
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      fisioterapis (nama, inisial, spesialisasi_utama, rating)
    `)
    .eq('pasien_id', pasienId)
    .order('tanggal', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}

export async function getBookingById(id) {
  if (!isConfigured) {
    const all = JSON.parse(localStorage.getItem('rf_bookings') || '[]')
    return mockDelay(all.find(b => b.id === id) || null)
  }

  const { data, error } = await supabase
    .from('bookings')
    .select(`*, fisioterapis (*)`)
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updateBookingStatus(id, status) {
  if (!isConfigured) {
    const all = JSON.parse(localStorage.getItem('rf_bookings') || '[]')
    const updated = all.map(b => b.id === id ? { ...b, status } : b)
    localStorage.setItem('rf_bookings', JSON.stringify(updated))
    return mockDelay(updated.find(b => b.id === id))
  }

  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

// ── Ulasan ───────────────────────────────────────────────────

export async function createUlasan({ bookingId, pasienId, terapisId, rating, komentar }) {
  if (!isConfigured) {
    return mockDelay({ id: crypto.randomUUID(), booking_id: bookingId, rating, komentar })
  }

  const { data, error } = await supabase
    .from('ulasan')
    .insert([{ booking_id: bookingId, pasien_id: pasienId, terapis_id: terapisId, rating, komentar }])
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function getUlasanTerapis(terapisId) {
  if (!isConfigured) return mockDelay([])

  const { data, error } = await supabase
    .from('ulasan')
    .select(`*, pasien (nama)`)
    .eq('terapis_id', terapisId)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data
}

// ── Favorit ──────────────────────────────────────────────────

export async function getFavorit(pasienId) {
  if (!isConfigured) return mockDelay([])

  const { data, error } = await supabase
    .from('favorit')
    .select(`*, fisioterapis (*)`)
    .eq('pasien_id', pasienId)
  if (error) throw new Error(error.message)
  return data
}

export async function toggleFavorit(pasienId, terapisId) {
  if (!isConfigured) return mockDelay(null)

  const { data: existing } = await supabase
    .from('favorit')
    .select('id')
    .eq('pasien_id', pasienId)
    .eq('terapis_id', terapisId)
    .maybeSingle()

  if (existing) {
    await supabase.from('favorit').delete().eq('id', existing.id)
    return { isFavorit: false }
  } else {
    await supabase.from('favorit').insert([{ pasien_id: pasienId, terapis_id: terapisId }])
    return { isFavorit: true }
  }
}

// ── Profil pasien ─────────────────────────────────────────────

export async function getPasien(id) {
  if (!isConfigured) return mockDelay({ id, nama: 'Demo User', no_hp: '081234567890' })

  const { data, error } = await supabase
    .from('pasien')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function updatePasien(id, updates) {
  if (!isConfigured) return mockDelay({ id, ...updates })

  const { data, error } = await supabase
    .from('pasien')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}
