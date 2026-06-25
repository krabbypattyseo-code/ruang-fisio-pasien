import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isConfigured } from '../lib/supabase'

const AuthContext = createContext(null)

const MOCK_USER = {
  id: 'demo-user-001',
  email: 'demo@ruangfisio.id',
  nama: 'Haris Pasien',
  no_hp: '081234567890',
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  async function tryDevAutoLogin() {
    if (!import.meta.env.DEV) return false
    if (import.meta.env.VITE_DEV_AUTO_LOGIN !== 'true') return false

    const email = import.meta.env.VITE_DEV_LOGIN_EMAIL
    const password = import.meta.env.VITE_DEV_LOGIN_PASSWORD
    if (!email || !password) return false

    let { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error?.message?.includes('Invalid login credentials')) {
      ;({ data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nama: 'Haris TN' } },
      }))
    }

    if (error || !data.session) return false

    setUser(data.session.user)
    await fetchProfile(data.session.user.id)
    return true
  }

  useEffect(() => {
    if (!isConfigured) {
      setUser(MOCK_USER)
      setProfile(MOCK_USER)
      setLoading(false)
      return
    }

    async function initAuth() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
        return
      }

      const autoLoggedIn = await tryDevAutoLogin()
      if (!autoLoggedIn) setLoading(false)
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) fetchProfile(session.user.id)
      else { setProfile(null); setLoading(false) }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function fetchProfile(userId) {
    const { data } = await supabase
      .from('pasien')
      .select('*')
      .eq('id', userId)
      .single()
    // Ambil email dari sesi auth dan gabungkan ke profile
    const { data: { user: authUser } } = await supabase.auth.getUser()
    setProfile(data ? { ...data, email: authUser?.email || '' } : null)
    setLoading(false)
  }

  async function refreshProfile() {
    if (!user) return
    await fetchProfile(user.id)
  }

  async function signUp(email, password, nama) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nama } },
    })
    if (error) throw error
    return data
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  }

  async function signOut() {
    if (!isConfigured) {
      setUser(null)
      setProfile(null)
      return
    }
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, refreshProfile, isConfigured }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return ctx
}
