import { Link } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import Img from '../ui/Img.jsx'
import { ARTICLES } from '../../data/journal.js'
import { formatDate } from '../../lib/format.js'

export default function JournalPreview() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <Container wide>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="label mb-5 flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-bronze" aria-hidden="true" />
              Journal
            </span>
            <h2 className="text-[26px] font-medium uppercase leading-[1.25] tracking-wide2 text-black sm:text-[32px]">
              Explore the surroundings
            </h2>
          </div>
          <Link
            to="/journal"
            className="label self-start text-black/60 transition-colors duration-300 hover:text-bronze sm:self-auto"
          >
            All stories
          </Link>
        </div>

        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {ARTICLES.map((article) => (
            <li key={article.slug} className="group">
              <Link to={`/journal/${article.slug}`} className="block focus-visible:outline-none">
                <Img
                  src={article.image.src}
                  alt={article.image.alt}
                  className="aspect-[4/3] w-full"
                  imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
                />
                <div className="mt-5 flex items-center gap-3 text-[12px] text-muted">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span aria-hidden="true" className="h-px w-4 bg-line" />
                  <span>{article.readingTime} read</span>
                </div>
                <h3 className="mt-3 text-[18px] font-medium leading-[1.4] text-black transition-colors duration-300 group-hover:text-bronze">
                  {article.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.85] text-muted">{article.excerpt}</p>
              </Link>
              <Link
                to={`/journal/${article.slug}`}
                className="label mt-5 inline-flex items-center gap-2 text-black/70 transition-colors duration-300 hover:text-bronze"
              >
                Read article
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex justify-center">
          <Link
            to="/journal"
            className="inline-flex items-center justify-center border border-black/30 px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 ease-editorial hover:bg-black hover:text-white"
          >
            View all stories
          </Link>
        </div>
      </Container>
    </section>
  )
}
