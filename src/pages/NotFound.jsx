import { Link } from 'react-router-dom'
import { useCatalog } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Container from '../components/ui/Container.jsx'

export default function NotFound() {
  const { CATEGORIES } = useCatalog()
  const { t } = useLang()

  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="eyebrow">{t('notFound.eyebrow')}</p>
      <h1 className="mt-3 text-[32px] sm:text-[42px]">{t('notFound.title')}</h1>
      <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-ink-2">{t('notFound.text')}</p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary">
          {t('notFound.backHome')}
        </Link>
        <Link to="/shop" className="btn btn-outline">
          {t('notFound.shopAll')}
        </Link>
      </div>

      <ul className="mt-12 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              to={`/category/${category.slug}`}
              className="inline-block border border-line bg-white px-3.5 py-2 text-[12.5px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  )
}
