import { Link } from 'react-router-dom'
import { POLICY_DRAFT_NOTICE, RETURNS_POLICY, SHIPPING_POLICY } from '../data/content.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import PolicySections from '../components/PolicySections.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

export default function ShippingReturns() {
  return (
    <>
      <PageHeader
        eyebrow="Customer care"
        title="Shipping & Returns"
        intro="How your order travels, what it costs, and how to send something back if it is not right."
      />

      <div className="shell py-10 lg:py-14">
        <InfoNotice tone="draft" className="mb-12 max-w-3xl">
          {POLICY_DRAFT_NOTICE}
        </InfoNotice>

        <section id="shipping" aria-labelledby="shipping-heading">
          <h2 id="shipping-heading" className="text-[24px] sm:text-[28px]">
            Shipping
          </h2>
          <div className="mt-8">
            <PolicySections sections={SHIPPING_POLICY} idPrefix="shipping" />
          </div>
        </section>

        <section id="returns" aria-labelledby="returns-heading" className="mt-16 border-t border-line pt-14">
          <h2 id="returns-heading" className="text-[24px] sm:text-[28px]">
            Returns &amp; exchanges
          </h2>
          <div className="mt-8">
            <PolicySections sections={RETURNS_POLICY} idPrefix="returns" />
          </div>
        </section>

        <div className="mt-16 border border-line bg-white p-7">
          <h2 className="text-[18px]">Need to start a return?</h2>
          <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-ink-2">
            Order-based self-service returns require an orders backend, which is not connected yet.
            Until then, message our care team and we will arrange collection.
          </p>
          <Link to="/contact" className="btn btn-primary mt-5">
            Contact customer care
          </Link>
        </div>
      </div>
    </>
  )
}
