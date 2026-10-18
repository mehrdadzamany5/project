import { Link } from 'react-router-dom'
import { photo } from '../data/images.js'
import { SITE } from '../data/content.js'
import { finishLabel } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { formatNumber, formatPrice } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import QuantityStepper from '../components/ui/QuantityStepper.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { EmptyState } from '../components/ui/StateBlocks.jsx'

export default function Cart() {
  const { cartLines, totals, updateQty, removeFromCart, cartCount } = useStore()
  const { t, lang } = useLang()

  const freeShippingProgress = Math.min(
    100,
    Math.round((totals.subtotal / SITE.freeShippingThreshold) * 100),
  )

  return (
    <>
      <PageHeader
        eyebrow={t('cart.eyebrow')}
        title={
          cartCount > 0
            ? t('cart.titleWithCount', { count: formatNumber(cartCount, lang) })
            : t('cart.title')
        }
        intro={t('cart.intro')}
      />

      <div className="shell py-10 lg:py-14">
        {cartLines.length === 0 ? (
          <EmptyState
            icon="bag"
            title={t('cart.emptyTitle')}
            text={t('cart.emptyText')}
            actionLabel={t('cart.continueShopping')}
            actionTo="/shop"
          />
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
            {/* Lines */}
            <div>
              <ul className="divide-y divide-line border-y border-line">
                {cartLines.map((line) => (
                  <li key={`${line.productId}-${line.color}`} className="flex gap-4 py-5 sm:gap-6">
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
                          <p className="mt-0.5 text-[12px] text-ink-3">
                            {t('cart.finish', { name: finishLabel(line.color, lang) })}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.productId, line.color)}
                          aria-label={t('cart.remove', { name: line.product.name })}
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
                        <div className="text-end">
                          <p className="text-[14px] font-semibold text-ink">
                            {formatPrice(line.product.price * line.qty, lang)}
                          </p>
                          {line.qty > 1 ? (
                            <p className="text-[11.5px] text-ink-3">
                              {t('cart.each', { price: formatPrice(line.product.price, lang) })}
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
                <Icon name="arrow-left" size={15} className="rtl:rotate-180" />
                {t('cart.continueShopping')}
              </Link>
            </div>

            {/* Summary */}
            <aside aria-label={t('cart.summary')}>
              <div className="sticky top-24 border border-line bg-white p-6">
                <h2 className="text-[16px] font-semibold">{t('cart.summary')}</h2>

                <dl className="mt-5 space-y-3 text-[13.5px]">
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

                {totals.remainingForFreeShipping > 0 ? (
                  <div className="mt-5">
                    <p className="text-[12px] text-ink-2">
                      {t('cart.addForFree', {
                        price: formatPrice(totals.remainingForFreeShipping, lang),
                      })}
                    </p>
                    <div
                      className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-sand"
                      role="progressbar"
                      aria-valuenow={freeShippingProgress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={t('cart.progressAria')}
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
                    {t('cart.freeUnlocked')}
                  </p>
                )}

                <Link to="/checkout" className="btn btn-primary mt-6 w-full">
                  {t('cart.checkout')}
                </Link>

                <p className="mt-4 text-[11.5px] leading-relaxed text-ink-3">
                  {t('cart.disclaimer')}
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  )
}
