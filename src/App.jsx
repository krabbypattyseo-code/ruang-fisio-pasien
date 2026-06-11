import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './screens/Login'
import Beranda from './screens/Beranda'
import LayananPage from './screens/CariFisioterapis'
import BookingHome from './screens/BookingHome'
import BookingPilihTerapis from './screens/BookingPilihTerapis'
import ProfilFisioterapis from './screens/ProfilFisioterapis'
import ProfilPasien from './screens/ProfilPasien'
import BookingJadwal from './screens/BookingJadwal'
import BookingDetail from './screens/BookingDetail'
import BookingPilihPaket from './screens/BookingPilihPaket'
import BookingKonfirmasi from './screens/BookingKonfirmasi'
import BookingBerhasil from './screens/BookingBerhasil'
import Dashboard from './screens/Dashboard'
import LaporanSesi from './screens/LaporanSesi'
import LayananKlinik from './screens/LayananKlinik'
import LayananHomecare from './screens/LayananHomecare'
import LayananOnline from './screens/LayananOnline'
import ProfilLaporan from './screens/ProfilLaporan'
import ProfilFavorit from './screens/ProfilFavorit'
import ProfilPembayaran from './screens/ProfilPembayaran'
import ProfilNotifikasi from './screens/ProfilNotifikasi'
import ProfilBantuan from './screens/ProfilBantuan'
import ProfilKetentuan from './screens/ProfilKetentuan'

const PUBLIC_SCREENS = { login: Login }

const SCREENS = {
  beranda: Beranda,
  layanan: LayananPage,
  'booking-home': BookingHome,
  'booking-pilih-terapis': BookingPilihTerapis,
  'profil-terapis': ProfilFisioterapis,
  profil: ProfilPasien,
  'booking-jadwal': BookingJadwal,
  'booking-detail': BookingDetail,
  'booking-pilih-paket': BookingPilihPaket,
  'booking-konfirmasi': BookingKonfirmasi,
  'booking-berhasil': BookingBerhasil,
  dashboard: Dashboard,
  laporan: LaporanSesi,
  'layanan-klinik': LayananKlinik,
  'layanan-homecare': LayananHomecare,
  'layanan-online': LayananOnline,
  'profil-laporan': ProfilLaporan,
  'profil-favorit': ProfilFavorit,
  'profil-pembayaran': ProfilPembayaran,
  'profil-notifikasi': ProfilNotifikasi,
  'profil-bantuan': ProfilBantuan,
  'profil-ketentuan': ProfilKetentuan,
}

export default function App() {
  const { user, loading, isConfigured } = useAuth()
  const [screen, setScreen]       = useState('beranda')
  const [screenState, setScreenState] = useState({})

  function handleNavigate(screenName, state = {}) {
    setScreen(screenName)
    setScreenState(state)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f5f7f9]">
        <div className="w-10 h-10 rounded-full border-4 border-[#2aa148] border-t-transparent animate-spin" />
      </div>
    )
  }

  // Jika Supabase dikonfigurasi dan user belum login, tampilkan Login
  if (isConfigured && !user && screen !== 'login') {
    return <Login onNavigate={handleNavigate} />
  }

  const AllScreens = { ...PUBLIC_SCREENS, ...SCREENS }
  const Screen = AllScreens[screen] || Beranda
  return <Screen onNavigate={handleNavigate} {...screenState} />
}
