import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { photo } from '../data/images.js'
import { SITE } from '../data/content.js'
import { finishLabel, useCatalog } from '../i18n/catalog.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { formatNumber, formatPrice } from '../lib/format.js'
import Accordion from '../components/ui/Accordion.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import QuantityStepper from '../components/ui/QuantityStepper.jsx'
import Rating from '../components/ui/Rating.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { Breadcrumbs } from '../components/ui/StateBlocks.jsx'
import { Photo } from '../components/ui/SmartImage.jsx'
import NotFound from './NotFound.jsx'

export default function ProductDetail() {
  const { slug } = useParams()
  const { getProduct, relatedProducts } = useCatalog()
  const { t, lang } = useLang()
  const product = getProduct(slug)
  const { addToCart, toggleWishlist, isWishlisted, markViewed, recentProducts } = useStore()

  const [activeImage, setActiveImage] = useState(0)
  const [chosenColor, setChosenColor] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    if (!product) return
    setActiveImage(0)
    setChosenColor(null)
    setQty(1)
    markViewed(product.id)
  }, [product, markViewed])

  const related = useMemo(() => (product ? relatedProducts(product, 4) : []), [product, relatedProducts])

  if (!product) return <NotFound />

  const selectedColor = chosenColor ?? product.colors?.[0]?.name ?? null
  const selectedColorLabel = finishLabel(selectedColor, lang)
  const saved = isWishlisted(product.id)

  const details = [
    { question: t('pdp.detailsDescription'), answer: product.description },
    {
      question: t('pdp.detailsMaterials'),
      answer: `${product.material}. ${product.dimensions}.`,
    },
    { question: t('pdp.detailsCare'), answer: product.care.join(' ') },
    {
      question: t('pdp.detailsShipping'),
      answer: t('pdp.shippingAnswer', {
        shipping: formatPrice(SITE.standardShipping, lang),
        threshold: formatPrice(SITE.freeShippingThreshold, lang),
      }),
    },
  ]

  return (
    <>
      <div className="shell pt-8 lg:pt-10">
        <Breadcrumbs
          items={[
            { label: t('breadcrumb.home'), to: '/' },
            { label: t('breadcrumb.shop'), to: '/shop' },
            { label: product.name },
          ]}
        />
      </div>

      <div className="shell pb-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <div className="img-box relative aspect-[4/5] w-full bg-white">
              <Photo
                id={product.images[activeImage] || product.images[0]}
                alt={`${product.name} — ${product.blurb}`}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                widths={[600, 900, 1200]}
                className="h-full w-full object-cover"
              />
              {product.badge ? (
                <span className="absolute start-4 top-4 bg-ink/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  {t(`badge.${product.badge}`)}
                </span>
              ) : null}
            </div>

            {product.images.length > 1 ? (
              <div className="mt-4 flex gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={t('pdp.showImage', { n: index + 1, name: product.name })}
                    aria-current={activeImage === index}
                    className={`img-box h-20 w-20 border transition-colors ${
                      activeImage === index ? 'border-accent' : 'border-line hover:border-ink-3'
                    }`}
                  >
                    <img
                      src={photo(image, { w: 200 })}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {/* Purchase panel */}
          <div className="lg:pt-2">
            <h1 className="text-[28px] leading-tight sm:text-[34px]">{product.name}</h1>
            <p className="mt-2 text-[14px] text-ink-2">{product.blurb}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Rating value={product.rating} count={product.reviews} size={15} />
              <a href="#reviews" className="text-[12px] text-ink-3 underline-offset-2 hover:underline">
                {t('pdp.readReviews')}
              </a>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-[26px] font-semibold text-ink">
                {formatPrice(product.price, lang)}
              </span>
              {product.compareAt ? (
                <>
                  <span className="text-[15px] text-ink-3 line-through">
                    {formatPrice(product.compareAt, lang)}
                  </span>
                  <span className="bg-accent px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white">
                    {t('pdp.save', {
                      amount: formatPrice(product.compareAt - product.price, lang),
                    })}
                  </span>
                </>
              ) : null}
            </div>

            <p className="mt-6 text-[14px] leading-relaxed text-ink-2">{product.description}</p>

            {/* Colour options */}
            {product.colors?.length ? (
              <fieldset className="mt-8">
                <legend className="label">
                  {t('pdp.finish')} — <span className="text-ink">{selectedColorLabel}</span>
                </legend>
                <div className="flex flex-wrap items-center gap-3">
                  {product.colors.map((option) => {
                    const isActive = selectedColor === option.name
                    return (
                      <button
                        key={option.name}
                        type="button"
                        onClick={() => setChosenColor(option.name)}
                        aria-pressed={isActive}
                        aria-label={t('pdp.finishAria', { name: option.label || option.name })}
                        title={option.label || option.name}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${
                          isActive ? 'border-accent' : 'border-transparent hover:border-line'
                        }`}
                      >
                        <span
                          className="h-6 w-6 rounded-full border border-black/10"
                          style={{ backgroundColor: option.hex }}
                        />
                      </button>
                    )
                  })}
                </div>
              </fieldset>
            ) : null}

            {/* Quantity + actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} />
              <button
                type="button"
                onClick={() => addToCart(product, { qty, color: selectedColor })}
                className="btn btn-primary h-10 flex-1 min-w-[180px]"
              >
                {t('product.addToCart')}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-pressed={saved}
                aria-label={saved ? t('pdp.removeWishlist') : t('pdp.saveWishlist')}
                className={`flex h-10 w-10 items-center justify-center rounded-[3px] border transition-colors ${
                  saved
                    ? 'border-accent bg-accent text-white'
                    : 'border-line text-ink-2 hover:border-accent hover:text-accent'
                }`}
              >
                <Icon name={saved ? 'heart-filled' : 'heart'} size={17} />
              </button>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-line pt-6 text-[12.5px] text-ink-2">
              <p className="flex items-center gap-2">
                <Icon name="truck" size={16} className="text-olive" />
                {t('pdp.freeDelivery', { threshold: formatPrice(SITE.freeShippingThreshold, lang) })}
              </p>
              <p className="flex items-center gap-2">
                <Icon name="return" size={16} className="text-olive" />
                {t('pdp.returns')}
              </p>
              <p className="flex items-center gap-2">
                <Icon name="lock" size={16} className="text-olive" />
                {t('pdp.secure')}
              </p>
            </div>

            <div className="mt-8">
              <Accordion items={details} defaultOpen={0} />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section id="reviews" className="border-t border-line bg-white py-14">
        <div className="shell grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-14">
          <div>
            <p className="eyebrow">{t('pdp.reviewsEyebrow')}</p>
            <p className="mt-3 font-display text-[40px] font-semibold leading-none text-ink">
              {formatNumber(product.rating, lang, {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </p>
            <Rating value={product.rating} showValue={false} size={15} className="mt-3" />
            <p className="mt-3 text-[13px] text-ink-2">
              {t('pdp.basedOn', { count: formatNumber(product.reviews, lang) })}
            </p>
          </div>
          <div className="text-[13.5px] leading-relaxed text-ink-2">
            <p>{t('pdp.reviewsNote1')}</p>
            <p className="mt-3">{t('pdp.reviewsNote2')}</p>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="shell py-14">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[24px] sm:text-[28px]">{t('pdp.alsoLike')}</h2>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent"
            >
              {t('pdp.viewAll')}
              <Icon name="arrow-right" size={15} className="rtl:rotate-180" />
            </Link>
          </div>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}

      {recentProducts.filter((item) => item.id !== product.id).length > 0 ? (
        <section className="border-t border-line bg-sand/50 py-14">
          <div className="shell">
            <h2 className="text-[22px] sm:text-[26px]">{t('pdp.recentlyViewed')}</h2>
            <div className="mt-8">
              <ProductGrid
                products={recentProducts.filter((item) => item.id !== product.id).slice(0, 4)}
              />
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
