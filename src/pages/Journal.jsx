import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Img from '../components/ui/Img.jsx'
import { ARTICLES } from '../data/journal.js'
import { formatDate } from '../lib/format.js'

export default function Journal() {
  const [lead, ...rest] = ARTICLES

  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="The Kegali journal"
        intro="Field notes from the retreat and the landscape around it: fires, water, the ridge and the people who built the houses."
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container wide>
          <article className="group grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Link to={`/journal/${lead.slug}`} className="block">
                <Img
                  src={lead.image.src}
                  alt={lead.image.alt}
                  className="aspect-[16/10] w-full"
                  priority
                  imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <p className="label text-bronze">Latest</p>
              <h2 className="mt-4 text-[24px] font-medium uppercase leading-[1.3] tracking-wide2 text-black sm:text-[28px]">
                <Link to={`/journal/${lead.slug}`} className="transition-colors duration-300 hover:text-bronze">
                  {lead.title}
                </Link>
              </h2>
              <div className="mt-4 flex items-center gap-3 text-[12px] text-muted">
                <time dateTime={lead.date}>{formatDate(lead.date)}</time>
                <span aria-hidden="true" className="h-px w-4 bg-line" />
                <span>{lead.readingTime} read</span>
              </div>
              <p className="mt-5 max-w-md text-[15px] leading-[1.9] text-muted">{lead.excerpt}</p>
              <Link
                to={`/journal/${lead.slug}`}
                className="label mt-7 inline-flex items-center gap-2 text-black transition-colors duration-300 hover:text-bronze"
              >
                Read article <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>

          <ul className="mt-20 grid gap-10 border-t border-line pt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {rest.map((article) => (
              <li key={article.slug} className="group">
                <Link to={`/journal/${article.slug}`} className="block">
                  <Img
                    src={article.image.src}
                    alt={article.image.alt}
                    className="aspect-[4/3] w-full"
                    imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 32vw"
                  />
                  <div className="mt-5 flex items-center gap-3 text-[12px] text-muted">
                    <time dateTime={article.date}>{formatDate(article.date)}</time>
                    <span aria-hidden="true" className="h-px w-4 bg-line" />
                    <span>{article.readingTime} read</span>
                  </div>
                  <h2 className="mt-3 text-[18px] font-medium leading-[1.4] text-black transition-colors duration-300 group-hover:text-bronze">
                    {article.title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-[1.85] text-muted">{article.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
