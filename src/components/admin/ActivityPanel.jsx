import { useEffect, useState } from 'react'
import { api, formatDate } from '../../api.js'

const ACTION_LABEL = {
  login: 'ورود',
  guest_login: 'ورود مهمان',
  logout: 'خروج',
  password_change: 'تغییر رمز',
  folder_create: 'ایجاد فولدر',
  folder_update: 'ویرایش فولدر',
  folder_delete: 'حذف فولدر',
  project_create: 'ایجاد نمونه‌کار',
  project_update: 'ویرایش نمونه‌کار',
  project_delete: 'حذف نمونه‌کار',
  project_publish: 'انتشار',
  project_unpublish: 'مخفی‌کردن',
  file_upload: 'بارگذاری فایل',
  file_delete: 'حذف فایل',
  user_create: 'ایجاد کاربر',
  user_update: 'ویرایش کاربر',
  user_delete: 'حذف کاربر',
  settings_update: 'تنظیمات',
}

export default function ActivityPanel({ refreshKey }) {
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    api
      .activity()
      .then((data) => active && setActivity(data.activity))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [refreshKey])

  return (
    <>
      <div className="panel-head">
        <div>
          <h3>فعالیت کاربران</h3>
          <p>ورودها، تغییرات محتوا و عملیات مدیریتی به‌صورت خودکار ثبت می‌شوند.</p>
        </div>
      </div>

      {error ? <div className="form-error">{error}</div> : null}
      {loading ? <div className="loading-line">در حال خواندن گزارش…</div> : null}

      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: 54 }}>#</th>
            <th>کاربر</th>
            <th>عملیات</th>
            <th>جزئیات</th>
            <th>زمان</th>
          </tr>
        </thead>
        <tbody>
          {activity.map((row) => (
            <tr key={row.id}>
              <td style={{ fontFamily: 'IBM Plex Mono, monospace' }}>{row.id}</td>
              <td>{row.actor_name}</td>
              <td>
                <span className={`chip ${row.role === 'admin' ? 'admin' : ''}`}>
                  {ACTION_LABEL[row.action] || row.action}
                </span>
              </td>
              <td>{row.detail}</td>
              <td style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 10.5 }}>{formatDate(row.created_at)}</td>
            </tr>
          ))}
          {!loading && activity.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: 16, color: '#6b695f' }}>
                فعالیتی ثبت نشده است.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </>
  )
}
