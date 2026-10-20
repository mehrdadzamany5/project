import { useState } from 'react'

/**
 * Image with a graceful fallback: if the file cannot be loaded the frame keeps
 * its aspect ratio and shows a neutral placeholder instead of a broken icon.
 */
export default function Img({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  priority = false,
  sizes,
  ...rest
}) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-stone ${className}`}>
      {failed ? (
        <div
          className="flex h-full w-full items-center justify-center bg-stone px-4 text-center"
          role="img"
          aria-label={alt}
        >
          <span className="label text-muted">Image unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : undefined}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  )
}
