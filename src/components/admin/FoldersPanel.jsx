import { useEffect, useState } from 'react'
import { api } from '../../api.js'

export default function FoldersPanel({ refreshKey, notify, onChanged }) {
  const [folders, setFolders] = useState([])
  const [drafts, setDrafts] = useState({})
  const [newName, setNewName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    try {
      const data = await api.folders()
      setFolders(data.folders)
      setDrafts(Object.fromEntries(data.folders.map((folder) => [folder.id, folder.name])))
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey])

  async function addFolder() {
    setBusy(true)
    setError('')
    try {
      await api.createFolder(newName.trim() || 'New Folder')
      setNewName('')
      await load()
      onChanged?.()
      notify?.('فولدر جدید ساخته شد.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  async function save(folder) {
    const name = (drafts[folder.id] || '').trim()
    if (!name || name === folder.name) return
    setBusy(true)
    try {
      await api.updateFolder(folder.id, { name })
      await load()
      onChanged?.()
      notify?.('نام فولدر ذخیره شد.')
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  async function remove(folder) {
    setBusy(true)
    try {
      await api.deleteFolder(folder.id)
      await load()
      onChanged?.()
      notify?.('فولدر حذف شد.')
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
          <h3>مدیریت فولدرها و دسته‌بندی‌ها</h3>
          <p>هر فولدر دسکتاپ یک دسته‌بندی نمونه‌کار است. حذف فولدر، پروژه‌ها را حذف نمی‌کند.</p>
        </div>
      </div>

      {error ? <div className="form-error">{error}</div> : null}

      <div className="upload-row" style={{ marginBottom: 12 }}>
        <input
          className="xp-input"
          style={{ maxWidth: 240 }}
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="نام فولدر جدید"
          aria-label="نام فولدر جدید"
        />
        <button type="button" className="xp-btn primary" onClick={addFolder} disabled={busy}>
          افزودن فولدر
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>#</th>
            <th>نام فولدر</th>
            <th>تعداد نمونه‌کار</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {folders.map((folder, index) => (
            <tr key={folder.id}>
              <td style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{index + 1}</td>
              <td>
                <input
                  className="xp-input"
                  value={drafts[folder.id] ?? folder.name}
                  onChange={(event) => setDrafts((previous) => ({ ...previous, [folder.id]: event.target.value }))}
                  aria-label={`نام فولدر ${index + 1}`}
                />
              </td>
              <td>{folder.project_count}</td>
              <td>
                <div className="row-actions">
                  <button type="button" className="mini-btn" onClick={() => save(folder)} disabled={busy}>
                    ذخیره
                  </button>
                  <button type="button" className="mini-btn danger" onClick={() => remove(folder)} disabled={busy}>
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {folders.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: 16, color: '#6b695f' }}>
                هنوز فولدری ساخته نشده است.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  )
}
