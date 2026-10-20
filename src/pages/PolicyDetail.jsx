import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Notice from '../components/ui/Notice.jsx'
import NotFound from './NotFound.jsx'
import { POLICIES, getPolicy } from '../data/policies.js'

export default function PolicyDetail() {
  const { slug } = useParams()
  const policy = getPolicy(slug)

  if (!policy) return <NotFound />

  const others = POLICIES.filter((item) => item.slug !== policy.slug)

  return (
    <>
      <PageHeader
        eyebrow={policy.status === 'draft' ? 'Draft policy' : 'Policy'}
        title={policy.title}
        intro={policy.updated ? `Last updated ${policy.updated}.` : 'Not yet reviewed or dated.'}
      />

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              {policy.status === 'draft' ? (
                <Notice tone="draft" title="Draft — requires review" className="mb-10">
                  This document has not been supplied by the retreat. It describes the intended structure
                  only and must not be relied on as a binding term.
                </Notice>
              ) : null}

              <div className="space-y-10">
                {policy.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-[17px] font-medium uppercase tracking-wide2 text-black">
                      {section.heading}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[15px] leading-[1.9] text-muted">{section.body}</p>
                  </section>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 lg:pl-8">
              <div className="border border-line bg-white p-6">
                <h2 className="label text-muted">Other policies</h2>
                <ul className="mt-5 space-y-3">
                  {others.map((item) => (
                    <li key={item.slug}>
                      <Link
                        to={`/policies/${item.slug}`}
                        className="text-[14px] text-black transition-colors duration-300 hover:text-bronze"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/policies"
                  className="label mt-8 inline-flex items-center gap-2 text-black/60 transition-colors duration-300 hover:text-bronze"
                >
                  All policies <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
