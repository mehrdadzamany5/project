import { useCallback, useEffect, useState } from 'react'
import { api, formatDate } from '../../api.js'

const ROLE_LABEL = { admin: 'مدیر اصلی', user: 'کاربر' }

export default function UsersPanel({ refreshKey, notify, onChanged, user }) {
  const [users, setUsers] = useState([])
  const [drafts, setDrafts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ username: '', displayName: '', password: '', role: 'user' })
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.users()
      setUsers(data.users)
      setDrafts(
        Object.fromEntries(
          data.users.map((item) => [
            item.id,
            { displayName: item.display_name, role: item.role, active: item.active, password: '' },
          ]),
        ),
      )
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load, refreshKey])

  async function createUser(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await api.createUser(form)
      setForm({ username: '', displayName: '', password: '', role: 'user' })
      await load()
      onChanged?.()
      notify?.('کاربر جدید ساخته شد.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  async function saveUser(target) {
    const draft = drafts[target.id]
    if (!draft) return
    setBusy(true)
    try {
      await api.updateUser(target.id, {
        displayName: draft.displayName,
        role: draft.role,
        active: draft.active,
        ...(draft.password ? { password: draft.password } : {}),
      })
      await load()
      onChanged?.()
      notify?.('اطلاعات کاربر ذخیره شد.')
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  async function removeUser(target) {
    setBusy(true)
    try {
      await api.deleteUser(target.id)
      await load()
      onChanged?.()
      notify?.('کاربر حذف شد.')
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="panel-head">
        <div>
          <h3>مدیریت کاربران و سطوح دسترسی</h3>
          <p>مدیر اصلی، سه کاربر عادی و حساب مهمان. رمزها فقط به‌صورت هش‌شده ذخیره می‌شوند.</p>
        </div>
      </div>

      {error ? <div className="form-error">{error}</div> : null}

      <form onSubmit={createUser} className="form-grid" style={{ marginBottom: 16 }}>
        <div className="field">
          <label htmlFor="new-username">نام کاربری</label>
          <input
            id="new-username"
            dir="ltr"
            value={form.username}
            onChange={(event) => setForm({ ...form, username: event.target.value })}
            placeholder="user4"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="new-display">نام نمایشی</label>
          <input
            id="new-display"
            value={form.displayName}
            onChange={(event) => setForm({ ...form, displayName: event.target.value })}
            placeholder="کاربر چهارم"
          />
        </div>
        <div className="field">
          <label htmlFor="new-password">رمز عبور</label>
          <input
            id="new-password"
            type="password"
            dir="ltr"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            placeholder="حداقل ۶ نویسه"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="new-role">سطح دسترسی</label>
          <select
            id="new-role"
            value={form.role}
            onChange={(event) => setForm({ ...form, role: event.target.value })}
          >
            <option value="user">کاربر</option>
            <option value="admin">مدیر اصلی</option>
          </select>
        </div>
        <div className="full">
          <button type="submit" className="xp-btn primary" disabled={busy}>
            ایجاد کاربر
          </button>
        </div>
      </form>

      {loading ? <div className="loading-line">در حال خواندن کاربران…</div> : null}

      <table className="data-table">
        <thead>
          <tr>
            <th>نام کاربری</th>
            <th>نام نمایشی</th>
            <th>دسترسی</th>
            <th>نمونه‌کار</th>
            <th>فعال</th>
            <th>رمز جدید</th>
            <th>عضویت</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((item) => {
            const draft = drafts[item.id] || {}
            return (
              <tr key={item.id}>
                <td style={{ fontFamily: 'IBM Plex Mono, monospace', direction: 'ltr', textAlign: 'left' }}>
                  {item.username}
                  {item.id === user.id ? ' (شما)' : ''}
                </td>
                <td>
                  <input
                    className="xp-input"
                    value={draft.displayName ?? ''}
                    onChange={(event) =>
                      setDrafts((previous) => ({
                        ...previous,
                        [item.id]: { ...previous[item.id], displayName: event.target.value },
                      }))
                    }
                    aria-label={`نام نمایشی ${item.username}`}
                  />
                </td>
                <td>
                  <select
                    className="xp-input"
                    value={draft.role ?? 'user'}
                    onChange={(event) =>
                      setDrafts((previous) => ({
                        ...previous,
                        [item.id]: { ...previous[item.id], role: event.target.value },
                      }))
                    }
                    aria-label={`دسترسی ${item.username}`}
                  >
                    <option value="user">کاربر</option>
                    <option value="admin">مدیر اصلی</option>
                  </select>
                </td>
                <td>{item.project_count}</td>
                <td style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    checked={Boolean(draft.active)}
                    onChange={(event) =>
                      setDrafts((previous) => ({
                        ...previous,
                        [item.id]: { ...previous[item.id], active: event.target.checked },
                      }))
                    }
                    aria-label={`فعال‌بودن ${item.username}`}
                  />
                </td>
                <td>
                  <input
                    className="xp-input"
                    type="password"
                    dir="ltr"
                    placeholder="—"
                    value={draft.password ?? ''}
                    onChange={(event) =>
                      setDrafts((previous) => ({
                        ...previous,
                        [item.id]: { ...previous[item.id], password: event.target.value },
                      }))
                    }
                    aria-label={`رمز جدید ${item.username}`}
                  />
                </td>
                <td style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5 }}>
                  {formatDate(item.created_at)}
                </td>
                <td>
                  <div className="row-actions">
                    <button type="button" className="mini-btn" onClick={() => saveUser(item)} disabled={busy}>
                      ذخیره
                    </button>
                    <button
                      type="button"
                      className="mini-btn danger"
                      onClick={() => removeUser(item)}
                      disabled={busy || item.id === user.id}
                    >
                      حذف
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="hint" style={{ marginTop: 8 }}>
        نقش‌ها: {ROLE_LABEL.admin} دسترسی کامل دارد؛ {ROLE_LABEL.user} فقط نمونه‌کارهای خودش را مدیریت می‌کند.
        حساب مهمان در فهرست بالا نمایش داده نمی‌شود و فقط اجازه مشاهده دارد.
      </p>
    </>
  )
}
