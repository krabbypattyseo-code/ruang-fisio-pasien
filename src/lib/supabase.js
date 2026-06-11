import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || url.includes('xxxxxxxx')) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL belum diisi — app berjalan dalam mode mock (data lokal).'
  )
}

export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder'
)

/** Apakah Supabase sudah dikonfigurasi (env vars diisi)? */
export const isConfigured =
  Boolean(url) && !url.includes('xxxxxxxx') && Boolean(key) && !key.startsWith('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...')
