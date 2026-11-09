import { useState } from 'react'
import { api } from '../api.js'

export default function LoginForm({ site, onAuthenticated, onBack }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event) {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    try {
      const { user } = await api.login(username.trim(), password)
      onAuthenticated(user)
    } catch (requestError) {
      setError(requestError.message)
      setBusy(false)
    }
  }

  return (
    <div className="login-dialog-wrap">
      <form className="login-dialog" onSubmit={submit}>
        <div className="xp-titlebar" style={{ height: 27 }}>
          <span className="xp-title">ورود به {site.siteName}</span>
        </div>
        <div className="login-dialog-body">
          <button type="button" className="login-back" onClick={onBack}>
            <span aria-hidden="true">‹</span> بازگشت به انتخاب نوع ورود
          </button>

          <div className="login-hero">
            <div className="login-hero-logo">G</div>
            <div>
              <h2>ورود کاربران</h2>
              <p>نام کاربری و رمز عبور حساب خود را وارد کنید.</p>
            </div>
          </div>

          {error ? <div className="form-error">{error}</div> : null}

          <div className="field">
            <label htmlFor="login-username">نام کاربری</label>
            <input
              id="login-username"
              autoFocus
              autoComplete="username"
              dir="ltr"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="admin"
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">رمز عبور</label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              dir="ltr"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
            />
          </div>

          <p className="cred-hint">نمونه: admin / Gallery123</p>
        </div>

        <div className="dialog-actions">
          <button type="button" className="xp-btn" onClick={onBack} disabled={busy}>
            انصراف
          </button>
          <button type="submit" className="xp-btn primary" disabled={busy}>
            {busy ? 'در حال ورود…' : 'ورود'}
          </button>
        </div>
      </form>
    </div>
  )
}
