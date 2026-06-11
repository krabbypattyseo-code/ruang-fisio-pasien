import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { updatePasien } from '../api'
import StatusBar from '../components/StatusBar'

export default function ProfilEdit({ onNavigate }) {
  const { profile, user, refreshProfile } = useAuth()

  const [nama,         setNama]         = useState(profile?.nama          || '')
  const [noHp,         setNoHp]         = useState(profile?.no_hp         || '')
  const [tanggalLahir, setTanggalLahir] = useState(profile?.tanggal_lahir || '')
  const [jenisKelamin, setJenisKelamin] = useState(profile?.jenis_kelamin || '')
  const [alamat,       setAlamat]       = useState(profile?.alamat        || '')

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSimpan() {
    if (!nama.trim()) { setError('Nama tidak boleh kosong'); return }
    setError('')
    setLoading(true)
    try {
      await updatePasien(user.id, {
        nama:          nama.trim(),
        no_hp:         noHp.trim()         || null,
        tanggal_lahir: tanggalLahir        || null,
        jenis_kelamin: jenisKelamin        || null,
        alamat:        alamat.trim()       || null,
      })
      await refreshProfile()
      setSuccess(true)
      setTimeout(() => onNavigate('profil'), 1000)
    } catch (err) {
      setError(err.message || 'Gagal menyimpan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f9]">
      <StatusBar />

      {/* Header */}
      <div className="bg-white h-14 flex items-center px-4 gap-3 border-b border-[#f0f0f0]">
        <button onClick={() => onNavigate('profil')} className="text-[#1a1a1a] text-xl leading-none">‹</button>
        <span className="text-[14px] font-semibold text-[#1a1a1a]">Edit Profil</span>
      </div>

      {/* Avatar display */}
      <div className="flex justify-center mt-6 mb-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#e8f6eb] flex items-center justify-center">
          <span className="text-[30px] font-bold text-[#2aa148]">
            {nama.split(' ').slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?'}
          </span>
        </div>
      </div>

      {/* Form */}
      <div className="mx-4 mt-4 bg-white rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.06)] p-4 flex flex-col gap-4">

        <Field label="Nama Lengkap" required>
          <input
            type="text"
            value={nama}
            onChange={e => setNama(e.target.value)}
            placeholder="Nama lengkap kamu"
            className="input-style"
          />
        </Field>

        <Field label="Nomor HP">
          <input
            type="tel"
            value={noHp}
            onChange={e => setNoHp(e.target.value)}
            placeholder="+62 8xx-xxxx-xxxx"
            className="input-style"
          />
        </Field>

        <Field label="Tanggal Lahir">
          <input
            type="date"
            value={tanggalLahir}
            onChange={e => setTanggalLahir(e.target.value)}
            className="input-style"
          />
        </Field>

        <Field label="Jenis Kelamin">
          <div className="flex gap-2">
            {['Laki-laki', 'Perempuan'].map(j => (
              <button
                key={j}
                onClick={() => setJenisKelamin(j)}
                className={`flex-1 h-10 rounded-xl text-[13px] font-medium border transition-colors ${
                  jenisKelamin === j
                    ? 'bg-[#2aa148] text-white border-[#2aa148]'
                    : 'bg-white text-[#6b7280] border-[#e5e9eb]'
                }`}
              >
                {j}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Alamat">
          <textarea
            value={alamat}
            onChange={e => setAlamat(e.target.value)}
            placeholder="Alamat lengkap kamu"
            rows={3}
            className="input-style resize-none"
          />
        </Field>

        {error && (
          <p className="text-[12px] text-red-500 bg-red-50 rounded-lg px-3 py-2 text-center">{error}</p>
        )}
        {success && (
          <p className="text-[12px] text-[#2aa148] bg-[#e8f6eb] rounded-lg px-3 py-2 text-center">✓ Profil berhasil disimpan</p>
        )}
      </div>

      {/* Simpan button */}
      <div className="mx-4 mt-4">
        <button
          onClick={handleSimpan}
          disabled={loading || success}
          className="w-full h-12 rounded-xl bg-[#2aa148] text-white text-[15px] font-semibold disabled:opacity-60"
        >
          {loading ? 'Menyimpan...' : success ? 'Tersimpan ✓' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[12px] font-medium text-[#6b7280]">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
