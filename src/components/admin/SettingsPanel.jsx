import { useEffect, useState } from 'react'
import { api } from '../../api.js'

export default function SettingsPanel({ notify, refreshKey }) {
  const [settings, setSettings] = useState({
    site_name: '',
    site_subtitle: '',
    footer_note: '',
  })
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    api
      .settings()
      .then((data) => {
        if (!active) return
        setSettings((previous) => ({ ...previous, ...data.settings }))
      })
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [refreshKey])

  async function save(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const data = await api.saveSettings(settings)
      setSettings((previous) => ({ ...previous, ...data.settings }))
      notify?.('تنظیمات عمومی ذخیره شد.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="panel-head">
        <div>
          <h3>تنظیمات عمومی GALLERY</h3>
          <p>این مقادیر در دسکتاپ و پنجره‌های نمایشگاه استفاده می‌شوند.</p>
        </div>
      </div>

      {error ? <div className="form-error">{error}</div> : null}
      {loading ? <div className="loading-line">در حال خواندن تنظیمات…</div> : null}

      <form onSubmit={save} className="form-grid" style={{ maxWidth: 620 }}>
        <div className="field">
          <label htmlFor="set-name">نام نمایشگاه (لاتین)</label>
          <input
            id="set-name"
            dir="ltr"
            value={settings.site_name}
            onChange={(event) => setSettings({ ...settings, site_name: event.target.value })}
          />
        </div>
        <div className="field">
          <label htmlFor="set-sub">عنوان فارسی</label>
          <input
            id="set-sub"
            value={settings.site_subtitle}
            onChange={(event) => setSettings({ ...settings, site_subtitle: event.target.value })}
          />
        </div>
        <div className="field full">
          <label htmlFor="set-footer">متن پانوشت</label>
          <input
            id="set-footer"
            value={settings.footer_note}
            onChange={(event) => setSettings({ ...settings, footer_note: event.target.value })}
          />
        </div>
        <div className="full">
          <button type="submit" className="xp-btn primary" disabled={busy}>
            ذخیره تنظیمات
          </button>
        </div>
      </form>

      <p className="hint" style={{ marginTop: 14, maxWidth: 620 }}>
        برای جایگزینی نام «Gallery» با لوگو یا نام تجاری جدید، فقط همین فیلدها را تغییر دهید؛ نیازی به
        تغییر کد نیست.
      </p>
    </>
  )
}
