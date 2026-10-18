import { useLang } from '../i18n/LanguageContext.jsx'
import { useStore } from '../context/StoreContext.jsx'
import { formatNumber } from '../lib/format.js'
import PageHeader from '../components/ui/PageHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { EmptyState } from '../components/ui/StateBlocks.jsx'

export default function Wishlist() {
  const { wishlistProducts, addToCart, notify } = useStore()
  const { t, lang } = useLang()

  const addAll = () => {
    wishlistProducts.forEach((product) => addToCart(product))
    notify(t('wishlist.addedAll'))
  }

  return (
    <>
      <PageHeader
        eyebrow={t('wishlist.eyebrow')}
        title={
          wishlistProducts.length > 0
            ? t('wishlist.titleWithCount', { count: formatNumber(wishlistProducts.length, lang) })
            : t('wishlist.title')
        }
        intro={t('wishlist.intro')}
      />

      <div className="shell py-10 lg:py-14">
        {wishlistProducts.length === 0 ? (
          <EmptyState
            icon="heart"
            title={t('wishlist.emptyTitle')}
            text={t('wishlist.emptyText')}
            actionLabel={t('wishlist.browse')}
            actionTo="/shop"
          />
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-ink-2">{t('wishlist.note')}</p>
              <button type="button" onClick={addAll} className="btn btn-outline">
                {t('wishlist.addAll')}
              </button>
            </div>
            <ProductGrid products={wishlistProducts} priorityCount={4} />
          </>
        )}
      </div>
    </>
  )
}
