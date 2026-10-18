import { useState } from 'react'
import { Link } from 'react-router-dom'
import { photo } from '../data/images.js'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { formatPrice } from '../lib/format.js'
import { Icon } from './ui/Icons.jsx'
import Rating from './ui/Rating.jsx'

const SIZES = '(min-width: 1280px) 300px, (min-width: 768px) 33vw, 50vw'

function Media({ product, priority }) {
  const { t } = useLang()
  const [failed, setFailed] = useState(false)
  const [secondary, setSecondary] = useState(product.images[1] || null)

  return (
    <div className="img-box relative aspect-[4/5] w-full">
      {failed ? (
        <span className="flex h-full w-full items-center justify-center bg-sand text-[10px] uppercase tracking-[0.16em] text-ink-3">
          {t('product.imageUnavailable')}
        </span>
      ) : (
        <img
          src={photo(product.images[0], { w: 900 })}
          srcSet={[480, 800, 1200]
            .map((w) => `${photo(product.images[0], { w })} ${w}w`)
            .join(', ')}
          sizes={SIZES}
          alt={`${product.name} — ${product.blurb}`}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-[1.045]"
        />
      )}

      {secondary && !failed ? (
        <img
          src={photo(secondary, { w: 900 })}
          srcSet={[480, 800]
            .map((w) => `${photo(secondary, { w })} ${w}w`)
            .join(', ')}
          sizes={SIZES}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          onError={() => setSecondary(null)}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100"
        />
      ) : null}
    </div>
  )
}

export default function ProductCard({ product, priority = false }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const { t, lang } = useLang()
  const saved = isWishlisted(product.id)
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden bg-white">
        <Link
          to={`/product/${product.slug}`}
          className="block focus-visible:outline-none"
          aria-label={t('product.view', { name: product.name })}
          tabIndex={-1}
        >
          <Media product={product} priority={priority} />
        </Link>

        <div className="pointer-events-none absolute start-3 top-3 flex flex-col items-start gap-2">
          {product.badge ? (
            <span className="bg-ink/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
              {t(`badge.${product.badge}`)}
            </span>
          ) : null}
          {discount > 0 ? (
            <span className="bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
              −{discount}%
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-pressed={saved}
          aria-label={
            saved
              ? t('product.removeFromWishlist', { name: product.name })
              : t('product.saveToWishlist', { name: product.name })
          }
          className={`absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 ease-smooth ${
            saved
              ? 'border-accent bg-accent text-white'
              : 'border-line bg-white/90 text-ink-2 hover:border-accent hover:text-accent'
          }`}
        >
          <Icon name={saved ? 'heart-filled' : 'heart'} size={16} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 ease-smooth group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="btn btn-primary w-full"
            aria-label={t('product.addToBag', { name: product.name })}
          >
            {t('product.addToCart')}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <Link
          to={`/product/${product.slug}`}
          className="text-[15px] font-medium leading-snug transition-colors hover:text-accent"
        >
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 min-h-[2.6em] text-[12.5px] text-ink-2">{product.blurb}</p>

        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-[14px] font-semibold text-ink">
            {formatPrice(product.price, lang)}
          </span>
          {product.compareAt ? (
            <span className="text-[12px] text-ink-3 line-through">
              {formatPrice(product.compareAt, lang)}
            </span>
          ) : null}
        </div>

        <Rating value={product.rating} count={product.reviews} className="mt-2" />
      </div>
    </article>
  )
}
