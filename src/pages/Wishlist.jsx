import { useStore } from '../context/StoreContext.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { EmptyState } from '../components/ui/StateBlocks.jsx'

export default function Wishlist() {
  const { wishlistProducts, addToCart, notify } = useStore()

  const addAll = () => {
    wishlistProducts.forEach((product) => addToCart(product))
    notify('Wishlist items added to your bag')
  }

  return (
    <>
      <PageHeader
        eyebrow="Wishlist"
        title={wishlistProducts.length > 0 ? `Saved Pieces (${wishlistProducts.length})` : 'Saved Pieces'}
        intro="Everything you have saved, kept in this browser until you are ready to order."
      />

      <div className="shell py-10 lg:py-14">
        {wishlistProducts.length === 0 ? (
          <EmptyState
            icon="heart"
            title="Your wishlist is empty"
            text="Tap the heart on any product to save it here for later."
            actionLabel="Browse the collection"
            actionTo="/shop"
          />
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] text-ink-2">
                Saved items are stored locally in this browser — no account required.
              </p>
              <button type="button" onClick={addAll} className="btn btn-outline">
                Add all to bag
              </button>
            </div>
            <ProductGrid products={wishlistProducts} priorityCount={4} />
          </>
        )}
      </div>
    </>
  )
}
