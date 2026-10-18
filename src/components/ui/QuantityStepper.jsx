import { Icon } from './Icons.jsx'

export default function QuantityStepper({ value, onChange, min = 1, max = 20, label = 'Quantity' }) {
  const step = (delta) => onChange(Math.max(min, Math.min(max, value + delta)))

  return (
    <div className="inline-flex items-center rounded-[3px] border border-line bg-white">
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="flex h-10 w-10 items-center justify-center text-ink-2 transition-colors hover:text-ink disabled:opacity-40"
      >
        <Icon name="minus" size={15} />
      </button>
      <span
        className="w-10 text-center text-[14px] font-medium tabular-nums"
        aria-live="polite"
        aria-label={`${label}: ${value}`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="flex h-10 w-10 items-center justify-center text-ink-2 transition-colors hover:text-ink disabled:opacity-40"
      >
        <Icon name="plus" size={15} />
      </button>
    </div>
  )
}
