import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { PRICE_BOUNDS, useCatalog } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { formatNumber } from '../lib/format.js'
import { Icon } from '../components/ui/Icons.jsx'
import ProductFilters from '../components/ProductFilters.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { Photo } from '../components/ui/SmartImage.jsx'
import { Breadcrumbs, EmptyState } from '../components/ui/StateBlocks.jsx'
import NotFound from './NotFound.jsx'

export default function Category() {
  const { slug } = useParams()
  const { CATEGORIES, SORT_OPTIONS, filterProducts, getCategory } = useCatalog()
  const { t, lang } = useLang()
  const category = getCategory(slug)
  const [params, setParams] = useSearchParams()
  const [panelOpen, setPanelOpen] = useState(false)

  const sort = params.get('sort') || 'featured'
  const query = params.get('q') || ''
  const maxPrice = Number(params.get('max') || PRICE_BOUNDS.max)

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value === '' || value === null || value === undefined) next.delete(key)
    else next.set(key, String(value))
    setParams(next, { replace: true })
  }

  const clearFilters = () => setParams(new URLSearchParams(), { replace: true })
  const isFiltered = query !== '' || maxPrice !== PRICE_BOUNDS.max || sort !== 'featured'

  const products = useMemo(
    () => (category ? filterProducts({ category: category.slug, query, maxPrice, sort }) : []),
    [filterProducts, category, query, maxPrice, sort],
  )

  if (!category) return <NotFound />

  const filters = (
    <ProductFilters
      query={query}
      onQuery={(value) => setParam('q', value)}
      maxPrice={maxPrice}
      onMaxPrice={(value) => setParam('max', value === PRICE_BOUNDS.max ? '' : value)}
      showCategories={false}
      onClear={clearFilters}
      isFiltered={isFiltered}
    />
  )

  return (
    <>
      <section className="relative">
        <div className="relative h-[280px] overflow-hidden bg-sand sm:h-[320px] lg:h-[360px]">
          <Photo
            id={category.image}
            alt={t('category.imageAlt', { name: category.name })}
            priority
            sizes="100vw"
            widths={[800, 1200, 1600]}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-8">
              <p className="eyebrow text-white/75">{category.tagline}</p>
              <h1 className="mt-2 text-[30px] text-white sm:text-[38px] lg:text-[44px]">
                {category.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="shell py-10 lg:py-14">
        <Breadcrumbs
          items={[
            { label: t('breadcrumb.home'), to: '/' },
            { label: t('breadcrumb.shop'), to: '/shop' },
            { label: category.name },
          ]}
        />

        <p className="max-w-2xl text-[14.5px] leading-relaxed text-ink-2">{category.intro}</p>

        <div className="mt-10 lg:grid lg:grid-cols-[230px_1fr] lg:gap-12">
          <aside aria-label={t('common.productFilters')} className="hidden lg:block">
            <div className="sticky top-24">{filters}</div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="text-[13px] text-ink-2">
                <span className="font-semibold text-ink">
                  {t('shop.productCount', { count: formatNumber(products.length, lang) })}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPanelOpen((open) => !open)}
                  aria-expanded={panelOpen}
                  className="btn btn-quiet lg:hidden"
                >
                  <Icon name="sliders" size={15} />
                  {t('shop.filters')}
                </button>

                <label htmlFor="category-sort" className="sr-only">
                  {t('shop.sortProducts')}
                </label>
                <select
                  id="category-sort"
                  value={sort}
                  onChange={(event) => setParam('sort', event.target.value)}
                  className="field h-10 w-auto min-w-[170px] cursor-pointer py-0"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {panelOpen ? <div className="border-b border-line py-6 lg:hidden">{filters}</div> : null}

            <div className="mt-8">
              {products.length > 0 ? (
                <ProductGrid products={products} priorityCount={4} />
              ) : (
                <EmptyState
                  icon="search"
                  title={t('category.emptyTitle', { category: category.name })}
                  text={t('category.emptyText')}
                  actionLabel={t('filters.clear')}
                  onAction={clearFilters}
                />
              )}
            </div>

            <div className="mt-14 border-t border-line pt-8">
              <p className="eyebrow">{t('category.keepExploring')}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {CATEGORIES.filter((entry) => entry.slug !== category.slug).map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      to={`/category/${entry.slug}`}
                      className="inline-block border border-line bg-white px-3.5 py-2 text-[12.5px] text-ink-2 transition-colors hover:border-accent hover:text-accent"
                    >
                      {entry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
