import { useCallback, useEffect, useState } from 'react'
import { api, KIND_LABEL, formatDate } from '../api.js'
import { IEGlobeIcon } from './icons.jsx'

export default function InternetExplorer({ initialProjectId }) {
  const [history, setHistory] = useState(
    initialProjectId ? [{ type: 'project', id: initialProjectId }] : [{ type: 'home' }],
  )
  const [index, setIndex] = useState(0)
  const [project, setProject] = useState(null)
  const [files, setFiles] = useState([])
  const [catalog, setCatalog] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const current = history[index] || { type: 'home' }

  useEffect(() => {
    let active = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const list = await api.projects()
        if (!active) return
        setCatalog(list.projects)
        if (current.type === 'project') {
          const data = await api.project(current.id)
          if (!active) return
          setProject(data.project)
          setFiles(data.files)
        }
      } catch (requestError) {
        if (active) setError(requestError.message)
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => {
      active = false
    }
  }, [current.type, current.id, reloadKey])

  const navigate = useCallback(
    (entry) => {
      setHistory((previous) => [...previous.slice(0, index + 1), entry])
      setIndex((previous) => previous + 1)
    },
    [index],
  )

  const related = project
    ? catalog.filter((item) => item.id !== project.id && item.folder_id === project.folder_id)
    : []

  const address =
    current.type === 'home'
      ? 'gallery://home'
      : project?.content_url || `gallery://project/${project?.id ?? ''}`

  return (
    <>
      <div className="ie-chrome">
        <div className="ie-menubar">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Favorites</span>
          <span>Tools</span>
          <span>Help</span>
        </div>

        <div className="ie-toolbar">
          <button
            type="button"
            className="ie-btn"
            disabled={index === 0}
            onClick={() => setIndex((value) => Math.max(0, value - 1))}
            title="بازگشت"
          >
            <span aria-hidden="true">◀</span> Back
          </button>
          <button
            type="button"
            className="ie-btn"
            disabled={index >= history.length - 1}
            onClick={() => setIndex((value) => Math.min(history.length - 1, value + 1))}
            title="جلورفتن"
          >
            Forward <span aria-hidden="true">▶</span>
          </button>
          <button type="button" className="ie-btn" onClick={() => setReloadKey((value) => value + 1)} title="تازه‌سازی">
            <span aria-hidden="true">⟳</span> Refresh
          </button>
          <button type="button" className="ie-btn" onClick={() => navigate({ type: 'home' })} title="صفحه خانگی">
            <span aria-hidden="true">⌂</span> Home
          </button>
          <span className="tool-sep" />
          <button type="button" className="ie-btn" onClick={() => navigate({ type: 'home' })}>
            <IEGlobeIcon size={14} /> GALLERY
          </button>
        </div>

        <div className="ie-address">
          <span aria-hidden="true">🌐</span>
          <span className="addr-value" title={address}>
            {address}
          </span>
          <button type="button" className="ie-btn" onClick={() => setReloadKey((value) => value + 1)}>
            Go
          </button>
        </div>
      </div>

      <div className="ie-body">
        {loading ? <div className="ie-progress" /> : null}

        {error ? (
          <div className="ie-placeholder">
            <h1>این صفحه نمایش داده نمی‌شود</h1>
            <p>{error}</p>
            <p className="ph-note">
              ممکن است نمونه‌کار منتشر نشده باشد یا دسترسی حساب شما به آن محدود شده باشد.
            </p>
          </div>
        ) : current.type === 'home' ? (
          <div className="ie-placeholder">
            <span className="ph-kind">GALLERY HOME</span>
            <h1>نمایشگاه نمونه‌کارها</h1>
            <p>
              به صفحه خانگی GALLERY خوش آمدید. نمونه‌کارهای منتشرشده در ادامه فهرست شده‌اند؛ با کلیک روی
              هر عنوان، آن نمونه‌کار در همین پنجره باز می‌شود.
            </p>
            <div
              style={{
                marginTop: 16,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
                gap: 10,
              }}
            >
              {catalog.length === 0 ? <p>هنوز نمونه‌کاری منتشر نشده است.</p> : null}
              {catalog.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate({ type: 'project', id: item.id })}
                  style={{
                    textAlign: 'start',
                    padding: '9px 11px',
                    border: '1px solid #cfd9e8',
                    borderRadius: 4,
                    background: '#f8fbff',
                    font: 'inherit',
                    fontSize: 12,
                    lineHeight: 1.9,
                  }}
                >
                  <strong style={{ display: 'block', fontSize: 12.5 }}>{item.title}</strong>
                  <span style={{ fontSize: 10.5, color: '#5f758f' }}>
                    {KIND_LABEL[item.kind] || 'فایل'} · {item.folder_name || 'بدون دسته'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : project ? (
          <ProjectPage
            project={project}
            files={files}
            related={related}
            onNavigate={(id) => navigate({ type: 'project', id })}
          />
        ) : null}
      </div>

      <div className="status-bar">
        <span className="status-cell" style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
          <IEGlobeIcon size={12} /> Internet
        </span>
        <span className="status-cell">{loading ? 'در حال باز کردن…' : 'آماده'}</span>
        <span className="status-cell" style={{ fontFamily: 'IBM Plex Mono, monospace', direction: 'ltr' }}>
          {current.type === 'home' ? 'gallery://home' : `gallery://project/${project?.id ?? ''}`}
        </span>
      </div>
    </>
  )
}

function ProjectPage({ project, files, related, onNavigate }) {
  const url = project.content_url

  if (url && project.kind === 'image') {
    return (
      <div className="ie-media">
        <img src={url} alt={project.title} />
      </div>
    )
  }
  if (url && project.kind === 'video') {
    return (
      <div className="ie-media">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video src={url} controls playsInline />
      </div>
    )
  }
  if (url && project.kind === 'pdf') {
    return <iframe className="ie-frame" src={url} title={project.title} style={{ minHeight: 380 }} />
  }
  if (url && project.kind === 'website') {
    return (
      <iframe
        className="ie-frame"
        src={url}
        title={project.title}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        style={{ minHeight: 380 }}
      />
    )
  }

  return (
    <div className="ie-placeholder">
      <span className="ph-kind">{KIND_LABEL[project.kind] || 'FILE'} PLACEHOLDER</span>
      <h1>{project.title}</h1>
      <p>{project.description || 'توضیحی برای این نمونه‌کار ثبت نشده است.'}</p>

      {url ? (
        <p>
          <a href={url} target="_blank" rel="noreferrer">
            باز کردن فایل اصلی در یک زبانه جدید
          </a>
        </p>
      ) : null}

      <dl className="ph-meta">
        <div>
          <dt>دسته‌بندی</dt>
          <dd>{project.folder_name || 'بدون دسته'}</dd>
        </div>
        <div>
          <dt>صاحب اثر</dt>
          <dd>{project.owner_name || '—'}</dd>
        </div>
        <div>
          <dt>تاریخ ثبت</dt>
          <dd>{formatDate(project.created_at)}</dd>
        </div>
        <div>
          <dt>وضعیت انتشار</dt>
          <dd>{project.is_published ? 'منتشرشده' : 'پیش‌نویس (فقط برای صاحب اثر و مدیر)'}</dd>
        </div>
      </dl>

      {files.length ? (
        <div className="ph-note">
          <strong>فایل‌های پیوست</strong>
          <ul style={{ margin: '6px 0 0', paddingInlineStart: 18 }}>
            {files.map((file) => (
              <li key={file.id}>
                <a href={file.url} target="_blank" rel="noreferrer">
                  {file.original_name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {related.length ? (
        <div className="ph-note">
          <strong>نمونه‌کارهای دیگر این دسته</strong>
          <ul style={{ margin: '6px 0 0', paddingInlineStart: 18 }}>
            {related.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  style={{
                    background: 'none',
                    border: 0,
                    padding: 0,
                    color: '#0b4aa8',
                    textDecoration: 'underline',
                    font: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="ph-note">
        فایل اصلی این نمونه‌کار هنوز روی سرور میزبانی نشده است. پس از آماده‌شدن فایل، کافی است آدرس آن در
        پنل مدیریت ثبت شود؛ نیازی به تغییر کد نیست.
      </p>
    </div>
  )
}
