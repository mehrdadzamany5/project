import { useState } from 'react'
import { UserTileIcon } from './icons.jsx'

export default function Welcome({ site, onChooseUsers, onChooseGuest, busy, error }) {
  return (
    <div className="welcome">
      <header className="welcome-top">
        <div className="welcome-brand">
          {site.siteName}
          <small>{site.siteSubtitle}</small>
        </div>
        <div className="welcome-top-note">WINDOWS XP · DIGITAL GALLERY</div>
      </header>

      <div className="welcome-body">
        <div className="welcome-inner">
          <div className="welcome-side">
            <h1>
              به نمایشگاه <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}>GALLERY</span> خوش آمدید
            </h1>
            <p>
              محیطی شبیه Windows XP برای مرور نمونه‌کارها؛ فولدرها را باز کنید، پروژه‌ها را در مرورگر
              داخلی ببینید و در صورت داشتن حساب، نمونه‌کار جدید اضافه کنید.
            </p>
            <p style={{ opacity: 0.7, fontSize: 12.5 }}>
              برای ورود، یکی از دو گزینه مقابل را انتخاب کنید. بازدیدکنندگان می‌توانند بدون حساب وارد
              شوند.
            </p>
            <div className="welcome-hint">[ SELECT LOGON TYPE ]</div>
          </div>

          <div className="welcome-choices">
            {error ? <div className="form-error">{error}</div> : null}
            <button type="button" className="welcome-choice" onClick={onChooseUsers} disabled={busy}>
              <span className="welcome-tile-icon">
                <UserTileIcon size={30} />
              </span>
              <span className="welcome-choice-text">
                <strong>ورود کاربران</strong>
                <span>مدیر اصلی و سه کاربر با نام کاربری و رمز عبور</span>
              </span>
            </button>

            <button type="button" className="welcome-choice" onClick={onChooseGuest} disabled={busy}>
              <span className="welcome-tile-icon">
                <UserTileIcon guest size={30} />
              </span>
              <span className="welcome-choice-text">
                <strong>ورود مهمان</strong>
                <span>فقط مشاهده نمونه‌کارهای منتشرشده، بدون دسترسی مدیریتی</span>
              </span>
            </button>

            <p className="cred-hint" style={{ marginTop: 10 }}>
              demo accounts · admin / user1 / user2 / user3
            </p>
          </div>
        </div>
      </div>

      <footer className="welcome-footer">
        <span>GALLERY © {new Date().getFullYear()}</span>
        <span>turn on the sound for the full boot experience</span>
      </footer>
    </div>
  )
}
