import { useCallback, useEffect, useState } from 'react'
import { api, KIND_LABEL, formatDate } from '../api.js'

export default function WorkspaceWindow({ user, refreshKey, notify, onOpenProject, onNewProject, onEditProject, onChanged }) {
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

  async function remove(project) {
    try {
      await api.deleteProject(project.id)
      notify?.('نمونه‌کار حذف شد.')
      load()
      onChanged?.()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    }
  }

  const mine = projects.filter((project) => project.owner_id === user.id)
  const others = projects.filter((project) => project.owner_id !== user.id)

  function renderTable(rows, editable) {
    if (!rows.length) {
      return <div className="empty-state">موردی برای نمایش نیست.</div>
    }
    return (
      <table className="data-table">
        <thead>
          <tr>
            <th>نام پروژه</th>
            <th>دسته</th>
            <th>نوع</th>
            <th>صاحب اثر</th>
            <th>تاریخ</th>
            <th>وضعیت</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {rows.map((project) => (
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
                  {editable ? (
                    <>
                      <button type="button" className="mini-btn" onClick={() => onEditProject(project.id)}>
                        ویرایش
                      </button>
                      <button type="button" className="mini-btn danger" onClick={() => remove(project)}>
                        حذف
                      </button>
                    </>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="admin">
      <div className="panel-head" style={{ padding: '10px 12px 0', marginBottom: 0 }}>
        <div>
          <h3>محل کار {user.displayName}</h3>
          <p>نمونه‌کارهای خودتان را اینجا مدیریت کنید؛ انتشار در نمایشگاه در اختیار مدیر اصلی است.</p>
        </div>
        <button type="button" className="xp-btn primary" onClick={onNewProject}>
          ＋ نمونه‌کار جدید
        </button>
      </div>

      <div className="admin-body">
        {error ? <div className="form-error">{error}</div> : null}
        {loading ? <div className="loading-line">در حال خواندن نمونه‌کارها…</div> : null}

        <h4 style={{ margin: '4px 0 8px', fontSize: 12.5 }}>
          نمونه‌کارهای من ({mine.length})
        </h4>
        {renderTable(mine, true)}

        {user.role === 'admin' ? (
          <>
            <h4 style={{ margin: '18px 0 8px', fontSize: 12.5 }}>همه نمونه‌کارها ({projects.length})</h4>
            {renderTable(projects, true)}
          </>
        ) : (
          <>
            <h4 style={{ margin: '18px 0 8px', fontSize: 12.5 }}>
              نمایشگاه عمومی ({others.length})
            </h4>
            {renderTable(others, false)}
          </>
        )}
      </div>
    </div>
  )
}
