# Nordic Living

Premium Scandinavian furniture storefront — React + Vite + Tailwind, built as a
complete, navigable e-commerce front end with a single source of truth for
catalogue data.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure

```
src/
  App.jsx                 routes
  index.css               design tokens + component classes (.shell, .btn, .field, .reveal)
  data/
    images.js             photo() helper + curated, subject-verified image pool
    products.js           categories, products, filtering / sorting / search helpers
    content.js            site config, editorial content, FAQ, policy text
  context/StoreContext.jsx  cart + wishlist + recently-viewed (localStorage), totals
  components/
    layout/               AnnouncementBar, Header, Footer, Layout, ScrollToTop
    home/                 the 11 homepage sections
    ui/                   Icons, SmartImage, Rating, Reveal, Accordion, Toast, …
    ProductCard.jsx, ProductGrid.jsx, ProductFilters.jsx, PolicySections.jsx
  pages/                  Home, Shop, Category, ProductDetail, Cart, Wishlist, Search,
                          About, Journal, JournalArticle, Contact, Faq,
                          ShippingReturns, Privacy, Terms, Account, Checkout, NotFound
```

## Design system

Tokens live as CSS custom properties in `src/index.css` and as Tailwind theme
extensions in `tailwind.config.js`. Palette: `#F7F5F1` background, `#EEE8DF`
secondary, `#24231F` ink, `#876447` / `#5C4635` warm browns, `#8A8C70` olive,
`#E6E0D8` hairlines. Type: Manrope for headings, Inter for interface, Caveat for
the one handwritten editorial accent.

## Data model

`src/data/products.js` is the single source of truth. The homepage, shop,
category pages, search, product detail, wishlist and cart all read from it, so
names, prices and imagery never diverge. Cart totals are derived from the actual
cart lines (subtotal, delivery threshold, tax) — never hardcoded.

## What is connected, and what is not

This is a front-end application. The following are deliberately honest rather
than simulated, and are labelled in the UI:

| Feature | Status |
| --- | --- |
| Catalogue, filtering, sorting, search | Working (client-side data) |
| Cart, wishlist, recently viewed | Working — stored in `localStorage` in the browser |
| Cart totals and free-delivery threshold | Working — computed from cart contents |
| Checkout form + validation | Working, but **no payment provider is connected**, so no order is placed |
| Customer accounts / order history | **Not connected** — no auth provider, so no fake account is shown |
| Newsletter + contact form | Validate and report state, but **no backend stores submissions** |
| Product reviews (written) | **Not stored** — only aggregate rating/count exist in the catalogue |
| Social links | **Not configured** — icons report this instead of linking nowhere |
| Testimonials | Sample demonstration content, labelled as such |

Business contact details, social URLs and commercial policy text are all
`null` / clearly marked drafts in `src/data/content.js` — replace them with the
real values before launch.
