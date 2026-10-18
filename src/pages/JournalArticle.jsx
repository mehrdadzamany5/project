import { Link, useParams } from 'react-router-dom'
import { JOURNAL, getArticle } from '../data/content.js'
import { formatDate } from '../lib/format.js'
import { Icon } from '../components/ui/Icons.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { Photo } from '../components/ui/SmartImage.jsx'
import { Breadcrumbs } from '../components/ui/StateBlocks.jsx'
import NotFound from './NotFound.jsx'

export default function JournalArticle() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) return <NotFound />

  const more = JOURNAL.filter((entry) => entry.slug !== article.slug).slice(0, 3)

  return (
    <>
      <article>
        <div className="relative h-[320px] overflow-hidden bg-sand sm:h-[420px] lg:h-[480px]">
          <Photo
            id={article.image}
            alt={article.alt}
            priority
            sizes="100vw"
            widths={[800, 1200, 1600]}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/5"
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-10">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-white/80">
                <span>{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </p>
              <h1 className="mt-3 max-w-3xl text-[28px] text-white sm:text-[36px] lg:text-[42px]">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="shell py-10 lg:py-14">
          <Breadcrumbs
            items={[
              { label: 'Home', to: '/' },
              { label: 'Journal', to: '/journal' },
              { label: article.category },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1fr_240px] lg:gap-16">
            <div className="max-w-2xl">
              <p className="text-[11.5px] text-ink-3">{formatDate(article.date)}</p>
              <p className="mt-6 font-display text-[19px] leading-relaxed text-ink sm:text-[21px]">
                {article.excerpt}
              </p>
              <div className="mt-8 space-y-5">
                {article.body.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-[1.8] text-ink-2">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside className="lg:pt-2">
              <div className="sticky top-24 border border-line bg-white p-6">
                <p className="eyebrow">In this journal</p>
                <p className="mt-3 text-[13px] leading-relaxed text-ink-2">
                  Practical notes on materials, styling and looking after furniture properly.
                </p>
                <Link to="/journal" className="btn btn-quiet mt-5 w-full">
                  All articles
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {more.length > 0 ? (
        <section className="border-t border-line bg-sand/50 py-14">
          <div className="shell">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-[22px] sm:text-[26px]">Keep reading</h2>
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
              >
                View all
                <Icon name="arrow-right" size={15} />
              </Link>
            </div>

            <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-3">
              {more.map((entry, index) => (
                <Reveal as="li" key={entry.slug} delay={index * 60}>
                  <Link to={`/journal/${entry.slug}`} className="group block">
                    <div className="img-box overflow-hidden">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <Photo
                          id={entry.image}
                          alt={entry.alt}
                          sizes="(min-width: 640px) 32vw, 100vw"
                          widths={[400, 640, 900]}
                          className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                    <h3 className="mt-4 text-[16px] leading-snug transition-colors group-hover:text-accent">
                      {entry.title}
                    </h3>
                    <p className="mt-1.5 text-[11.5px] text-ink-3">
                      {entry.category} · {entry.readTime}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  )
}
