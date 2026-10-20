import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Notice from '../components/ui/Notice.jsx'
import { POLICIES } from '../data/policies.js'

export default function Policies() {
  return (
    <>
      <PageHeader
        eyebrow="Policies"
        title="Terms, privacy and cancellation"
        intro="The policies below are the documents that will govern a stay at Kegali. None of them has been supplied by the retreat yet, so each is marked as a draft."
      />

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <Notice tone="draft" title="Draft content — requires review" className="mb-12">
            These pages are placeholders written to show the structure. They are not legal terms and must
            be replaced with the operator’s reviewed policy text before this site goes live.
          </Notice>

          <ul className="divide-y divide-line border-y border-line">
            {POLICIES.map((policy) => (
              <li key={policy.slug}>
                <Link
                  to={`/policies/${policy.slug}`}
                  className="group flex items-center justify-between gap-6 py-7"
                >
                  <span>
                    <span className="block text-[18px] font-medium text-black transition-colors duration-300 group-hover:text-bronze">
                      {policy.title}
                    </span>
                    <span className="mt-2 block text-[13px] text-muted">
                      {policy.sections.length} sections · {policy.status === 'draft' ? 'Draft' : 'Published'}
                    </span>
                  </span>
                  <span aria-hidden="true" className="text-bronze transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
