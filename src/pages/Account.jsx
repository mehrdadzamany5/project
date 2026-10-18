import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

const FEATURES = [
  'Sign in and create an account',
  'Stored order history with tracking',
  'Server-side wishlist that follows you between devices',
  'Saved addresses for faster checkout',
]

export default function Account() {
  const { cartCount, wishlist, recentProducts } = useStore()

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Your Account"
        intro="Customer accounts are not connected in this environment yet — here is what is available right now instead."
      />

      <div className="shell py-10 lg:py-14">
        <InfoNotice tone="draft" icon="lock" className="max-w-3xl">
          No authentication provider is connected, so this store does not simulate a secure account
          or show fake order history. Your bag and wishlist are stored locally in this browser only.
        </InfoNotice>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Link
            to="/cart"
            className="group flex flex-col justify-between border border-line bg-white p-6 transition-colors hover:border-accent"
          >
            <Icon name="bag" size={22} className="text-accent" />
            <span className="mt-6">
              <span className="block text-[15px] font-medium">Your Bag</span>
              <span className="mt-1 block text-[12.5px] text-ink-2">
                {cartCount} {cartCount === 1 ? 'item' : 'items'} waiting
              </span>
            </span>
          </Link>

          <Link
            to="/wishlist"
            className="group flex flex-col justify-between border border-line bg-white p-6 transition-colors hover:border-accent"
          >
            <Icon name="heart" size={22} className="text-accent" />
            <span className="mt-6">
              <span className="block text-[15px] font-medium">Your Wishlist</span>
              <span className="mt-1 block text-[12.5px] text-ink-2">
                {wishlist.length} saved {wishlist.length === 1 ? 'piece' : 'pieces'}
              </span>
            </span>
          </Link>

          <Link
            to="/shop"
            className="group flex flex-col justify-between border border-line bg-white p-6 transition-colors hover:border-accent"
          >
            <Icon name="grid" size={22} className="text-accent" />
            <span className="mt-6">
              <span className="block text-[15px] font-medium">Recently Viewed</span>
              <span className="mt-1 block text-[12.5px] text-ink-2">
                {recentProducts.length > 0
                  ? recentProducts.map((product) => product.name).slice(0, 2).join(', ')
                  : 'Nothing viewed yet'}
              </span>
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <section>
            <h2 className="text-[20px] sm:text-[23px]">Sign in</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-2">
              Sign-in is intentionally disabled until an authentication provider is connected.
              Rather than collecting an email and password that go nowhere, this form is not shown.
            </p>
            <Link to="/contact" className="btn btn-outline mt-6">
              Contact us about your order
            </Link>
          </section>

          <section>
            <h2 className="text-[20px] sm:text-[23px]">What connecting accounts would add</h2>
            <ul className="mt-4 space-y-3">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[13.5px] text-ink-2">
                  <Icon name="check" size={15} className="mt-1 shrink-0 text-olive" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}
