import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import StatusBar from '../components/StatusBar'

export default function Login({ onNavigate }) {
  const { signIn, signUp } = useAuth()
  const [tab, setTab]         = useState('masuk') // 'masuk' | 'daftar'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [nama, setNama]       = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (tab === 'masuk') {
        await signIn(email, password)
      } else {
        if (!nama.trim()) { setError('Nama lengkap wajib diisi'); setLoading(false); return }
        await signUp(email, password, nama)
        setError('Cek email kamu untuk konfirmasi akun, lalu masuk.')
        setTab('masuk')
        setLoading(false)
        return
      }
      onNavigate('beranda')
    } catch (err) {
      setError(
        err.message.includes('Invalid login') ? 'Email atau password salah.' :
        err.message.includes('already registered') ? 'Email sudah terdaftar. Coba masuk.' :
        err.message
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f9]">
      <StatusBar />

      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#2aa148] flex items-center justify-center mx-auto mb-3">
          <span className="text-white text-2xl font-bold">RF</span>
        </div>
        <h1 className="text-[20px] font-bold text-[#1a1a1a]">Ruang Fisio</h1>
        <p className="text-[13px] text-[#6b7280] mt-1">Platform fisioterapi terpercaya</p>
      </div>

      {/* Tabs */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="flex border-b border-[#f0f0f0]">
          {['masuk', 'daftar'].map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError('') }}
              className={`flex-1 py-3 text-[14px] font-semibold transition-colors ${
                tab === t ? 'text-[#2aa148] border-b-2 border-[#2aa148]' : 'text-[#9ca3af]'
              }`}
            >
              {t === 'masuk' ? 'Masuk' : 'Daftar'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
          {tab === 'daftar' && (
            <div>
              <label className="text-[12px] font-medium text-[#6b7280] mb-1 block">Nama Lengkap</label>
              <input
                type="text"
                value={nama}
                onChange={e => setNama(e.target.value)}
                placeholder="Masukkan nama lengkap"
                required
                className="w-full h-11 px-3 rounded-xl border border-[#e5e9eb] text-[14px] text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2aa148]"
              />
            </div>
          )}

          <div>
            <label className="text-[12px] font-medium text-[#6b7280] mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email@kamu.com"
              required
              className="w-full h-11 px-3 rounded-xl border border-[#e5e9eb] text-[14px] text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2aa148]"
            />
          </div>

          <div>
            <label className="text-[12px] font-medium text-[#6b7280] mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              required
              minLength={6}
              className="w-full h-11 px-3 rounded-xl border border-[#e5e9eb] text-[14px] text-[#1a1a1a] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#2aa148]"
            />
          </div>

          {error && (
            <p className={`text-[12px] text-center rounded-lg px-3 py-2 ${
              error.includes('Cek email') ? 'text-[#2aa148] bg-[#e8f6eb]' : 'text-red-600 bg-red-50'
            }`}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="h-12 rounded-xl bg-[#2aa148] text-white text-[15px] font-semibold mt-1 disabled:opacity-60"
          >
            {loading ? 'Memproses...' : tab === 'masuk' ? 'Masuk' : 'Buat Akun'}
          </button>
        </form>
      </div>

      {/* Demo mode info */}
      <p className="text-center text-[11px] text-[#9ca3af] mt-4 px-6">
        Belum terhubung ke Supabase? App berjalan dalam mode demo otomatis.
      </p>
    </div>
  )
}
