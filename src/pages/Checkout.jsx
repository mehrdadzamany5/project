import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../data/content.js'
import { photo } from '../data/images.js'
import { useStore } from '../context/StoreContext.jsx'
import { formatPrice, isValidEmail } from '../lib/format.js'
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

function validate(form) {
  const errors = {}
  if (!form.firstName.trim()) errors.firstName = 'Please enter your first name.'
  if (!form.lastName.trim()) errors.lastName = 'Please enter your last name.'
  if (!isValidEmail(form.email)) errors.email = 'Please enter a valid email address.'
  if (!form.address.trim()) errors.address = 'Please enter a delivery address.'
  if (!form.city.trim()) errors.city = 'Please enter a city.'
  if (!form.postcode.trim()) errors.postcode = 'Please enter a postcode.'
  if (!form.country.trim()) errors.country = 'Please enter a country.'
  return errors
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
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | blocked

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
        <PageHeader eyebrow="Checkout" title="Checkout" />
        <div className="shell py-14">
          <EmptyState
            icon="bag"
            title="There is nothing to check out"
            text="Add a piece to your bag first, then return here to complete your order."
            actionLabel="Browse the collection"
            actionTo="/shop"
          />
        </div>
      </>
    )
  }

  if (status === 'blocked') {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="Payment Not Connected" />
        <div className="shell py-14">
          <div className="max-w-2xl">
            <InfoNotice tone="draft" icon="lock" className="mb-6">
              Your details passed validation, but no payment provider is connected to this
              environment — so no order has been placed and no payment has been taken.
            </InfoNotice>
            <p className="text-[14px] leading-relaxed text-ink-2">
              To accept real payments you need to connect a payment provider and create an orders
              table so completed orders are stored server-side. Nothing about your card is ever
              handled by this application.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/cart" className="btn btn-outline">
                Back to bag
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
                Empty bag and start again
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
        eyebrow="Checkout"
        title="Checkout"
        intro="Complete your delivery details. Payment is handled by the connected provider — never by this application."
      />

      <div className="shell py-10 lg:py-14">
        <InfoNotice className="mb-8 max-w-3xl">
          This checkout validates and calculates correctly, but no payment provider or orders
          database is connected yet, so it cannot complete a real order.
        </InfoNotice>

        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend className="text-[17px] font-semibold">Contact information</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field
                  id="firstName"
                  label="First name"
                  value={form.firstName}
                  onChange={set('firstName')}
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <Field
                  id="lastName"
                  label="Last name"
                  value={form.lastName}
                  onChange={set('lastName')}
                  error={errors.lastName}
                  autoComplete="family-name"
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  error={errors.email}
                  autoComplete="email"
                />
                <Field
                  id="phone"
                  label="Phone (optional)"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                />
              </div>
            </fieldset>

            <fieldset className="mt-10">
              <legend className="text-[17px] font-semibold">Delivery address</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field
                  id="address"
                  label="Address"
                  value={form.address}
                  onChange={set('address')}
                  error={errors.address}
                  autoComplete="street-address"
                  className="sm:col-span-2"
                />
                <Field
                  id="city"
                  label="City"
                  value={form.city}
                  onChange={set('city')}
                  error={errors.city}
                  autoComplete="address-level2"
                />
                <Field
                  id="postcode"
                  label="Postcode"
                  value={form.postcode}
                  onChange={set('postcode')}
                  error={errors.postcode}
                  autoComplete="postal-code"
                />
                <Field
                  id="country"
                  label="Country"
                  value={form.country}
                  onChange={set('country')}
                  error={errors.country}
                  autoComplete="country-name"
                  className="sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="label">
                    Delivery notes (optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={form.notes}
                    onChange={(event) => set('notes')(event.target.value)}
                    className="field resize-y"
                    placeholder="Access details, preferred delivery window…"
                  />
                </div>
              </div>
            </fieldset>

            {Object.keys(errors).length > 0 ? (
              <p className="mt-6 flex items-center gap-2 text-[13px] text-[#B4523F]" role="alert">
                <Icon name="close" size={15} strokeWidth={1.8} />
                Please correct the highlighted fields.
              </p>
            ) : null}

            <button
              type="submit"
              className="btn btn-primary mt-8 h-12 w-full sm:w-auto sm:px-10"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Checking…' : 'Continue to payment'}
            </button>
          </form>

          <aside aria-label="Order summary">
            <div className="sticky top-24 border border-line bg-white p-6">
              <h2 className="text-[16px] font-semibold">Your Order</h2>

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
                        {line.color} · Qty {line.qty}
                      </span>
                    </span>
                    <span className="text-[13.5px] font-medium">
                      {formatPrice(line.product.price * line.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <dl className="mt-4 space-y-3 border-t border-line pt-4 text-[13.5px]">
                <div className="flex items-center justify-between">
                  <dt className="text-ink-2">Subtotal</dt>
                  <dd className="font-medium text-ink">{formatPrice(totals.subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-2">Delivery</dt>
                  <dd className="font-medium text-ink">
                    {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-2">Estimated tax</dt>
                  <dd className="font-medium text-ink">{formatPrice(totals.tax)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-3 text-[15px]">
                  <dt className="font-semibold text-ink">Total</dt>
                  <dd className="font-display font-semibold text-ink">
                    {formatPrice(totals.total)}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 text-[11.5px] leading-relaxed text-ink-3">
                Free delivery on orders over ${SITE.freeShippingThreshold}. Card details are never
                stored by Nordic Living.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
