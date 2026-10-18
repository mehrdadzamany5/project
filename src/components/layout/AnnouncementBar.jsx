import { Icon } from '../ui/Icons.jsx'

export default function AnnouncementBar() {
  return (
    <div className="bg-sand text-ink-2">
      <div className="shell flex h-9 items-center justify-between gap-4 text-[11px] tracking-[0.06em]">
        <p className="flex items-center gap-2">
          <Icon name="truck" size={14} className="hidden sm:block" />
          <span>Free Shipping on Orders Over $499</span>
          <span aria-hidden="true" className="hidden text-line sm:inline">
            |
          </span>
          <span className="hidden sm:inline">30-Day Easy Returns</span>
        </p>
        <p className="hidden items-center gap-2 md:flex">
          <Icon name="leaf" size={14} />
          <span>Sustainable Furniture for a Better Tomorrow</span>
        </p>
      </div>
    </div>
  )
}
