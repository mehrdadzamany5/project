import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SORT_OPTIONS, searchProducts, sortProducts } from '../data/products.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { EmptyState } from '../components/ui/StateBlocks.jsx'
import { Icon } from '../components/ui/Icons.jsx'

export default function Search() {
  const [params, setParams] = useSearchParams()
  const urlQuery = params.get('q') || ''
  const sort = params.get('sort') || 'featured'
  const [draft, setDraft] = useState(urlQuery)

  useEffect(() => {
    setDraft(urlQuery)
  }, [urlQuery])

  const results = useMemo(
    () => (urlQuery ? sortProducts(searchProducts(urlQuery), sort) : []),
    [urlQuery, sort],
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
      <PageHeader
        eyebrow="Search"
        title="Find Your Piece"
        intro="Search by product name, category, material or the room you have in mind."
      />

      <div className="shell py-10 lg:py-14">
        <form onSubmit={submit} role="search" className="max-w-2xl">
          <label htmlFor="search-page-input" className="sr-only">
            Search products
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Icon
                name="search"
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3"
              />
              <input
                id="search-page-input"
                type="search"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Try “oak”, “sofa” or “lighting”"
                className="field h-12 pl-11"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary h-12 px-7">
              Search
            </button>
          </div>
        </form>

        {urlQuery ? (
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <p className="text-[13px] text-ink-2">
                <span className="font-semibold text-ink">{results.length}</span>{' '}
                {results.length === 1 ? 'result' : 'results'} for{' '}
                <span className="font-medium text-ink">“{urlQuery}”</span>
              </p>
              <div className="flex items-center gap-2">
                <label htmlFor="search-sort" className="sr-only">
                  Sort results
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
                  Clear
                </button>
              </div>
            </div>

            <div className="mt-8">
              {results.length > 0 ? (
                <ProductGrid products={results} priorityCount={4} />
              ) : (
                <EmptyState
                  icon="search"
                  title="No products found"
                  text={`Nothing matched “${urlQuery}”. Try a broader term such as “oak”, “sofa” or “storage”.`}
                  actionLabel="Browse all products"
                  actionTo="/shop"
                />
              )}
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              icon="search"
              title="Start typing to search"
              text="Our catalogue covers living room, bedroom, dining, office, storage, lighting, decor and outdoor furniture."
              actionLabel="Browse all products"
              actionTo="/shop"
            />
          </div>
        )}
      </div>
    </>
  )
}
