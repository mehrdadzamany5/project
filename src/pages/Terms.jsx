import { useContent } from '../i18n/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import PolicySections from '../components/PolicySections.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

export default function Terms() {
  const { POLICY_DRAFT_NOTICE, TERMS_SECTIONS } = useContent()
  const { t } = useLang()

  return (
    <>
      <PageHeader eyebrow={t('terms.eyebrow')} title={t('terms.title')} intro={t('terms.intro')} />

      <div className="shell py-10 lg:py-14">
        <InfoNotice tone="draft" className="mb-12 max-w-3xl">
          {POLICY_DRAFT_NOTICE}
        </InfoNotice>
        <PolicySections sections={TERMS_SECTIONS} idPrefix="terms" />
      </div>
    </>
  )
}
