import Footer from './Footer.jsx'
import Header from './Header.jsx'
import ScrollToTop from './ScrollToTop.jsx'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
