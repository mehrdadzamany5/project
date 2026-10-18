import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { translate } from './ui.js'

/**
 * Language is kept in its own context (and its own storage key) so switching
 * language never touches the cart, wishlist or recently-viewed state held by
 * StoreContext. English is the default and the fallback for every lookup.
 */

export const LANG_KEY = 'nordic-living.lang.v1'
export const LANGS = ['en', 'fa']

const LanguageContext = createContext(null)

function readLang() {
  try {
    const raw = window.localStorage.getItem(LANG_KEY)
    return raw === 'fa' ? 'fa' : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readLang)

  useEffect(() => {
    try {
      window.localStorage.setItem(LANG_KEY, lang)
    } catch {
      /* storage unavailable — language simply resets on the next visit */
    }
    const root = document.documentElement
    root.setAttribute('lang', lang)
    root.setAttribute('dir', lang === 'fa' ? 'rtl' : 'ltr')
    root.setAttribute('data-lang', lang)
  }, [lang])

  const setLang = useCallback((next) => {
    setLangState(next === 'fa' ? 'fa' : 'en')
  }, [])

  const t = useCallback((key, vars) => translate(lang, key, vars), [lang])

  const value = useMemo(
    () => ({
      lang,
      isRtl: lang === 'fa',
      dir: lang === 'fa' ? 'rtl' : 'ltr',
      setLang,
      t,
    }),
    [lang, setLang, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>')
  return ctx
}
