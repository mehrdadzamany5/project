import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCatalog } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { formatNumber } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { EmptyState } from '../components/ui/StateBlocks.jsx'
import { Icon } from '../components/ui/Icons.jsx'

export default function Search() {
  const { SORT_OPTIONS, searchProducts, sortProducts } = useCatalog()
  const { t, lang } = useLang()
  const [params, setParams] = useSearchParams()
  const urlQuery = params.get('q') || ''
  const sort = params.get('sort') || 'featured'
  const [draft, setDraft] = useState(urlQuery)

  useEffect(() => {
    setDraft(urlQuery)
  }, [urlQuery])

  const results = useMemo(
    () => (urlQuery ? sortProducts(searchProducts(urlQuery), sort) : []),
    [urlQuery, sort, searchProducts, sortProducts],
  )

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (!value) next.delete(key)
    else next.set(key, String(value))
    setParams(next, { replace: true })
  }

  const submit = (event) => {
    event.preventDefault()
    setParam('q', draft.trim())
  }

  const clearSearch = () => {
    setDraft('')
    setParams(new URLSearchParams(), { replace: true })
  }

  return (
    <>
      <PageHeader eyebrow={t('search.eyebrow')} title={t('search.title')} intro={t('search.intro')} />

      <div className="shell py-10 lg:py-14">
        <form onSubmit={submit} role="search" className="max-w-2xl">
          <label htmlFor="search-page-input" className="sr-only">
            {t('header.searchProducts')}
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Icon
                name="search"
                size={18}
                className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-ink-3"
              />
              <input
                id="search-page-input"
                type="search"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={t('search.placeholder')}
                className="field h-12 ps-11"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary h-12 px-7">
              {t('search.button')}
            </button>
          </div>
        </form>

        {urlQuery ? (
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="text-[13px] text-ink-2">
                {t('search.resultCount', { count: formatNumber(results.length, lang) })}{' '}
                {t('search.for')} <span className="font-medium text-ink">“{urlQuery}”</span>
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="search-sort" className="sr-only">
                  {t('search.sortResults')}
                </label>
                <select
                  id="search-sort"
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
                <button type="button" onClick={clearSearch} className="btn btn-quiet h-10">
                  {t('search.clear')}
                </button>
              </div>
            </div>

            <div className="mt-8">
              {results.length > 0 ? (
                <ProductGrid products={results} priorityCount={4} />
              ) : (
                <EmptyState
                  icon="search"
                  title={t('search.emptyTitle')}
                  text={t('search.emptyText', { query: urlQuery })}
                  actionLabel={t('search.browseAll')}
                  actionTo="/shop"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              icon="search"
              title={t('search.startTitle')}
              text={t('search.startText')}
              actionLabel={t('search.browseAll')}
              actionTo="/shop"
            />
          </div>
        )}
      </div>
    </>
  )
}
