import { useState } from 'react'
import { SITE } from '../data/content.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { isValidEmail } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | done

  const set = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = t('contact.errName')
    if (!isValidEmail(form.email)) next.email = t('contact.errEmail')
    if (!form.subject.trim()) next.subject = t('contact.errSubject')
    if (form.message.trim().length < 10) next.message = t('contact.errMessage')
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('submitting')
    window.setTimeout(() => setStatus('done'), 600)
  }

  return (
    <>
      <PageHeader
        eyebrow={t('contact.eyebrow')}
        title={t('contact.title')}
        intro={t('contact.intro')}
      />

      <div className="shell py-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            {status === 'done' ? (
              <div className="border border-line bg-white p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive/15 text-olive">
                  <Icon name="check" size={20} strokeWidth={1.8} />
                </span>
                <h2 className="mt-5 text-[20px]">{t('contact.doneTitle')}</h2>
                <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-ink-2">
                  {t('contact.doneText', { name: form.name.split(' ')[0] || '' })}
                </p>
                <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-ink-2">
                  {t('contact.doneText2')}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY)
                    setStatus('idle')
                  }}
                  className="btn btn-outline mt-7"
                >
                  {t('contact.writeAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="label">
                      {t('contact.name')}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(event) => set('name')(event.target.value)}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className="field"
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="mt-1.5 text-[12px] text-[#B4523F]">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="label">
                      {t('contact.email')}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(event) => set('email')(event.target.value)}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className="field"
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="mt-1.5 text-[12px] text-[#B4523F]">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-subject" className="label">
                      {t('contact.subject')}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={form.subject}
                      onChange={(event) => set('subject')(event.target.value)}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className="field"
                    />
                    {errors.subject ? (
                      <p id="contact-subject-error" className="mt-1.5 text-[12px] text-[#B4523F]">
                        {errors.subject}
                      </p>
                    ) : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="contact-message" className="label">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={6}
                      value={form.message}
                      onChange={(event) => set('message')(event.target.value)}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className="field resize-y"
                    />
                    {errors.message ? (
                      <p id="contact-message-error" className="mt-1.5 text-[12px] text-[#B4523F]">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-7 h-12 px-8"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? t('contact.sending') : t('contact.send')}
                </button>
              </form>
            )}
          </div>

          <aside aria-label={t('contact.customerCare')}>
            <div className="border border-line bg-white p-6">
              <h2 className="text-[16px] font-semibold">{t('contact.customerCare')}</h2>

              <dl className="mt-5 space-y-5 text-[13.5px]">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-3">
                    {t('contact.email')}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${SITE.contact.email}`}
                      className="text-ink transition-colors hover:text-accent"
                    >
                      {SITE.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-3">
                    {t('contact.phone')}
                  </dt>
                  <dd className="mt-1 text-ink-3">{SITE.contact.phone || t('contact.phoneMissing')}</dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-3">
                    {t('contact.address')}
                  </dt>
                  <dd className="mt-1 text-ink-3">
                    {SITE.contact.address || t('contact.addressMissing')}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-3">
                    {t('contact.hours')}
                  </dt>
                  <dd className="mt-1 text-ink-2">{t('contact.hoursValue')}</dd>
                </div>
              </dl>
            </div>

            <InfoNotice className="mt-5">{t('contact.emailNotice')}</InfoNotice>
          </aside>
        </div>
      </div>
    </>
  )
}
