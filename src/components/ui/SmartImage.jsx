import { useState } from 'react'
import { photo } from '../../data/images.js'

const DEFAULT_WIDTHS = [480, 800, 1200, 1600]

/**
 * Single image primitive: responsive srcset, lazy by default, stable box,
 * and a graceful fallback if a photograph ever fails to load.
 */
export function Photo({
  id,
  alt,
  className = '',
  sizes = '100vw',
  priority = false,
  widths = DEFAULT_WIDTHS,
  ...rest
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="flex h-full w-full items-center justify-center bg-sand px-3 text-center text-[10px] uppercase tracking-[0.16em] text-ink-3">
        Image unavailable
      </span>
    )
  }

  return (
    <img
      src={photo(id, { w: 1200 })}
      srcSet={widths.map((width) => `${photo(id, { w: width })} ${width}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}

export default function SmartImage({
  id,
  alt,
  ratio = '4 / 5',
  className = '',
  imgClassName = 'h-full w-full object-cover',
  sizes,
  priority = false,
  children,
}) {
  return (
    <div className={`img-box ${className}`} style={{ aspectRatio: ratio }}>
      <Photo id={id} alt={alt} className={imgClassName} sizes={sizes} priority={priority} />
      {children}
    </div>
  )
}
