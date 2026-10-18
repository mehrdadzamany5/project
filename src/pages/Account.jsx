import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { formatNumber } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import { Icon } from '../components/ui/Icons.jsx'
import { InfoNotice } from '../components/ui/StateBlocks.jsx'

export default function Account() {
  const { cartCount, wishlist, recentProducts } = useStore()
  const { t, lang } = useLang()

  const features = [
    t('account.featureSignIn'),
    t('account.featureHistory'),
    t('account.featureWishlist'),
    t('account.featureAddresses'),
  ]

  return (
    <>
      <PageHeader
        eyebrow={t('account.eyebrow')}
        title={t('account.title')}
        intro={t('account.intro')}
      />

      <div className="shell py-10 lg:py-14">
        <InfoNotice tone="draft" icon="lock" className="max-w-3xl">
          {t('account.notice')}
        </InfoNotice>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Link
            to="/cart"
            className="group flex flex-col justify-between border border-line bg-white p-6 transition-colors hover:border-accent"
          >
            <Icon name="bag" size={22} className="text-accent" />
            <span className="mt-6">
              <span className="block text-[15px] font-medium">{t('account.yourBag')}</span>
              <span className="mt-1 block text-[12.5px] text-ink-2">
                {t('account.itemsWaiting', { count: formatNumber(cartCount, lang) })}
              </span>
            </span>
          </Link>

          <Link
            to="/wishlist"
            className="group flex flex-col justify-between border border-line bg-white p-6 transition-colors hover:border-accent"
          >
            <Icon name="heart" size={22} className="text-accent" />
            <span className="mt-6">
              <span className="block text-[15px] font-medium">{t('account.yourWishlist')}</span>
              <span className="mt-1 block text-[12.5px] text-ink-2">
                {t('account.savedPieces', { count: formatNumber(wishlist.length, lang) })}
              </span>
            </span>
          </Link>

          <Link
            to="/shop"
            className="group flex flex-col justify-between border border-line bg-white p-6 transition-colors hover:border-accent"
          >
            <Icon name="grid" size={22} className="text-accent" />
            <span className="mt-6">
              <span className="block text-[15px] font-medium">{t('account.recentlyViewed')}</span>
              <span className="mt-1 block text-[12.5px] text-ink-2">
                {recentProducts.length > 0
                  ? recentProducts
                      .map((product) => product.name)
                      .slice(0, 2)
                      .join('، ')
                  : t('account.nothingViewed')}
              </span>
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <section>
            <h2 className="text-[20px] sm:text-[23px]">{t('account.signIn')}</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-2">{t('account.signInText')}</p>
            <Link to="/contact" className="btn btn-outline mt-6">
              {t('account.contactAboutOrder')}
            </Link>
          </section>

          <section>
            <h2 className="text-[20px] sm:text-[23px]">{t('account.whatAccountsAdd')}</h2>
            <ul className="mt-4 space-y-3">
              {features.map((feature) => (
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
