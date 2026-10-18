import { CATEGORIES, PRICE_BOUNDS } from '../data/products.js'
import { formatPrice } from '../lib/format.js'
import { Icon } from './ui/Icons.jsx'

/**
 * Shared filter controls for Shop, Category and Search.
 * All state lives in the URL so filtered views are shareable and back-navigable.
 */
export default function ProductFilters({
  category = 'all',
  onCategory,
  query = '',
  onQuery,
  maxPrice = PRICE_BOUNDS.max,
  onMaxPrice,
  showCategories = true,
  onClear,
  isFiltered = false,
}) {
  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="filter-search" className="label">
          Search
        </label>
        <div className="relative">
          <Icon
            name="search"
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
          />
          <input
            id="filter-search"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search products"
            className="field pl-9"
            autoComplete="off"
          />
        </div>
      </div>

      {showCategories ? (
        <fieldset>
          <legend className="label">Category</legend>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => onCategory('all')}
                aria-pressed={category === 'all'}
                className={`w-full py-1.5 text-left text-[13.5px] transition-colors ${
                  category === 'all' ? 'text-accent' : 'text-ink-2 hover:text-ink'
                }`}
              >
                All Products
              </button>
            </li>
            {CATEGORIES.map((entry) => (
              <li key={entry.slug}>
                <button
                  type="button"
                  onClick={() => onCategory(entry.slug)}
                  aria-pressed={category === entry.slug}
                  className={`w-full py-1.5 text-left text-[13.5px] transition-colors ${
                    category === entry.slug ? 'text-accent' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {entry.name}
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      <div>
        <label htmlFor="filter-price" className="label">
          Price
        </label>
        <input
          id="filter-price"
          type="range"
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          step={50}
          value={maxPrice}
          onChange={(event) => onMaxPrice(Number(event.target.value))}
          className="w-full accent-[#876447]"
        />
        <div className="mt-2 flex items-center justify-between text-[12px] text-ink-2">
          <span>{formatPrice(PRICE_BOUNDS.min)}</span>
          <span className="font-medium text-ink">Up to {formatPrice(maxPrice)}</span>
        </div>
      </div>

      {isFiltered ? (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-2 transition-colors hover:text-accent"
        >
          <Icon name="refresh" size={15} />
          Clear filters
        </button>
      ) : null}
    </div>
  )
}
