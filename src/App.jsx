import { useState } from 'react'
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
  const [screen, setScreen] = useState('beranda')
  const [screenState, setScreenState] = useState({})

  /** onNavigate(screenName) or onNavigate(screenName, { key: value }) */
  function handleNavigate(screenName, state = {}) {
    setScreen(screenName)
    setScreenState(state)
  }

  const Screen = SCREENS[screen] || Beranda
  return <Screen onNavigate={handleNavigate} {...screenState} />
}
