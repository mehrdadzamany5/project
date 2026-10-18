import { useRef, useState } from 'react'
import { P } from '../../data/images.js'
import { isValidEmail } from '../../lib/format.js'
import { Icon } from '../ui/Icons.jsx'
import Reveal from '../ui/Reveal.jsx'
import { Photo } from '../ui/SmartImage.jsx'
import { InfoNotice } from '../ui/StateBlocks.jsx'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError] = useState('')
  const submitted = useRef(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    if (!isValidEmail(email)) {
      setStatus('error')
      setError('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setError('')

    // No mailing-list integration is connected in this environment. The form
    // simulates the round trip so the states are real, but nothing is stored —
    // and the confirmation says so rather than implying a saved subscription.
    await new Promise((resolve) => {
      window.setTimeout(resolve, 700)
    })

    submitted.current = true
    setStatus('success')
  }

  return (
    <section className="pb-16 lg:pb-20">
      <div className="shell">
        <Reveal className="relative overflow-hidden bg-sand">
          <div className="grid lg:grid-cols-[1.25fr_1fr]">
            <div className="px-7 py-12 sm:px-10 lg:px-14 lg:py-16">
              <p className="eyebrow text-accent">Newsletter</p>
              <h2 className="mt-3 text-[28px] leading-tight sm:text-[34px]">Join Our Community</h2>
              <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink-2">
                Get exclusive offers, new arrivals and inspiration straight to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 max-w-lg" noValidate>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="flex-1">
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (status === 'error') setStatus('idle')
                      }}
                      placeholder="your@email.com"
                      autoComplete="email"
                      aria-invalid={status === 'error'}
                      aria-describedby="newsletter-message"
                      disabled={status === 'submitting' || status === 'success'}
                      className="field h-12 bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary h-12 px-7"
                    disabled={status === 'submitting' || status === 'success'}
                  >
                    {status === 'submitting' ? 'Subscribing…' : status === 'success' ? 'Subscribed' : 'Subscribe'}
                  </button>
                </div>

                <div id="newsletter-message" aria-live="polite" className="mt-3 min-h-[20px]">
                  {status === 'error' ? (
                    <p className="flex items-center gap-2 text-[12.5px] text-[#B4523F]">
                      <Icon name="close" size={14} strokeWidth={1.8} />
                      {error}
                    </p>
                  ) : null}
                  {status === 'success' ? (
                    <p className="flex items-start gap-2 text-[12.5px] text-olive">
                      <Icon name="check" size={14} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                      Thank you. This form is not yet connected to a mailing list, so no address has
                      been stored.
                    </p>
                  ) : null}
                </div>
              </form>

              <InfoNotice className="mt-6 max-w-lg">
                To go live, connect an email provider and store subscriptions server-side — this
                form currently runs in the browser only.
              </InfoNotice>
            </div>

            <div className="relative hidden min-h-[320px] lg:block">
              <Photo
                id={P.newsletterPlant}
                alt="Console table styled with plants in soft daylight"
                sizes="(min-width: 1024px) 40vw, 100vw"
                widths={[600, 900]}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
