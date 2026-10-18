import { PRICE_BOUNDS, useCatalog } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'
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
  const { CATEGORIES } = useCatalog()
  const { t, lang } = useLang()

  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="filter-search" className="label">
          {t('filters.search')}
        </label>
        <div className="relative">
          <Icon
            name="search"
            size={16}
            className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 text-ink-3"
          />
          <input
            id="filter-search"
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder={t('filters.searchPlaceholder')}
            className="field ps-9"
            autoComplete="off"
          />
        </div>
      </div>

      {showCategories ? (
        <fieldset>
          <legend className="label">{t('filters.category')}</legend>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => onCategory('all')}
                aria-pressed={category === 'all'}
                className={`w-full py-1.5 text-start text-[13.5px] transition-colors ${
                  category === 'all' ? 'text-accent' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {t('filters.allProducts')}
              </button>
            </li>
            {CATEGORIES.map((entry) => (
              <li key={entry.slug}>
                <button
                  type="button"
                  onClick={() => onCategory(entry.slug)}
                  aria-pressed={category === entry.slug}
                  className={`w-full py-1.5 text-start text-[13.5px] transition-colors ${
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
          {t('filters.price')}
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
          <span>{formatPrice(PRICE_BOUNDS.min, lang)}</span>
          <span className="font-medium text-ink">
            {t('filters.upTo', { price: formatPrice(maxPrice, lang) })}
          </span>
        </div>
      </div>

      {isFiltered ? (
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink-2 transition-colors hover:text-accent"
        >
          <Icon name="refresh" size={15} />
          {t('filters.clear')}
        </button>
      ) : null}
    </div>
  )
}
