import { FAQS } from '../data/content.js'
import Accordion from '../components/ui/Accordion.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Link } from 'react-router-dom'

export default function Faq() {
  return (
    <>
      <PageHeader
        eyebrow="Help centre"
        title="Frequently Asked Questions"
        intro="Shipping, returns, materials, product care and ordering — answered in plain language."
      />

      <div className="shell py-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">On this page</p>
            <ul className="mt-4 space-y-2">
              {FAQS.map((group) => (
                <li key={group.group}>
                  <a
                    href={`#faq-${group.group.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-[13.5px] text-ink-2 transition-colors hover:text-accent"
                  >
                    {group.group}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {FAQS.map((group) => (
              <section
                key={group.group}
                id={`faq-${group.group.toLowerCase().replace(/\s+/g, '-')}`}
                aria-labelledby={`faq-heading-${group.group.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <h2
                  id={`faq-heading-${group.group.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-[20px] sm:text-[23px]"
                >
                  {group.group}
                </h2>
                <Accordion
                  className="mt-4"
                  defaultOpen={0}
                  items={group.items.map((item) => ({ question: item.q, answer: item.a }))}
                />
              </section>
            ))}

            <section className="border border-line bg-white p-7">
              <h2 className="text-[18px]">Still need help?</h2>
              <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-ink-2">
                Our customer care team answers every message within one working day.
              </p>
              <Link to="/contact" className="btn btn-primary mt-5">
                Contact us
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
