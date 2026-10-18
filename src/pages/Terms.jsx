import { POLICY_DRAFT_NOTICE, TERMS_SECTIONS } from '../data/content.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import PolicySections from '../components/PolicySections.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

export default function Terms() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        intro="The terms that apply when you order from Nordic Living."
      />

      <div className="shell py-10 lg:py-14">
        <InfoNotice tone="draft" className="mb-12 max-w-3xl">
          {POLICY_DRAFT_NOTICE}
        </InfoNotice>
        <PolicySections sections={TERMS_SECTIONS} idPrefix="terms" />
      </div>
    </>
  )
}
