import { useMemo } from 'react'
import {
  CATEGORIES as EN_CATEGORIES,
  PRODUCTS as EN_PRODUCTS,
  PRICE_BOUNDS,
  SORT_OPTIONS as EN_SORT_OPTIONS,
  sortProducts,
} from '../data/products.js'
import { CATEGORY_FA, FINISH_FA, PRODUCT_FA, SORT_OPTIONS_FA } from './catalogFa.js'
import { useLang } from './LanguageContext.jsx'

export { PRICE_BOUNDS }

/** Display label for a stored finish name (the stored value stays stable). */
export const finishLabel = (name, lang) => (lang === 'fa' ? FINISH_FA[name] || name : name)

function localizeCategory(category, lang) {
  const over = CATEGORY_FA[category.slug]
  return over ? { ...category, ...over } : category
}

function localizeProduct(product, lang) {
  const over = PRODUCT_FA[product.id]
  if (!over) return product

  const localized = { ...product, ...over }

  // Keep colour *names* stable (they are persisted in the cart) and add a
  // translated label for display.
  localized.colors = (product.colors || []).map((color) => ({
    ...color,
    label: finishLabel(color.name, lang),
  }))

  // Search should find a product by either language.
  localized.searchText = [
    product.name,
    product.blurb,
    product.description,
    product.material,
    ...(product.tags || []),
    localized.name,
    localized.blurb,
    localized.description,
    localized.material,
    ...(over.tags || []),
  ].join(' ')

  return localized
}

const matches = (product, query) => {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = product.searchText
    ? product.searchText.toLowerCase()
    : [
        product.name,
        product.blurb,
        product.description,
        product.material,
        product.category,
        ...(product.tags || []),
      ]
        .join(' ')
        .toLowerCase()
  return haystack.includes(q)
}

function buildCatalog(lang) {
  const isFa = lang === 'fa'

  const CATEGORIES = isFa ? EN_CATEGORIES.map((entry) => localizeCategory(entry, lang)) : EN_CATEGORIES
  const PRODUCTS = isFa ? EN_PRODUCTS.map((entry) => localizeProduct(entry, lang)) : EN_PRODUCTS
  const SORT_OPTIONS = isFa ? SORT_OPTIONS_FA : EN_SORT_OPTIONS

  const getProduct = (idOrSlug) =>
    PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug) || null

  const getCategory = (slug) => CATEGORIES.find((c) => c.slug === slug) || null

  const relatedProducts = (product, limit = 4) =>
    PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
      .concat(PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category))
      .slice(0, limit)

  const searchProducts = (query) => {
    const q = query.trim()
    if (!q) return []
    return PRODUCTS.filter((product) => matches(product, q))
  }

  const filterProducts = ({ category = 'all', query = '', maxPrice = Infinity, sort = 'featured' } = {}) =>
    sortProducts(
      PRODUCTS.filter(
        (product) =>
          (category === 'all' || product.category === category) &&
          product.price <= maxPrice &&
          matches(product, query),
      ),
      sort,
    )

  return {
    CATEGORIES,
    PRODUCTS,
    SORT_OPTIONS,
    PRICE_BOUNDS,
    getProduct,
    getCategory,
    relatedProducts,
    searchProducts,
    filterProducts,
    sortProducts,
    matchesQuery: matches,
  }
}

export function useCatalog() {
  const { lang } = useLang()
  return useMemo(() => buildCatalog(lang), [lang])
}
