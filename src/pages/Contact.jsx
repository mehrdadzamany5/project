import { useState } from 'react'
import { SITE } from '../data/content.js'
import { isValidEmail } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | done

  const set = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!isValidEmail(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) next.subject = 'Please add a subject.'
    if (form.message.trim().length < 10) next.message = 'Please write at least 10 characters.'
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
        eyebrow="Contact"
        title="Talk to Us"
        intro="Questions about a product, a delivery or a trade project — we answer every message within one working day."
      />

      <div className="shell py-10 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          <div>
            {status === 'done' ? (
              <div className="border border-line bg-white p-8">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-olive/15 text-olive">
                  <Icon name="check" size={20} strokeWidth={1.8} />
                </span>
                <h2 className="mt-5 text-[20px]">Message validated</h2>
                <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-ink-2">
                  Thank you, {form.name.split(' ')[0] || 'there'}. Your message is complete and ready
                  to send — but this environment has no contact backend connected, so nothing has
                  been transmitted or stored yet.
                </p>
                <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-ink-2">
                  Connect a form handler or email service to start receiving these submissions.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY)
                    setStatus('idle')
                  }}
                  className="btn btn-outline mt-7"
                >
                  Write another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="label">
                      Name
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
                      Email
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
                      Subject
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
                      Message
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
                  {status === 'submitting' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            )}
          </div>

          <aside aria-label="Contact details">
            <div className="border border-line bg-white p-6">
              <h2 className="text-[16px] font-semibold">Customer care</h2>

              <dl className="mt-5 space-y-5 text-[13.5px]">
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-3">Email</dt>
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
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-3">Phone</dt>
                  <dd className="mt-1 text-ink-3">
                    {SITE.contact.phone || 'Not configured — add your business number in site settings.'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-3">Address</dt>
                  <dd className="mt-1 text-ink-3">
                    {SITE.contact.address || 'Not configured — add your studio address in site settings.'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-[0.14em] text-ink-3">Opening hours</dt>
                  <dd className="mt-1 text-ink-2">{SITE.contact.hours}</dd>
                </div>
              </dl>
            </div>

            <InfoNotice className="mt-5">
              The email above is a placeholder address. Replace it with your real support inbox before
              launch.
            </InfoNotice>
          </aside>
        </div>
      </div>
    </>
  )
}
