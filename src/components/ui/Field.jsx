import { useId } from 'react'

/**
 * Labelled form control with hint + error text wired through
 * `aria-describedby` and `aria-invalid`.
 */
export default function Field({
  label,
  hint,
  error,
  required = false,
  children,
  className = '',
  as: Tag = 'div',
}) {
  const id = useId()
  const control = typeof children === 'function' ? children({ id, describedBy: `${id}-msg` }) : children
  const message = error || hint

  return (
    <Tag className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="label text-muted">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {control}
      {message ? (
        <p
          id={`${id}-msg`}
          className={`text-[12px] leading-[1.6] ${error ? 'text-bronze' : 'text-muted'}`}
          role={error ? 'alert' : undefined}
        >
          {message}
        </p>
      ) : null}
    </Tag>
  )
}

export const inputClass = (hasError) =>
  [
    'w-full border bg-white px-3.5 py-3 text-[14px] text-ink placeholder:text-muted/70',
    'transition-colors duration-200 focus:border-black',
    hasError ? 'border-bronze' : 'border-line',
  ].join(' ')
