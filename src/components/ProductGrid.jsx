import ProductCard from './ProductCard.jsx'
import Reveal from './ui/Reveal.jsx'

export default function ProductGrid({ products, priorityCount = 0, className = '' }) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:gap-x-6 xl:grid-cols-4 ${className}`}
    >
      {products.map((product, index) => (
        <Reveal key={product.id} delay={Math.min(index, 6) * 45} className="h-full">
          <ProductCard product={product} priority={index < priorityCount} />
        </Reveal>
      ))}
    </div>
  )
}
