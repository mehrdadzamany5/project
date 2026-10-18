import { useMemo } from 'react'
import { useCatalog } from '../../i18n/catalog.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import ProductCard from '../ProductCard.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function Bestsellers() {
  const { PRODUCTS } = useCatalog()
  const { t } = useLang()

  const featured = useMemo(
    () => PRODUCTS.filter((product) => product.badge === 'Bestseller').slice(0, 4),
    [PRODUCTS],
  )

  return (
    <section className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={t('home.bestsellers')}
          title={t('home.mostLoved')}
          actionLabel={t('home.viewAll')}
          actionTo="/shop"
        />

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:mt-12 lg:grid-cols-4 lg:gap-x-6">
          {featured.map((product, index) => (
            <Reveal key={product.id} delay={index * 70} className="h-full">
              <ProductCard product={product} priority={index < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
