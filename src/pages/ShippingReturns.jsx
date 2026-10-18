import { Link } from 'react-router-dom'
import { useContent } from '../i18n/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import PolicySections from '../components/PolicySections.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

export default function ShippingReturns() {
  const { POLICY_DRAFT_NOTICE, RETURNS_POLICY, SHIPPING_POLICY } = useContent()
  const { t } = useLang()

  return (
    <>
      <PageHeader
        eyebrow={t('shipping.eyebrow')}
        title={t('shipping.title')}
        intro={t('shipping.intro')}
      />

      <div className="shell py-10 lg:py-14">
        <InfoNotice tone="draft" className="mb-12 max-w-3xl">
          {POLICY_DRAFT_NOTICE}
        </InfoNotice>

        <section id="shipping" aria-labelledby="shipping-heading">
          <h2 id="shipping-heading" className="text-[24px] sm:text-[28px]">
            {t('shipping.heading')}
          </h2>
          <div className="mt-8">
            <PolicySections sections={SHIPPING_POLICY} idPrefix="shipping" />
          </div>
        </section>

        <section id="returns" aria-labelledby="returns-heading" className="mt-16 border-t border-line pt-14">
          <h2 id="returns-heading" className="text-[24px] sm:text-[28px]">
            {t('shipping.returnsHeading')}
          </h2>
          <div className="mt-8">
            <PolicySections sections={RETURNS_POLICY} idPrefix="returns" />
          </div>
        </section>

        <div className="mt-16 border border-line bg-white p-7">
          <h2 className="text-[18px]">{t('shipping.startTitle')}</h2>
          <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-ink-2">
            {t('shipping.startText')}
          </p>
          <Link to="/contact" className="btn btn-primary mt-5">
            {t('shipping.contactCare')}
          </Link>
        </div>
      </div>
    </>
  )
}
