import { useEffect, useState } from 'react'
import { api, KIND_LABEL } from '../api.js'

const KINDS = ['image', 'video', 'pdf', 'website', 'other']

export default function ProjectEditor({ projectId, defaultFolderId, user, folders, notify, onCancel, onSaved }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    kind: 'image',
    folderId: defaultFolderId ? String(defaultFolderId) : folders[0] ? String(folders[0].id) : '',
    contentUrl: '',
    thumbnailUrl: '',
    isPublished: false,
  })
  const [pendingFile, setPendingFile] = useState(null)
  const [loading, setLoading] = useState(Boolean(projectId))
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!projectId) return
    let active = true
    api
      .project(projectId)
      .then((data) => {
        if (!active) return
        setForm({
          title: data.project.title,
          description: data.project.description || '',
          kind: data.project.kind || 'other',
          folderId: data.project.folder_id ? String(data.project.folder_id) : '',
          contentUrl: data.project.content_url || '',
          thumbnailUrl: data.project.thumbnail_url || '',
          isPublished: data.project.is_published,
        })
      })
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [projectId])

  function update(key, value) {
    setForm((previous) => ({ ...previous, [key]: value }))
  }

  async function uploadFile(file, target) {
    if (!file) return
    setUploading(target)
    setError('')
    try {
      const data = await api.upload(file)
      if (target === 'thumbnail') update('thumbnailUrl', data.file.url)
      else {
        update('contentUrl', data.file.url)
        setPendingFile(data.file)
      }
      notify?.(`فایل «${data.file.originalName}» بارگذاری شد.`)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setUploading('')
    }
  }

  async function submit(event) {
    event.preventDefault()
    if (busy) return
    if (!form.title.trim()) {
      setError('نام پروژه الزامی است.')
      return
    }
    setBusy(true)
    setError('')
    const payload = {
      title: form.title.trim(),
      description: form.description,
      kind: form.kind,
      folderId: form.folderId ? Number(form.folderId) : null,
      contentUrl: form.contentUrl,
      thumbnailUrl: form.thumbnailUrl,
    }
    if (user.role === 'admin') payload.isPublished = form.isPublished

    try {
      let savedId = projectId
      if (projectId) {
        await api.updateProject(projectId, payload)
      } else {
        const data = await api.createProject(payload)
        savedId = data.project.id
      }
      if (pendingFile && savedId) {
        await api.attachFile(savedId, pendingFile)
      }
      notify?.(projectId ? 'تغییرات نمونه‌کار ذخیره شد.' : 'نمونه‌کار جدید ثبت شد.')
      onSaved?.()
    } catch (requestError) {
      setError(requestError.message)
      setBusy(false)
    }
  }

  if (loading) return <div className="loading-line">در حال خواندن نمونه‌کار…</div>

  return (
    <form onSubmit={submit} style={{ padding: 14, overflow: 'auto' }}>
      {error ? <div className="form-error">{error}</div> : null}

      <div className="form-grid">
        <div className="field">
          <label htmlFor="project-title">نام پروژه</label>
          <input
            id="project-title"
            value={form.title}
            onChange={(event) => update('title', event.target.value)}
            placeholder="نام نمونه‌کار"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="project-folder">دسته‌بندی (فولدر)</label>
          <select
            id="project-folder"
            value={form.folderId}
            onChange={(event) => update('folderId', event.target.value)}
          >
            <option value="">بدون دسته‌بندی</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="project-kind">نوع پروژه</label>
          <select id="project-kind" value={form.kind} onChange={(event) => update('kind', event.target.value)}>
            {KINDS.map((kind) => (
              <option key={kind} value={kind}>
                {KIND_LABEL[kind]}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="project-url">آدرس اینترنتی پروژه (اختیاری)</label>
          <input
            id="project-url"
            dir="ltr"
            value={form.contentUrl}
            onChange={(event) => update('contentUrl', event.target.value)}
            placeholder="https://example.com/project"
          />
        </div>

        <div className="field full">
          <label htmlFor="project-description">توضیحات</label>
          <textarea
            id="project-description"
            value={form.description}
            onChange={(event) => update('description', event.target.value)}
            placeholder="درباره این نمونه‌کار…"
          />
        </div>

        <div className="field">
          <label htmlFor="project-thumb">تصویر بندانگشتی</label>
          <div className="upload-row">
            <input
              id="project-thumb"
              type="file"
              accept="image/*"
              onChange={(event) => uploadFile(event.target.files?.[0], 'thumbnail')}
            />
            {form.thumbnailUrl ? (
              <img className="thumb-preview" src={form.thumbnailUrl} alt="بندانگشتی" />
            ) : null}
          </div>
          {uploading === 'thumbnail' ? <span className="hint">در حال بارگذاری…</span> : null}
        </div>

        <div className="field">
          <label htmlFor="project-file">فایل اصلی</label>
          <div className="upload-row">
            <input
              id="project-file"
              type="file"
              onChange={(event) => uploadFile(event.target.files?.[0], 'content')}
            />
          </div>
          <span className="hint">
            {uploading === 'content'
              ? 'در حال بارگذاری…'
              : pendingFile
                ? `پیوست شد: ${pendingFile.originalName}`
                : form.contentUrl
                  ? 'فایل/آدرس فعلی ثبت شده است.'
                  : 'می‌توانید فایل را الان بارگذاری کنید یا بعداً آدرس آن را وارد کنید.'}
          </span>
        </div>

        {user.role === 'admin' ? (
          <div className="full check-row">
            <input
              id="project-published"
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) => update('isPublished', event.target.checked)}
            />
            <label htmlFor="project-published">انتشار در نمایشگاه (قابل مشاهده برای مهمان‌ها)</label>
          </div>
        ) : (
          <p className="hint full">
            نمونه‌کار شما پس از ثبت، پیش‌نویس است و پس از تأیید مدیر اصلی در نمایشگاه منتشر می‌شود.
          </p>
        )}
      </div>

      <div className="dialog-actions" style={{ padding: '14px 0 0', justifyContent: 'flex-start' }}>
        <button type="submit" className="xp-btn primary" disabled={busy}>
          {busy ? 'در حال ذخیره…' : 'ذخیره'}
        </button>
        <button type="button" className="xp-btn" onClick={onCancel} disabled={busy}>
          انصراف
        </button>
      </div>
    </form>
  )
}
