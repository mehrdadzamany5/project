import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../data/content.js'
import { photo } from '../data/images.js'
import { finishLabel } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { formatNumber, formatPrice, isValidEmail } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { EmptyState, InfoNotice } from '../components/ui/StateBlocks.jsx'

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postcode: '',
  country: '',
  notes: '',
}

function Field({ id, label, value, onChange, error, type = 'text', autoComplete, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] text-[#B4523F]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export default function Checkout() {
  const { cartLines, totals, clearCart } = useStore()
  const { t, lang } = useLang()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | blocked

  const validate = (values) => {
    const next = {}
    if (!values.firstName.trim()) next.firstName = t('checkout.errFirstName')
    if (!values.lastName.trim()) next.lastName = t('checkout.errLastName')
    if (!isValidEmail(values.email)) next.email = t('checkout.errEmail')
    if (!values.address.trim()) next.address = t('checkout.errAddress')
    if (!values.city.trim()) next.city = t('checkout.errCity')
    if (!values.postcode.trim()) next.postcode = t('checkout.errPostcode')
    if (!values.country.trim()) next.country = t('checkout.errCountry')
    return next
  }

  const set = (key) => (value) => {
    setForm((current) => ({ ...current, [key]: value }))
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    // No payment provider is connected in this environment, so the order
    // cannot be completed. We say so instead of showing a fake confirmation.
    setStatus('submitting')
    window.setTimeout(() => setStatus('blocked'), 600)
  }

  if (cartLines.length === 0 && status !== 'blocked') {
    return (
      <>
        <PageHeader eyebrow={t('checkout.eyebrow')} title={t('checkout.title')} />
        <div className="shell py-14">
          <EmptyState
            icon="bag"
            title={t('checkout.emptyTitle')}
            text={t('checkout.emptyText')}
            actionLabel={t('checkout.browse')}
            actionTo="/shop"
          />
        </div>
      </>
    )
  }

  if (status === 'blocked') {
    return (
      <>
        <PageHeader eyebrow={t('checkout.eyebrow')} title={t('checkout.blockedTitle')} />
        <div className="shell py-14">
          <div className="max-w-2xl">
            <InfoNotice tone="draft" icon="lock" className="mb-6">
              {t('checkout.blockedNotice')}
            </InfoNotice>
            <p className="text-[14px] leading-relaxed text-ink-2">{t('checkout.blockedText')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/cart" className="btn btn-outline">
                {t('checkout.backToBag')}
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearCart()
                  setStatus('idle')
                  setForm(EMPTY_FORM)
                }}
                className="btn btn-quiet"
              >
                {t('checkout.emptyAndRestart')}
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHeader
        eyebrow={t('checkout.eyebrow')}
        title={t('checkout.title')}
        intro={t('checkout.intro')}
      />

      <div className="shell py-10 lg:py-14">
        <InfoNotice className="mb-8 max-w-3xl">{t('checkout.notice')}</InfoNotice>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend className="text-[17px] font-semibold">{t('checkout.contactInfo')}</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field
                  id="firstName"
                  label={t('checkout.firstName')}
                  value={form.firstName}
                  onChange={set('firstName')}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <Field
                  id="lastName"
                  label={t('checkout.lastName')}
                  value={form.lastName}
                  onChange={set('lastName')}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
                <Field
                  id="email"
                  label={t('checkout.email')}
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  label={t('checkout.phone')}
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                />
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="text-[17px] font-semibold">{t('checkout.deliveryAddress')}</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field
                  id="address"
                  label={t('checkout.address')}
                  value={form.address}
                  onChange={set('address')}
                  error={errors.address}
                  autoComplete="street-address"
                  className="sm:col-span-2"
                />
                <Field
                  id="city"
                  label={t('checkout.city')}
                  value={form.city}
                  onChange={set('city')}
                  error={errors.city}
                  autoComplete="address-level2"
                />
                <Field
                  id="postcode"
                  label={t('checkout.postcode')}
                  value={form.postcode}
                  onChange={set('postcode')}
                  error={errors.postcode}
                  autoComplete="postal-code"
                />
                <Field
                  id="country"
                  label={t('checkout.country')}
                  value={form.country}
                  onChange={set('country')}
                  error={errors.country}
                  autoComplete="country-name"
                  className="sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="label">
                    {t('checkout.notes')}
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(event) => set('notes')(event.target.value)}
                    className="field resize-y"
                    placeholder={t('checkout.notesPlaceholder')}
                  />
                </div>
              </div>
            </fieldset>

            {Object.keys(errors).length > 0 ? (
              <p className="mt-6 flex items-center gap-2 text-[13px] text-[#B4523F]" role="alert">
                <Icon name="close" size={15} strokeWidth={1.8} />
                {t('checkout.correctFields')}
              </p>
            ) : null}

            <button
              type="submit"
              className="btn btn-primary mt-8 h-12 w-full sm:w-auto sm:px-10"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? t('checkout.checking') : t('checkout.continueToPayment')}
            </button>
          </form>

          <aside aria-label={t('cart.summary')}>
            <div className="sticky top-24 border border-line bg-white p-6">
              <h2 className="text-[16px] font-semibold">{t('checkout.yourOrder')}</h2>

              <ul className="mt-5 divide-y divide-line">
                {cartLines.map((line) => (
                  <li key={`${line.productId}-${line.color}`} className="flex gap-3 py-3">
                    <span className="img-box h-16 w-14 shrink-0">
                      <img
                        src={photo(line.product.images[0], { w: 200 })}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium">
                        {line.product.name}
                      </span>
                      <span className="block text-[11.5px] text-ink-3">
                        {finishLabel(line.color, lang)} · {t('checkout.qty')}{' '}
                        {formatNumber(line.qty, lang)}
                      </span>
                    </span>
                    <span className="text-[13.5px] font-medium">
                      {formatPrice(line.product.price * line.qty, lang)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-3 border-t border-line pt-4 text-[13.5px]">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-2">{t('cart.subtotal')}</dt>
                  <dd className="font-medium text-ink">{formatPrice(totals.subtotal, lang)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-2">{t('cart.delivery')}</dt>
                  <dd className="font-medium text-ink">
                    {totals.shipping === 0 ? t('cart.free') : formatPrice(totals.shipping, lang)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-2">{t('cart.tax')}</dt>
                  <dd className="font-medium text-ink">{formatPrice(totals.tax, lang)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-3 text-[15px]">
                  <dt className="font-semibold text-ink">{t('cart.total')}</dt>
                  <dd className="font-display font-semibold text-ink">
                    {formatPrice(totals.total, lang)}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-[11.5px] leading-relaxed text-ink-3">
                {t('checkout.footnote', {
                  threshold: formatPrice(SITE.freeShippingThreshold, lang),
                })}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
