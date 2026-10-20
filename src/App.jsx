import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Rooms from './pages/Rooms.jsx'
import RoomDetail from './pages/RoomDetail.jsx'
import Booking from './pages/Booking.jsx'
import Experiences from './pages/Experiences.jsx'
import Offers from './pages/Offers.jsx'
import Journal from './pages/Journal.jsx'
import JournalArticle from './pages/JournalArticle.jsx'
import Contact from './pages/Contact.jsx'
import Faq from './pages/Faq.jsx'
import Policies from './pages/Policies.jsx'
import PolicyDetail from './pages/PolicyDetail.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<RoomDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/experiences" element={<Experiences />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<JournalArticle />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/policies/:slug" element={<PolicyDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
