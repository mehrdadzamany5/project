import { Icon } from './Icons.jsx'

/**
 * Cart / wishlist confirmation feedback. Announced politely to screen readers.
 */
export default function Toast({ toast }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
      aria-live="polite"
      aria-atomic="true"
    >
      {toast ? (
        <div className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-[4px] border border-line bg-white px-4 py-3 shadow-lift">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-olive/15 text-olive">
            <Icon name="check" size={14} strokeWidth={1.8} />
          </span>
          <p className="text-[13px] text-ink">{toast.message}</p>
        </div>
      ) : null}
    </div>
  )
}
