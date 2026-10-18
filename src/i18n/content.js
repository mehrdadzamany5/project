import { useMemo } from 'react'
import * as base from '../data/content.js'
import * as fa from './contentFa.js'
import { useLang } from './LanguageContext.jsx'

/**
 * Editorial content bundle. English is the original `data/content.js` (plus the
 * few page-level arrays that used to live inline); Persian is its translated
 * mirror in `contentFa.js`. Components read the active bundle through
 * `useContent()` so no page is duplicated per language.
 */

const ABOUT_PRINCIPLES = [
  {
    title: 'Honest materials',
    text: 'Solid timber, natural fibres and stone. Nothing veneered to look like something it is not.',
  },
  {
    title: 'Repairable by design',
    text: 'Bolted joinery, replaceable covers and finishes that can be refreshed at home rather than replaced.',
  },
  {
    title: 'Quiet proportions',
    text: 'Low, generous and unfussy — furniture that leaves the room feeling larger, not busier.',
  },
]

export const CONTENT = {
  en: { ...base, ABOUT_PRINCIPLES },
  fa,
}

export function useContent() {
  const { lang } = useLang()
  return useMemo(() => (lang === 'fa' ? CONTENT.fa : CONTENT.en), [lang])
}
