import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { JOURNAL, JOURNAL_CATEGORIES } from '../data/content.js'
import { formatDate } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { Photo } from '../components/ui/SmartImage.jsx'
import { EmptyState } from '../components/ui/StateBlocks.jsx'
import { Icon } from '../components/ui/Icons.jsx'

export default function Journal() {
  const [category, setCategory] = useState('All')

  const articles = useMemo(
    () => (category === 'All' ? JOURNAL : JOURNAL.filter((article) => article.category === category)),
    [category],
  )

  const chips = ['All', ...JOURNAL_CATEGORIES]

  return (
    <>
      <PageHeader
        eyebrow="Inspiration"
        title="The Journal"
        intro="Styling ideas, care guides and honest notes on sustainable furniture — written by the people who make and use it."
      />

      <div className="shell py-10 lg:py-14">
        <div
          role="group"
          aria-label="Filter articles by category"
          className="no-scrollbar flex gap-2 overflow-x-auto pb-2"
        >
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setCategory(chip)}
              aria-pressed={category === chip}
              className={`shrink-0 border px-4 py-2 text-[12.5px] transition-colors ${
                category === chip
                  ? 'border-accent bg-accent text-white'
                  : 'border-line bg-white text-ink-2 hover:border-accent hover:text-accent'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="mt-10">
            <EmptyState
              icon="grid"
              title="No articles in this category yet"
              text="Try another category to keep reading."
              actionLabel="Show all articles"
              onAction={() => setCategory('All')}
            />
          </div>
        ) : (
          <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Reveal as="li" key={article.slug} delay={index * 55}>
                <article className="group h-full">
                  <Link to={`/journal/${article.slug}`} className="block">
                    <div className="img-box overflow-hidden">
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <Photo
                          id={article.image}
                          alt={article.alt}
                          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                          widths={[480, 800, 1200]}
                          priority={index < 3}
                          className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                    <div className="pt-5">
                      <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-3">
                        <span className="text-accent">{article.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </p>
                      <h2 className="mt-3 text-[19px] leading-snug transition-colors group-hover:text-accent">
                        {article.title}
                      </h2>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
                        {article.excerpt}
                      </p>
                      <p className="mt-4 text-[11.5px] text-ink-3">{formatDate(article.date)}</p>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        )}

        <div className="mt-16 border-t border-line pt-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
          >
            Shop the collection
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </div>
    </>
  )
}
