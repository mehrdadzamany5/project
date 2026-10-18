import { POLICY_DRAFT_NOTICE, PRIVACY_SECTIONS } from '../data/content.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import PolicySections from '../components/PolicySections.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

export default function Privacy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        intro="What we collect, why we collect it, and how you can ask us to remove it."
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
