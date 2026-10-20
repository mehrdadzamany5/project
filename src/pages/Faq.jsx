import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import Notice from '../components/ui/Notice.jsx'
import { Link } from 'react-router-dom'
import { FAQ_GROUPS } from '../data/faq.js'

export default function Faq() {
  return (
    <>
      <PageHeader
        eyebrow="Questions"
        title="Booking, check-in and payment"
        intro="Everything guests ask us before they arrive. If your question is not here, the retreat will answer it directly."
      />

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 className="label text-muted">Contents</h2>
                <ul className="mt-5 space-y-3">
                  {FAQ_GROUPS.map((group) => (
                    <li key={group.title}>
                      <a
                        href={`#${group.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                        className="text-[14px] text-black transition-colors duration-300 hover:text-bronze"
                      >
                        {group.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <Notice tone="info" className="mt-8">
                  No booking system or payment provider is connected yet, so answers about payment
                  describe the intended behaviour.
                </Notice>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-14">
                {FAQ_GROUPS.map((group) => (
                  <section
                    key={group.title}
                    id={group.title.toLowerCase().replace(/[^a-z]+/g, '-')}
                    className="scroll-mt-28"
                  >
                    <h2 className="mb-6 text-[19px] font-medium uppercase tracking-wide2 text-black">
                      {group.title}
                    </h2>
                    <Accordion items={group.items} />
                  </section>
                ))}
              </div>

              <div className="mt-16 border border-line bg-white p-8">
                <h2 className="text-[18px] font-medium text-black">Still unsure?</h2>
                <p className="mt-3 max-w-lg text-[14px] leading-[1.85] text-muted">
                  Send a question and the retreat will reply. Contact details are configured by the
                  operator and appear on the contact page once they are set.
                </p>
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center justify-center border border-black/25 px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white"
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
