import Hero from '../components/home/Hero.jsx'
import BenefitsStrip from '../components/home/BenefitsStrip.jsx'
import CategoryGrid from '../components/home/CategoryGrid.jsx'
import CollectionBanners from '../components/home/CollectionBanners.jsx'
import Bestsellers from '../components/home/Bestsellers.jsx'
import BrandStory from '../components/home/BrandStory.jsx'
import ValuesStrip from '../components/home/ValuesStrip.jsx'
import Inspiration from '../components/home/Inspiration.jsx'
import Testimonials from '../components/home/Testimonials.jsx'
import SocialGallery from '../components/home/SocialGallery.jsx'
import Newsletter from '../components/home/Newsletter.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitsStrip />
      <div className="pt-16 lg:pt-20">
        <CategoryGrid />
      </div>
      <CollectionBanners />
      <Bestsellers />
      <BrandStory />
      <ValuesStrip />
      <div className="pt-16 lg:pt-20">
        <Inspiration />
      </div>
      <Testimonials />
      <SocialGallery />
      <Newsletter />
    </>
  )
}
