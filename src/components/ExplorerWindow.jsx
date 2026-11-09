import { useCallback, useEffect, useState } from 'react'
import { api, KIND_LABEL, formatDate } from '../api.js'
import { FileIcon } from './icons.jsx'

export default function ExplorerWindow({
  folderId,
  folderName,
  user,
  refreshKey,
  onOpenProject,
  onNewProject,
  onEditProject,
  onFoldersChanged,
  notify,
}) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [rename, setRename] = useState('')
  const [renaming, setRenaming] = useState(false)

  const canContribute = user.role !== 'guest'
  const isAdmin = user.role === 'admin'
  const selected = projects.find((project) => project.id === selectedId) || null

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.projects(folderId)
      setProjects(data.projects)
      setSelectedId((current) => (data.projects.some((item) => item.id === current) ? current : null))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [folderId])

  useEffect(() => {
    load()
  }, [load, refreshKey])

  useEffect(() => {
    setRename(folderName || '')
  }, [folderName])

  async function saveRename() {
    if (!rename.trim()) return
    setRenaming(true)
    try {
      await api.updateFolder(folderId, { name: rename.trim() })
      notify?.('نام فولدر ذخیره شد.')
      onFoldersChanged?.()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    } finally {
      setRenaming(false)
    }
  }

  async function removeFolder() {
    setRenaming(true)
    try {
      await api.deleteFolder(folderId)
      notify?.('فولدر حذف شد.')
      onFoldersChanged?.()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    } finally {
      setRenaming(false)
    }
  }

  async function togglePublish(project) {
    try {
      await api.publishProject(project.id, !project.is_published)
      notify?.(project.is_published ? 'نمونه‌کار مخفی شد.' : 'نمونه‌کار منتشر شد.')
      load()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    }
  }

  async function removeProject(project) {
    try {
      await api.deleteProject(project.id)
      notify?.('نمونه‌کار حذف شد.')
      load()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    }
  }

  const isOwner = selected && selected.owner_id === user.id
  const canEditSelected = selected && (isAdmin || (user.role === 'user' && isOwner))

  return (
    <>
      <div className="xp-addrbar">
        <span className="addr-label">آدرس</span>
        <span className="addr-value">
          <span aria-hidden="true">📁</span> Gallery\{folderName || 'New Folder'}
        </span>
      </div>

      <div className="xp-toolbar">
        <button type="button" className="tool-btn" onClick={load}>
          <span className="tool-glyph">⟳</span> تازه‌سازی
        </button>
        <span className="tool-sep" />
        {canContribute ? (
          <button type="button" className="tool-btn" onClick={() => onNewProject(folderId)}>
            <span className="tool-glyph">＋</span> نمونه‌کار جدید
          </button>
        ) : (
          <span className="tool-btn" style={{ opacity: 0.5 }} title="حساب مهمان اجازه افزودن ندارد">
            <span className="tool-glyph">＋</span> نمونه‌کار جدید
          </span>
        )}
        {isAdmin ? (
          <>
            <span className="tool-sep" />
            <button type="button" className="tool-btn" onClick={saveRename} disabled={renaming}>
              <span className="tool-glyph">✎</span> ذخیره نام فولدر
            </button>
            <button type="button" className="tool-btn" onClick={removeFolder} disabled={renaming}>
              <span className="tool-glyph">✕</span> حذف فولدر
            </button>
          </>
        ) : null}
      </div>

      <div className="explorer">
        <div className="explorer-main">
          <div className="window-scroll">
            <div className="explorer-grid">
              {loading ? <div className="loading-line">در حال خواندن فولدر…</div> : null}
              {error ? <div className="empty-state">{error}</div> : null}
              {!loading && !error && projects.length === 0 ? (
                <div className="empty-state">
                  این فولدر هنوز نمونه‌کاری ندارد.
                  <br />
                  {canContribute ? 'از دکمه «نمونه‌کار جدید» استفاده کنید.' : 'بعداً دوباره سر بزنید.'}
                </div>
              ) : null}
              {projects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  className={`file-item ${selectedId === project.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedId(project.id)
                    if (window.matchMedia('(pointer: coarse)').matches) onOpenProject(project)
                  }}
                  onDoubleClick={() => onOpenProject(project)}
                >
                  <span style={{ position: 'relative' }}>
                    <FileIcon kind={project.kind} thumb={project.thumbnail_url} />
                    {project.is_published ? null : <span className="file-badge">پیش‌نویس</span>}
                  </span>
                  <span className="file-item-name">{project.title}</span>
                  <span className="file-item-meta">
                    {KIND_LABEL[project.kind] || 'فایل'} · {project.owner_name || '—'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="status-bar">
            <span className="status-cell">{projects.length} مورد</span>
            <span className="status-cell">{selected ? selected.title : 'آماده'}</span>
          </div>
        </div>

        <aside className="explorer-sidebar">
          <div className="sidebar-head">جزئیات فولدر</div>
          {isAdmin ? (
            <div className="sidebar-block">
              <h4>نام فولدر</h4>
              <input
                className="xp-input"
                value={rename}
                onChange={(event) => setRename(event.target.value)}
                aria-label="نام فولدر"
              />
              <button type="button" onClick={saveRename} disabled={renaming}>
                ذخیره نام
              </button>
            </div>
          ) : null}

          {selected ? (
            <div className="sidebar-block">
              <h4>{selected.title}</h4>
              <p>
                {KIND_LABEL[selected.kind] || 'فایل'} · {selected.owner_name || '—'}
                <br />
                {formatDate(selected.created_at)}
                <br />
                {selected.is_published ? 'منتشرشده' : 'پیش‌نویس'}
              </p>
              <button type="button" onClick={() => onOpenProject(selected)}>
                باز کردن در Internet Explorer
              </button>
              {canEditSelected ? (
                <button type="button" onClick={() => onEditProject(selected.id)}>
                  ویرایش اطلاعات
                </button>
              ) : null}
              {isAdmin ? (
                <button type="button" onClick={() => togglePublish(selected)}>
                  {selected.is_published ? 'مخفی‌کردن از نمایشگاه' : 'انتشار در نمایشگاه'}
                </button>
              ) : null}
              {canEditSelected ? (
                <button type="button" onClick={() => removeProject(selected)} style={{ color: '#8d1b1b' }}>
                  حذف نمونه‌کار
                </button>
              ) : null}
            </div>
          ) : (
            <div className="sidebar-block">
              <h4>راهنما</h4>
              <p>
                روی فایل‌ها دوبار کلیک کنید تا در پنجره Internet Explorer باز شوند. در موبایل یک لمس
                کافی است.
              </p>
            </div>
          )}

          <div className="sidebar-block">
            <h4>دسترسی شما</h4>
            <p>
              {user.role === 'guest'
                ? 'مهمان: فقط مشاهده نمونه‌کارهای منتشرشده.'
                : user.role === 'admin'
                  ? 'مدیر اصلی: دسترسی کامل به فولدرها، پروژه‌ها و انتشار.'
                  : 'کاربر: افزودن و ویرایش نمونه‌کارهای خودتان.'}
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
