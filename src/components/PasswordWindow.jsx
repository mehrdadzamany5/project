import { useState } from 'react'
import { api } from '../api.js'

export default function PasswordWindow({ notify, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setError('')
    if (newPassword !== confirm) {
      setError('رمز جدید و تکرار آن یکسان نیست.')
      return
    }
    setBusy(true)
    try {
      await api.changePassword(currentPassword, newPassword)
      notify?.('رمز عبور تغییر کرد.')
      onClose?.()
    } catch (requestError) {
      setError(requestError.message)
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ padding: 16, overflow: 'auto' }}>
      {error ? <div className="form-error">{error}</div> : null}
      <div className="field">
        <label htmlFor="pw-current">رمز فعلی</label>
        <input
          id="pw-current"
          type="password"
          dir="ltr"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="pw-new">رمز جدید</label>
        <input
          id="pw-new"
          type="password"
          dir="ltr"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="pw-confirm">تکرار رمز جدید</label>
        <input
          id="pw-confirm"
          type="password"
          dir="ltr"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
        />
      </div>
      <div className="dialog-actions" style={{ padding: '6px 0 0' }}>
        <button type="button" className="xp-btn" onClick={onClose}>
          بستن
        </button>
        <button type="submit" className="xp-btn primary" disabled={busy}>
          ذخیره
        </button>
      </div>
    </form>
  )
}
