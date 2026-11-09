import { useState } from 'react'
import { api, KIND_LABEL } from '../../api.js'
import { useProjects } from './ProjectsPanel.jsx'

export default function PublishingPanel({ refreshKey, notify, onChanged }) {
  const { projects, loading, error, reload } = useProjects(refreshKey)
  const [busyId, setBusyId] = useState(null)

  async function toggle(project) {
    setBusyId(project.id)
    try {
      await api.publishProject(project.id, !project.is_published)
      notify?.(project.is_published ? 'نمونه‌کار از نمایشگاه مخفی شد.' : 'نمونه‌کار در نمایشگاه منتشر شد.')
      reload()
      onChanged?.()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    } finally {
      setBusyId(null)
    }
  }

  const published = projects.filter((project) => project.is_published).length

  return (
    <>
      <div className="panel-head">
        <div>
          <h3>مدیریت انتشار</h3>
          <p>فقط نمونه‌کارهای منتشرشده برای مهمان‌ها و بازدیدکنندگان دیده می‌شوند.</p>
        </div>
      </div>

      <div className="panel-grid" style={{ marginBottom: 12 }}>
        <div className="stat-card">
          <strong>{published}</strong>
          <span>منتشرشده</span>
        </div>
        <div className="stat-card">
          <strong>{projects.length - published}</strong>
          <span>پیش‌نویس</span>
        </div>
        <div className="stat-card">
          <strong>{projects.length}</strong>
          <span>کل نمونه‌کارها</span>
        </div>
      </div>

      {error ? <div className="form-error">{error}</div> : null}
      {loading ? <div className="loading-line">در حال خواندن…</div> : null}

      <table className="data-table">
        <thead>
          <tr>
            <th>نمونه‌کار</th>
            <th>نوع</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{KIND_LABEL[project.kind] || '—'}</td>
              <td>
                <span className={`chip ${project.is_published ? 'live' : 'off'}`}>
                  {project.is_published ? 'منتشرشده' : 'پیش‌نویس'}
                </span>
              </td>
              <td>
                <button
                  type="button"
                  className={`mini-btn ${project.is_published ? 'danger' : ''}`}
                  onClick={() => toggle(project)}
                  disabled={busyId === project.id}
                >
                  {project.is_published ? 'مخفی‌کردن' : 'انتشار'}
                </button>
              </td>
            </tr>
          ))}
          {!loading && projects.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: 16, color: '#6b695f' }}>
                نمونه‌کاری ثبت نشده است.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  )
}
