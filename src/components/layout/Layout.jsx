import { Outlet } from 'react-router-dom'
import { useLang } from '../../i18n/LanguageContext.jsx'
import AnnouncementBar from './AnnouncementBar.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from './ScrollToTop.jsx'
import Toast from '../ui/Toast.jsx'
import { useStore } from '../../context/StoreContext.jsx'

export default function Layout() {
  const { toast } = useStore()
  const { t } = useLang()

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-2 focus:text-[13px] focus:text-white"
      >
        {t('layout.skipToContent')}
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toast toast={toast} />
    </div>
  )
}
