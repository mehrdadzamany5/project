import { PRODUCTS } from '../../data/products.js'
import ProductCard from '../ProductCard.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const FEATURED = PRODUCTS.filter((product) => product.badge === 'Bestseller').slice(0, 4)

export default function Bestsellers() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Bestsellers"
          title="Our Most Loved Furniture"
          actionLabel="View All"
          actionTo="/shop"
        />

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:mt-12 lg:grid-cols-4 lg:gap-x-6">
          {FEATURED.map((product, index) => (
            <Reveal key={product.id} delay={index * 70} className="h-full">
              <ProductCard product={product} priority={index < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
