import { useContent } from '../i18n/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import PolicySections from '../components/PolicySections.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

export default function Privacy() {
  const { POLICY_DRAFT_NOTICE, PRIVACY_SECTIONS } = useContent()
  const { t } = useLang()

  return (
    <>
      <PageHeader
        eyebrow={t('privacy.eyebrow')}
        title={t('privacy.title')}
        intro={t('privacy.intro')}
      />

      <div className="shell py-10 lg:py-14">
        <InfoNotice tone="draft" className="mb-12 max-w-3xl">
          {POLICY_DRAFT_NOTICE}
        </InfoNotice>
        <PolicySections sections={PRIVACY_SECTIONS} idPrefix="privacy" />
      </div>
    </>
  )
}
