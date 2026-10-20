import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT, FOOTER_LINKS, FOOTER_SECONDARY, SITE, SOCIAL_LINKS } from '../../data/site.js'
import { validateEmail } from '../../lib/booking.js'
import { saveNewsletterSubscriber } from '../../lib/store.js'
import Logo from '../ui/Logo.jsx'
import SocialLinks from '../ui/SocialLinks.jsx'
import Container from '../ui/Container.jsx'

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    if (status === 'loading') return

    const error = validateEmail(email)
    if (error) {
      setStatus('error')
      setMessage(error)
      return
    }

    setStatus('loading')
    setMessage('')
    try {
      const { alreadySubscribed } = saveNewsletterSubscriber(email.trim())
      setStatus('success')
      setMessage(
        alreadySubscribed
          ? 'You are already on the list.'
          : 'Thank you — you are on the list.',
      )
      setEmail('')
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="mt-5">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex border border-white/25 focus-within:border-white/60">
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (status !== 'loading') {
              setStatus('idle')
              setMessage('')
            }
          }}
          aria-invalid={status === 'error'}
          aria-describedby="newsletter-message"
          placeholder="Your email address"
          className="min-w-0 flex-1 bg-transparent px-3.5 py-3 text-[13px] text-white placeholder:text-white/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 border-l border-white/25 px-4 text-[10px] font-medium uppercase tracking-label text-white transition-colors duration-300 hover:bg-white hover:text-black disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending…' : 'Subscribe'}
        </button>
      </div>
      <p
        id="newsletter-message"
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-[18px] text-[12px] ${
          status === 'error' ? 'text-bronze' : 'text-white/60'
        }`}
      >
        {message}
      </p>
      <p className="text-[11px] leading-[1.7] text-white/35">
        Demonstration build — sign-ups are stored in this browser only.
      </p>
    </form>
  )
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h2 className="label text-white/45">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              className="text-[13px] text-white/75 transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const hasContact = Boolean(CONTACT.email || CONTACT.phone || CONTACT.addressLines)

  return (
    <footer className="bg-black text-white">
      <Container wide className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-[13px] leading-[1.85] text-white/60">
              {SITE.legalName} builds and runs contemporary retreats in working forest. Architecture,
              fire and quiet, held in one place.
            </p>
            {hasContact ? (
              <address className="mt-6 space-y-1 text-[13px] not-italic text-white/60">
                {CONTACT.addressLines?.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                {CONTACT.email ? (
                  <a href={`mailto:${CONTACT.email}`} className="block hover:text-white">
                    {CONTACT.email}
                  </a>
                ) : null}
                {CONTACT.phone ? (
                  <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="block hover:text-white">
                    {CONTACT.phone}
                  </a>
                ) : null}
              </address>
            ) : null}
          </div>

          <div className="lg:col-span-2">
            <FooterColumn title="Homestay" links={FOOTER_LINKS} />
          </div>

          <div className="lg:col-span-3">
            <FooterColumn title="More" links={FOOTER_SECONDARY} />
            <div className="mt-8">
              <h2 className="label text-white/45">Social Network</h2>
              {SOCIAL_LINKS.length ? (
                <SocialLinks links={SOCIAL_LINKS} className="mt-5" />
              ) : (
                <p className="mt-4 max-w-[220px] text-[12px] leading-[1.7] text-white/35">
                  No social profiles configured. Add them in{' '}
                  <code className="text-white/50">src/data/site.js</code>.
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-white/45">Newsletter</h2>
            <p className="mt-5 text-[13px] leading-[1.8] text-white/60">
              Seasonal openings, new houses and the odd letter from the forest.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to="/policies/privacy-policy" className="hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/policies/booking-terms" className="hover:text-white">
                Booking terms
              </Link>
            </li>
            <li>
              <Link to="/policies/cancellation-policy" className="hover:text-white">
                Cancellation
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
