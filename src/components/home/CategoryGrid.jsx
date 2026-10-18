import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/products.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Photo } from '../ui/SmartImage.jsx'

export default function CategoryGrid() {
  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow="Shop by category"
          title="Find Furniture for Every Space"
          actionLabel="View All"
          actionTo="/shop"
        />

        <ul className="mt-10 grid grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-5 lg:mt-12 lg:grid-cols-8 lg:gap-x-6">
          {CATEGORIES.map((category, index) => (
            <Reveal as="li" key={category.slug} delay={index * 45}>
              <Link
                to={`/category/${category.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <span className="img-box relative w-full rounded-full border border-line/70 transition-colors duration-300 group-hover:border-accent">
                  <span className="block aspect-square w-full overflow-hidden rounded-full">
                    <Photo
                      id={category.image}
                      alt={`${category.name} furniture`}
                      sizes="(min-width: 1024px) 150px, 22vw"
                      widths={[240, 360, 520]}
                      className="h-full w-full rounded-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    />
                  </span>
                </span>
                <span className="mt-3 text-[12.5px] font-medium text-ink transition-colors group-hover:text-accent">
                  {category.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
