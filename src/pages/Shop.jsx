import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRICE_BOUNDS, useCatalog } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { formatNumber } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import ProductFilters from '../components/ProductFilters.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { EmptyState } from '../components/ui/StateBlocks.jsx'
import { Icon } from '../components/ui/Icons.jsx'

export default function Shop() {
  const { SORT_OPTIONS, filterProducts } = useCatalog()
  const { t, lang } = useLang()
  const [params, setParams] = useSearchParams()
  const [panelOpen, setPanelOpen] = useState(false)

  const category = params.get('category') || 'all'
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

  const isFiltered =
    category !== 'all' || query !== '' || maxPrice !== PRICE_BOUNDS.max || sort !== 'featured'

  const products = useMemo(
    () => filterProducts({ category, query, maxPrice, sort }),
    [filterProducts, category, query, maxPrice, sort],
  )

  const filters = (
    <ProductFilters
      category={category}
      onCategory={(value) => setParam('category', value === 'all' ? '' : value)}
      query={query}
      onQuery={(value) => setParam('q', value)}
      maxPrice={maxPrice}
      onMaxPrice={(value) => setParam('max', value === PRICE_BOUNDS.max ? '' : value)}
      onClear={clearFilters}
      isFiltered={isFiltered}
    />
  )

  return (
    <>
      <PageHeader eyebrow={t('shop.eyebrow')} title={t('shop.title')} intro={t('shop.intro')} />

      <div className="shell py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-[230px_1fr] lg:gap-12">
          {/* Desktop filters */}
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

                <label htmlFor="shop-sort" className="sr-only">
                  {t('shop.sortProducts')}
                </label>
                <select
                  id="shop-sort"
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

            {panelOpen ? (
              <div className="border-b border-line py-6 lg:hidden">{filters}</div>
            ) : null}

            <div className="mt-8">
              {products.length > 0 ? (
                <ProductGrid products={products} priorityCount={4} />
              ) : (
                <EmptyState
                  icon="search"
                  title={t('shop.emptyTitle')}
                  text={t('shop.emptyText')}
                  actionLabel={t('filters.clear')}
                  onAction={clearFilters}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
