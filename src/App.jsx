import { useCallback, useEffect, useState } from 'react'
import { api } from './api.js'
import Welcome from './components/Welcome.jsx'
import LoginForm from './components/LoginForm.jsx'
import BootSequence from './components/BootSequence.jsx'
import Desktop from './components/Desktop.jsx'
import { unlockAudio } from './lib/sound.js'

const SITE = { siteName: 'GALLERY', siteSubtitle: 'نمایشگاه' }

export default function App() {
  const [user, setUser] = useState(undefined)
  const [stage, setStage] = useState('loading')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [bootKey, setBootKey] = useState(0)

  useEffect(() => {
    let active = true
    api
      .me()
      .then((data) => {
        if (!active) return
        if (data.user) {
          setUser(data.user)
          setStage('desktop')
        } else {
          setUser(null)
          setStage('welcome')
        }
      })
      .catch(() => {
        if (!active) return
        setUser(null)
        setStage('welcome')
      })
    return () => {
      active = false
    }
  }, [])

  const enterBoot = useCallback((nextUser) => {
    setUser(nextUser)
    setBootKey((value) => value + 1)
    setStage('boot')
  }, [])

  async function chooseGuest() {
    if (busy) return
    setBusy(true)
    setError('')
    unlockAudio()
    try {
      const data = await api.guest()
      enterBoot(data.user)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  function chooseUsers() {
    setError('')
    setStage('login')
  }

  async function logout() {
    try {
      await api.logout()
    } catch {
      /* ignore */
    }
    setUser(null)
    setStage('welcome')
  }

  if (stage === 'loading') {
    return (
      <div className="app-shell" style={{ display: 'grid', placeItems: 'center', background: '#0d3f8f', color: '#cfe4ff' }}>
        <div style={{ fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.3em', fontSize: 13 }}>
          GALLERY · LOADING
        </div>
      </div>
    )
  }

  if (stage === 'welcome') {
    return (
      <div className="app-shell">
        <Welcome site={SITE} onChooseUsers={chooseUsers} onChooseGuest={chooseGuest} busy={busy} error={error} />
      </div>
    )
  }

  if (stage === 'login') {
    return (
      <div className="app-shell">
        <LoginForm site={SITE} onAuthenticated={enterBoot} onBack={() => setStage('welcome')} />
      </div>
    )
  }

  if (stage === 'boot') {
    return <BootSequence key={bootKey} onDone={() => setStage('desktop')} />
  }

  return (
    <div className="app-shell">
      <Desktop user={user} onLogout={logout} />
    </div>
  )
}
