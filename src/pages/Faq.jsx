import { Link } from 'react-router-dom'
import { useContent } from '../i18n/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'

export default function Faq() {
  const { FAQS } = useContent()
  const { t } = useLang()

  return (
    <>
      <PageHeader eyebrow={t('faq.eyebrow')} title={t('faq.title')} intro={t('faq.intro')} />

      <div className="shell py-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <nav aria-label={t('faq.sectionsAria')} className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow">{t('faq.onThisPage')}</p>
            <ul className="mt-4 space-y-2">
              {FAQS.map((group, index) => (
                <li key={group.group}>
                  <a
                    href={`#faq-group-${index + 1}`}
                    className="text-[13.5px] text-ink-2 transition-colors hover:text-accent"
                  >
                    {group.group}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {FAQS.map((group, index) => (
              <section
                key={group.group}
                id={`faq-group-${index + 1}`}
                aria-labelledby={`faq-heading-${index + 1}`}
              >
                <h2 id={`faq-heading-${index + 1}`} className="text-[20px] sm:text-[23px]">
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
              <h2 className="text-[18px]">{t('faq.stillNeedHelp')}</h2>
              <p className="mt-2 max-w-lg text-[13.5px] leading-relaxed text-ink-2">
                {t('faq.helpText')}
              </p>
              <Link to="/contact" className="btn btn-primary mt-5">
                {t('faq.contactUs')}
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
