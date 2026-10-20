import Hero from '../components/home/Hero.jsx'
import Welcome from '../components/home/Welcome.jsx'
import FeaturedRoom from '../components/home/FeaturedRoom.jsx'
import RoomStrip from '../components/home/RoomStrip.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import OffersCollage from '../components/home/OffersCollage.jsx'
import JournalPreview from '../components/home/JournalPreview.jsx'
import { getFeaturedRoom } from '../data/rooms.js'

export default function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <FeaturedRoom room={getFeaturedRoom()} />
      <RoomStrip />
      <Testimonials />
      <OffersCollage />
      <JournalPreview />
    </>
  )
}
