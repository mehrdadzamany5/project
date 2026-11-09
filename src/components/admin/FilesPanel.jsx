import { useCallback, useEffect, useState } from 'react'
import { api, formatDate } from '../../api.js'

function sizeLabel(size) {
  const value = Number(size) || 0
  if (value > 1024 * 1024) return `${(value / (1024 * 1024)).toFixed(1)} MB`
  if (value > 1024) return `${Math.round(value / 1024)} KB`
  return `${value} B`
}

export default function FilesPanel({ refreshKey, notify }) {
  const [files, setFiles] = useState([])
  const [linked, setLinked] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await api.library()
      setFiles(data.files)
      setLinked(data.linked)
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load, refreshKey])

  async function remove(file) {
    try {
      await api.deleteLibraryFile(file.id)
      notify?.('فایل حذف شد.')
      load()
    } catch (requestError) {
      notify?.(requestError.message, 'error')
    }
  }

  return (
    <>
      <div className="panel-head">
        <div>
          <h3>مدیریت فایل‌های آپلودشده</h3>
          <p>فایل‌ها در فضای ذخیره‌سازی سرور نگهداری می‌شوند و فقط مسیر آن‌ها در دیتابیس ثبت است.</p>
        </div>
      </div>

      {error ? <div className="form-error">{error}</div> : null}
      {loading ? <div className="loading-line">در حال خواندن…</div> : null}

      <table className="data-table">
        <thead>
          <tr>
            <th>نام فایل</th>
            <th>پیوست به</th>
            <th>نوع</th>
            <th>حجم</th>
            <th>تاریخ</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id}>
              <td>
                <a href={file.url} target="_blank" rel="noreferrer" style={{ direction: 'ltr', display: 'inline-block' }}>
                  {file.original_name}
                </a>
              </td>
              <td>{file.project_title || 'بدون اتصال'}</td>
              <td style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10 }}>{file.mime || '—'}</td>
              <td>{sizeLabel(file.size)}</td>
              <td style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5 }}>{formatDate(file.created_at)}</td>
              <td>
                <button type="button" className="mini-btn danger" onClick={() => remove(file)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
          {!loading && files.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: 16, color: '#6b695f' }}>
                فایلی بارگذاری نشده است.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>

      <h4 style={{ margin: '18px 0 8px', fontSize: 12.5 }}>فایل‌ها و آدرس‌های متصل به نمونه‌کارها</h4>
      <table className="data-table">
        <thead>
          <tr>
            <th>نمونه‌کار</th>
            <th>بندانگشتی</th>
            <th>فایل اصلی / آدرس</th>
          </tr>
        </thead>
        <tbody>
          {linked.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>
                {item.thumbnail_url ? (
                  <a href={item.thumbnail_url} target="_blank" rel="noreferrer">
                    مشاهده
                  </a>
                ) : (
                  '—'
                )}
              </td>
              <td style={{ direction: 'ltr', textAlign: 'left', fontFamily: 'IBM Plex Mono, monospace', fontSize: 10 }}>
                {item.content_url ? (
                  <a href={item.content_url} target="_blank" rel="noreferrer">
                    {item.content_url}
                  </a>
                ) : (
                  'هنوز متصل نشده'
                )}
              </td>
            </tr>
          ))}
          {linked.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: 16, color: '#6b695f' }}>
                هیچ فایلی به نمونه‌کارها متصل نشده است.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  )
}
