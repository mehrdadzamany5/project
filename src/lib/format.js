/**
 * Locale-aware formatting. The underlying numeric values are never changed —
 * only how they are written out. English (en-US) stays the default so every
 * existing call site behaves exactly as before.
 */
const LOCALES = { en: 'en-US', fa: 'fa-IR' }

const localeFor = (lang) => LOCALES[lang] || LOCALES.en

export const formatNumber = (value, lang = 'en', options) =>
  new Intl.NumberFormat(localeFor(lang), options).format(value)

export const formatPrice = (value, lang = 'en') =>
  new Intl.NumberFormat(localeFor(lang), {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)

export const formatDate = (iso, lang = 'en') =>
  new Date(iso).toLocaleDateString(localeFor(lang), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

export const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
