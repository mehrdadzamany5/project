import { Link, useParams } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import Img from '../components/ui/Img.jsx'
import { ARTICLES, getArticle } from '../data/journal.js'
import { formatDate } from '../lib/format.js'
import NotFound from './NotFound.jsx'

export default function JournalArticle() {
  const { slug } = useParams()
  const article = getArticle(slug)

  if (!article) return <NotFound />

  const more = ARTICLES.filter((item) => item.slug !== article.slug).slice(0, 2)

  return (
    <>
      <header className="bg-black pb-14 pt-[calc(var(--header-height)+56px)] text-white sm:pb-16 sm:pt-[calc(var(--header-height)+72px)]">
        <Container>
          <Link
            to="/journal"
            className="label mb-8 inline-flex items-center gap-2 text-white/60 transition-colors duration-300 hover:text-white"
          >
            <span aria-hidden="true">←</span> Explore
          </Link>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[12px] text-white/55">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true" className="h-px w-4 bg-white/25" />
              <span>{article.readingTime} read</span>
            </div>
            <h1 className="mt-5 text-[28px] font-medium uppercase leading-[1.2] tracking-wide2 sm:text-[38px] lg:text-[44px]">
              {article.title}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-white/70">{article.excerpt}</p>
          </div>
        </Container>
      </header>

      <div className="bg-paper">
        <Container wide className="-mt-0">
          <Img
            src={article.image.src}
            alt={article.image.alt}
            className="-mt-10 aspect-[16/9] w-full sm:-mt-14"
            priority
            sizes="100vw"
          />
        </Container>
      </div>

      <article className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            {article.body.map((block, index) =>
              block.type === 'h' ? (
                <h2
                  key={`${block.text}-${index}`}
                  className="mt-12 text-[18px] font-medium uppercase tracking-wide2 text-black"
                >
                  {block.text}
                </h2>
              ) : (
                <p key={`${block.text.slice(0, 24)}-${index}`} className="mt-6 text-[16px] leading-[1.95] text-muted">
                  {block.text}
                </p>
              ),
            )}
          </div>
        </Container>
      </article>

      {more.length ? (
        <section className="bg-white py-16 sm:py-20">
          <Container wide>
            <h2 className="text-[20px] font-medium uppercase tracking-wide2 text-black">More from the journal</h2>
            <ul className="mt-10 grid gap-10 sm:grid-cols-2">
              {more.map((item) => (
                <li key={item.slug} className="group">
                  <Link to={`/journal/${item.slug}`} className="block">
                    <Img
                      src={item.image.src}
                      alt={item.image.alt}
                      className="aspect-[16/10] w-full"
                      imgClassName="transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, 48vw"
                    />
                    <h3 className="mt-5 text-[18px] font-medium leading-[1.4] text-black transition-colors duration-300 group-hover:text-bronze">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.85] text-muted">{item.excerpt}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}
    </>
  )
}
