import { useState } from 'react'
import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Field, { inputClass } from '../components/ui/Field.jsx'
import Notice from '../components/ui/Notice.jsx'
import { CONTACT, SITE } from '../data/site.js'
import { validateEmail } from '../lib/booking.js'
import { saveContactMessage } from '../lib/store.js'

const TOPICS = ['A question about a stay', 'Availability', 'Groups and events', 'Press', 'Something else']

const EMPTY = { name: '', email: '', topic: TOPICS[0], message: '' }

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (key) => (event) => {
    setValues((current) => ({ ...current, [key]: event.target.value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
    if (status !== 'idle') setStatus('idle')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Enter your name.'
    const emailError = validateEmail(values.email)
    if (emailError) nextErrors.email = emailError
    if (!values.message.trim()) nextErrors.message = 'Tell us how we can help.'
    else if (values.message.trim().length < 10) nextErrors.message = 'Please add a little more detail.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      saveContactMessage({ ...values })
      setStatus('success')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const hasContact = Boolean(CONTACT.email || CONTACT.phone || CONTACT.addressLines)

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Ask us anything"
        intro="Questions about a room, the lake, the walk or a group stay — send a note and we will answer."
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              {status === 'success' ? (
                <div className="border border-line bg-white p-8">
                  <p className="label text-bronze">Message recorded</p>
                  <h2 className="mt-4 text-[20px] font-medium text-black">Thank you — that came through.</h2>
                  <p className="mt-4 max-w-md text-[14px] leading-[1.85] text-muted">
                    In this demonstration build the message was saved in your own browser. Nothing was
                    transmitted, because no backend is connected yet. Once one is, this form will deliver
                    straight to the retreat.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-7 inline-flex items-center justify-center border border-black/25 px-7 py-3.5 text-[11px] font-medium uppercase tracking-label text-black transition-colors duration-300 hover:bg-black hover:text-white"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-6">
                  <h2 className="text-[20px] font-medium uppercase tracking-wide2 text-black">Send a message</h2>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Your name" required error={errors.name}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="name"
                          autoComplete="name"
                          value={values.name}
                          onChange={set('name')}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? describedBy : undefined}
                          className={inputClass(Boolean(errors.name))}
                        />
                      )}
                    </Field>

                    <Field label="Email" required error={errors.email}>
                      {({ id, describedBy }) => (
                        <input
                          id={id}
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={set('email')}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? describedBy : undefined}
                          className={inputClass(Boolean(errors.email))}
                        />
                      )}
                    </Field>
                  </div>

                  <Field label="What is it about?">
                    {({ id }) => (
                      <select id={id} name="topic" value={values.topic} onChange={set('topic')} className={inputClass(false)}>
                        {TOPICS.map((topic) => (
                          <option key={topic}>{topic}</option>
                        ))}
                      </select>
                    )}
                  </Field>

                  <Field label="Message" required error={errors.message}>
                    {({ id, describedBy }) => (
                      <textarea
                        id={id}
                        name="message"
                        rows={6}
                        value={values.message}
                        onChange={set('message')}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={errors.message ? describedBy : undefined}
                        className={`${inputClass(Boolean(errors.message))} resize-y`}
                      />
                    )}
                  </Field>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center bg-black px-8 py-3.5 text-[11px] font-medium uppercase tracking-label text-white transition-colors duration-300 ease-editorial hover:bg-forest disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Send message'}
                    </button>
                    <p className="text-[12px] text-muted">
                      Fields marked <span aria-hidden="true">*</span> are required.
                    </p>
                  </div>

                  {status === 'error' && Object.keys(errors).length === 0 ? (
                    <Notice tone="draft">Something went wrong saving the message. Please try again.</Notice>
                  ) : null}
                </form>
              )}
            </div>

            <aside className="lg:col-span-5 lg:pl-8">
              <div className="border border-line bg-white p-7">
                <h2 className="label text-muted">Direct contact</h2>
                {hasContact ? (
                  <address className="mt-5 space-y-2 text-[14px] not-italic text-black">
                    {CONTACT.addressLines?.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    {CONTACT.email ? (
                      <a href={`mailto:${CONTACT.email}`} className="block hover:text-bronze">
                        {CONTACT.email}
                      </a>
                    ) : null}
                    {CONTACT.phone ? (
                      <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="block hover:text-bronze">
                        {CONTACT.phone}
                      </a>
                    ) : null}
                  </address>
                ) : (
                  <p className="mt-5 text-[14px] leading-[1.85] text-muted">
                    No email address, phone number or postal address has been configured for {SITE.name} yet.
                    Nothing is invented here — add them in{' '}
                    <code className="text-black/70">src/data/site.js</code> and they appear throughout the
                    site.
                  </p>
                )}

                {CONTACT.responseTime ? (
                  <p className="mt-6 border-t border-line pt-5 text-[13px] text-muted">
                    {CONTACT.responseTime}
                  </p>
                ) : null}
              </div>

              <Notice tone="info" className="mt-6">
                This demonstration build stores form submissions in your browser only. No data leaves your
                device and no message is delivered.
              </Notice>
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
