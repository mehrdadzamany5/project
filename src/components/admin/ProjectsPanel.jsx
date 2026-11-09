import { useCallback, useEffect, useState } from 'react'
import { api, KIND_LABEL, formatDate } from '../../api.js'

export function useProjects(refreshKey) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.projects()
      setProjects(data.projects)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load, refreshKey])

  return { projects, loading, error, reload: load }
}

export default function ProjectsPanel({ refreshKey, notify, onChanged, onOpenProject, onEditProject, user }) {
  const { projects, loading, error, reload } = useProjects(refreshKey)
  const [query, setQuery] = useState('')

  async function togglePublish(project) {
    try {
      await api.publishProject(project.id, !project.is_published)
      notify?.(project.is_published ? 'نمونه‌کار مخفی شد.' : 'نمونه‌کار منتشر شد.')
      reload()
      onChanged?.()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    }
  }

  async function remove(project) {
    try {
      await api.deleteProject(project.id)
      notify?.('نمونه‌کار حذف شد.')
      reload()
      onChanged?.()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    }
  }

  const visible = projects.filter((project) =>
    `${project.title} ${project.folder_name || ''} ${project.owner_name || ''}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )

  return (
    <>
      <div className="panel-head">
        <div>
          <h3>مدیریت نمونه‌کارها</h3>
          <p>ویرایش اطلاعات، انتشار و حذف تمام نمونه‌کارها.</p>
        </div>
        <input
          className="xp-input"
          style={{ maxWidth: 220 }}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="جستجو…"
          aria-label="جستجوی نمونه‌کار"
        />
      </div>

      {error ? <div className="form-error">{error}</div> : null}
      {loading ? <div className="loading-line">در حال خواندن…</div> : null}

      <table className="data-table">
        <thead>
          <tr>
            <th>نام پروژه</th>
            <th>دسته</th>
            <th>نوع</th>
            <th>صاحب اثر</th>
            <th>تاریخ ثبت</th>
            <th>وضعیت</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {visible.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.folder_name || '—'}</td>
              <td>{KIND_LABEL[project.kind] || '—'}</td>
              <td>{project.owner_name || '—'}</td>
              <td style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5 }}>
                {formatDate(project.created_at)}
              </td>
              <td>
                <span className={`chip ${project.is_published ? 'live' : 'off'}`}>
                  {project.is_published ? 'منتشرشده' : 'پیش‌نویس'}
                </span>
              </td>
              <td>
                <div className="row-actions">
                  <button type="button" className="mini-btn" onClick={() => onOpenProject(project)}>
                    نمایش
                  </button>
                  <button type="button" className="mini-btn" onClick={() => onEditProject(project.id)}>
                    ویرایش
                  </button>
                  <button type="button" className="mini-btn" onClick={() => togglePublish(project)}>
                    {project.is_published ? 'مخفی' : 'انتشار'}
                  </button>
                  <button type="button" className="mini-btn danger" onClick={() => remove(project)}>
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {!loading && visible.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: 16, color: '#6b695f' }}>
                موردی یافت نشد.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
      <p className="hint" style={{ marginTop: 8 }}>
        حساب فعلی: {user.displayName} — دسترسی کامل مدیریتی.
      </p>
    </>
  )
}
