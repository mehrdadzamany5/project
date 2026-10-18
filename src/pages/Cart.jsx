import { Link } from 'react-router-dom'
import { photo } from '../data/images.js'
import { SITE } from '../data/content.js'
import { useStore } from '../context/StoreContext.jsx'
import { formatPrice } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import QuantityStepper from '../components/ui/QuantityStepper.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { EmptyState } from '../components/ui/StateBlocks.jsx'

export default function Cart() {
  const { cartLines, totals, updateQty, removeFromCart, cartCount } = useStore()

  const freeShippingProgress = Math.min(
    100,
    Math.round((totals.subtotal / SITE.freeShippingThreshold) * 100),
  )

  return (
    <>
      <PageHeader
        eyebrow="Shopping bag"
        title={cartCount > 0 ? `Your Bag (${cartCount})` : 'Your Bag'}
        intro="Totals are calculated from the items in your bag, including tax and delivery."
      />

      <div className="shell py-10 lg:py-14">
        {cartLines.length === 0 ? (
          <EmptyState
            icon="bag"
            title="Your bag is empty"
            text="Browse the collection and add something you will still love in ten years."
            actionLabel="Continue shopping"
            actionTo="/shop"
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
            {/* Lines */}
            <div>
              <ul className="divide-y divide-line border-y border-line">
                {cartLines.map((line) => (
                  <li
                    key={`${line.productId}-${line.color}`}
                    className="flex gap-4 py-5 sm:gap-6"
                  >
                    <Link
                      to={`/product/${line.product.slug}`}
                      className="img-box h-24 w-20 shrink-0 sm:h-32 sm:w-28"
                    >
                      <img
                        src={photo(line.product.images[0], { w: 300 })}
                        alt={line.product.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link
                            to={`/product/${line.product.slug}`}
                            className="block truncate text-[14.5px] font-medium transition-colors hover:text-accent"
                          >
                            {line.product.name}
                          </Link>
                          <p className="mt-0.5 text-[12px] text-ink-3">Finish: {line.color}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.productId, line.color)}
                          aria-label={`Remove ${line.product.name} from bag`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-3 transition-colors hover:bg-sand hover:text-ink"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                        <QuantityStepper
                          value={line.qty}
                          onChange={(value) => updateQty(line.productId, line.color, value)}
                        />
                        <div className="text-right">
                          <p className="text-[14px] font-semibold text-ink">
                            {formatPrice(line.product.price * line.qty)}
                          </p>
                          {line.qty > 1 ? (
                            <p className="text-[11.5px] text-ink-3">
                              {formatPrice(line.product.price)} each
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 text-[12.5px] font-medium text-ink-2 transition-colors hover:text-accent"
              >
                <Icon name="arrow-left" size={15} />
                Continue shopping
              </Link>
            </div>

            {/* Summary */}
            <aside aria-label="Order summary">
              <div className="sticky top-24 border border-line bg-white p-6">
                <h2 className="text-[16px] font-semibold">Order Summary</h2>

                <dl className="mt-5 space-y-3 text-[13.5px]">
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

                {totals.remainingForFreeShipping > 0 ? (
                  <div className="mt-5">
                    <p className="text-[12px] text-ink-2">
                      Add {formatPrice(totals.remainingForFreeShipping)} for free delivery
                    </p>
                    <div
                      className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand"
                      role="progressbar"
                      aria-valuenow={freeShippingProgress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Progress towards free delivery"
                    >
                      <div
                        className="h-full rounded-full bg-olive transition-all duration-500"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="mt-5 flex items-center gap-2 text-[12px] text-olive">
                    <Icon name="check" size={14} strokeWidth={1.8} />
                    Free delivery unlocked
                  </p>
                )}

                <Link to="/checkout" className="btn btn-primary mt-6 w-full">
                  Checkout
                </Link>

                <p className="mt-4 text-[11.5px] leading-relaxed text-ink-3">
                  Taxes and delivery are estimated in this environment. No payment provider is
                  connected yet, so checkout cannot take a real payment.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  )
}
