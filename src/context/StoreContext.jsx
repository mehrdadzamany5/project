import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { SITE } from '../data/content.js'
import { useCatalog } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'

const CART_KEY = 'nordic-living.cart.v1'
const WISHLIST_KEY = 'nordic-living.wishlist.v1'
const RECENT_KEY = 'nordic-living.recent.v1'

const StoreContext = createContext(null)

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode) — state stays in memory for the session */
  }
}

const lineKey = (productId, color) => `${productId}::${color}`

export function StoreProvider({ children }) {
  const { getProduct, PRODUCTS } = useCatalog()
  const { t } = useLang()
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []))
  const [wishlist, setWishlist] = useState(() => readStorage(WISHLIST_KEY, []))
  const [recent, setRecent] = useState(() => readStorage(RECENT_KEY, []))
  const [toast, setToast] = useState(null)

  useEffect(() => writeStorage(CART_KEY, cart), [cart])
  useEffect(() => writeStorage(WISHLIST_KEY, wishlist), [wishlist])
  useEffect(() => writeStorage(RECENT_KEY, recent), [recent])

  const notify = useCallback((message) => {
    setToast({ id: Date.now(), message })
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3000)
    return () => window.clearTimeout(timer)
  }, [toast])

  /* ---------------- cart ---------------- */

  const addToCart = useCallback(
    (product, options = {}) => {
      const { qty = 1, color } = options
      const variant = color || product.colors?.[0]?.name || 'Default'
      const key = lineKey(product.id, variant)
      setCart((prev) => {
        const existing = prev.find((line) => lineKey(line.productId, line.color) === key)
        if (!existing) return [...prev, { productId: product.id, color: variant, qty }]
        return prev.map((line) =>
          lineKey(line.productId, line.color) === key ? { ...line, qty: line.qty + qty } : line,
        )
      })
      notify(t('store.addedToBag', { name: product.name }))
    },
    [notify, t],
  )

  const updateQty = useCallback((productId, color, qty) => {
    const next = Math.max(1, Math.min(20, qty))
    setCart((prev) =>
      prev.map((line) =>
        lineKey(line.productId, line.color) === lineKey(productId, color)
          ? { ...line, qty: next }
          : line,
      ),
    )
  }, [])

  const removeFromCart = useCallback((productId, color) => {
    setCart((prev) =>
      prev.filter((line) => lineKey(line.productId, line.color) !== lineKey(productId, color)),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartLines = useMemo(
    () =>
      cart
        .map((line) => ({ ...line, product: getProduct(line.productId) }))
        .filter((line) => Boolean(line.product)),
    [cart, getProduct],
  )

  const cartCount = useMemo(() => cartLines.reduce((sum, line) => sum + line.qty, 0), [cartLines])

  const totals = useMemo(() => {
    const subtotal = cartLines.reduce((sum, line) => sum + line.product.price * line.qty, 0)
    const shipping =
      subtotal === 0 || subtotal >= SITE.freeShippingThreshold ? 0 : SITE.standardShipping
    const tax = Math.round(subtotal * SITE.taxRate * 100) / 100
    const total = Math.round((subtotal + shipping + tax) * 100) / 100
    const remainingForFreeShipping = Math.max(0, SITE.freeShippingThreshold - subtotal)
    return { subtotal, shipping, tax, total, remainingForFreeShipping }
  }, [cartLines])

  /* ---------------- wishlist ---------------- */

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist])

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        if (prev.includes(product.id)) {
          notify(t('store.removedFromWishlist', { name: product.name }))
          return prev.filter((id) => id !== product.id)
        }
        notify(t('store.savedToWishlist', { name: product.name }))
        return [...prev, product.id]
      })
    },
    [notify, t],
  )

  const wishlistProducts = useMemo(
    () => wishlist.map((id) => getProduct(id)).filter(Boolean),
    [wishlist, getProduct],
  )

  /* ---------------- recently viewed ---------------- */

  const markViewed = useCallback((productId) => {
    setRecent((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 4))
  }, [])

  const recentProducts = useMemo(
    () => recent.map((id) => getProduct(id)).filter(Boolean),
    [recent, getProduct],
  )

  const value = useMemo(
    () => ({
      products: PRODUCTS,
      cart,
      cartLines,
      cartCount,
      totals,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      wishlist,
      wishlistProducts,
      isWishlisted,
      toggleWishlist,
      recentProducts,
      markViewed,
      toast,
      notify,
    }),
    [
      PRODUCTS,
      cart,
      cartLines,
      cartCount,
      totals,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      wishlist,
      wishlistProducts,
      isWishlisted,
      toggleWishlist,
      recentProducts,
      markViewed,
      toast,
      notify,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}
