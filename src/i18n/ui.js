/**
 * Central UI translation dictionary.
 *
 * Flat dotted keys, looked up verbatim (never split), so a key may safely
 * contain dots. `en` is the source of truth; `fa` is the Persian translation.
 * Missing Persian keys fall back to English, then to the key itself, so a
 * forgotten string is visible rather than blank.
 */

const interpolate = (template, vars) =>
  vars
    ? template.replace(/\{(\w+)\}/g, (match, key) =>
        Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match,
      )
    : template

export const ui = {
  en: {
    /* ---------------- layout ---------------- */
    'layout.skipToContent': 'Skip to content',

    /* ---------------- announcement ---------------- */
    'announce.freeShipping': 'Free Shipping on Orders Over $499',
    'announce.returns': '30-Day Easy Returns',
    'announce.sustainable': 'Sustainable Furniture for a Better Tomorrow',

    /* ---------------- language switcher ---------------- */
    'lang.label': 'Language',
    'lang.en': 'English',
    'lang.fa': 'Persian',
    'lang.enShort': 'EN',
    'lang.faShort': 'FA',

    /* ---------------- header ---------------- */
    'header.home': 'Nordic Living — home',
    'header.tagline': 'Scandinavian Furniture',
    'header.mainNav': 'Main',
    'header.menu': '{label} menu',
    'header.submenu': '{label} submenu',
    'header.searchProducts': 'Search products',
    'header.account': 'Account',
    'header.wishlist': 'Wishlist',
    'header.bag': 'Shopping bag',
    'header.openMenu': 'Open menu',
    'header.closeMenu': 'Close menu',
    'header.siteMenu': 'Site menu',
    'header.mobileNav': 'Mobile',
    'header.shopByCategory': 'Shop by category',
    'header.wishlistCount': 'Wishlist ({count})',
    'header.bagCount': 'Bag ({count})',
    'header.itemsCount': '{label}, {count} items',
    'header.searchPlaceholder': 'Search sofas, tables, lighting…',
    'header.search': 'Search',

    /* ---------------- navigation ---------------- */
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.collections': 'Collections',
    'nav.about': 'About',
    'nav.inspiration': 'Inspiration',
    'nav.contact': 'Contact',
    'nav.allProducts': 'All Products',
    'nav.modernLivingRoom': 'Modern Living Room',
    'nav.restfulBedroom': 'Restful Bedroom',
    'nav.gatherDine': 'Gather & Dine',
    'nav.newArrivals': 'New Arrivals',
    'nav.bestsellers': 'Bestsellers',

    /* ---------------- footer ---------------- */
    'footer.shop': 'Shop',
    'footer.about': 'About',
    'footer.customerCare': 'Customer Care',
    'footer.ourStory': 'Our Story',
    'footer.sustainability': 'Sustainability',
    'footer.materials': 'Our Materials',
    'footer.journal': 'Journal',
    'footer.contact': 'Contact',
    'footer.trackOrder': 'Track Order',
    'footer.returnsExchanges': 'Returns & Exchanges',
    'footer.shippingInfo': 'Shipping Info',
    'footer.faqs': 'FAQs',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.rights': '© {year} Nordic Living. All rights reserved.',
    'footer.pledge': 'FSC-certified timber · Carbon-conscious delivery · Built to be repaired',
    'footer.socialNote': 'Social profiles are added once configured in site settings.',
    'footer.socialNewTab': '{label} (opens in a new tab)',
    'footer.socialUnconfigured': '{label} — link not configured',
    'footer.linkNotConfigured': '{label} link is not configured yet',
    'footer.tagline': 'Thoughtful furniture for a more beautiful, comfortable, and sustainable life.',

    /* ---------------- hero ---------------- */
    'hero.carousel': 'Featured collections',
    'hero.slideOf': '{n} of {total}: {caption}',
    'hero.prev': 'Previous slide',
    'hero.next': 'Next slide',
    'hero.live': 'Slide {n} of {total}: {caption}',

    /* ---------------- home sections ---------------- */
    'home.whyShop': 'Why shop with Nordic Living',
    'home.brandValues': 'Our brand values',
    'home.shopByCategory': 'Shop by category',
    'home.findFurniture': 'Find Furniture for Every Space',
    'home.viewAll': 'View All',
    'home.bestsellers': 'Bestsellers',
    'home.mostLoved': 'Our Most Loved Furniture',
    'home.brandEyebrow': 'A more beautiful way to live',
    'home.brandTitle': 'Timeless Design for Modern Life',
    'home.brandText':
      'We create functional, beautiful furniture using sustainable materials and thoughtful craftsmanship. Every piece is drawn to be repaired, re-oiled and handed on — not replaced.',
    'home.ourStory': 'Our Story',
    'home.betterHomes': 'Better Homes. A Brighter Planet.',
    'home.inspireEyebrow': 'Inspire your space',
    'home.inspireTitle': 'Small Changes Make a Big Difference',
    'home.inspireText':
      'Explore creative ideas, styling tips and real homes with Nordic Living furniture — from a single lamp that changes an evening to a sofa that changes how a room is used.',
    'home.getInspired': 'Get Inspired',
    'home.goodDesign': 'Good Design. Better Days.',
    'home.testimonialsEyebrow': 'What our customers say',
    'home.testimonialsTitle': 'Loved in Real Homes',
    'home.testimonialsNotice':
      'Sample demonstration reviews for the development environment. No order records back them, so none are shown as verified purchases.',
    'home.prevTestimonials': 'Previous testimonials',
    'home.nextTestimonials': 'Next testimonials',
    'home.socialEyebrow': 'Follow us @nordicliving',
    'home.socialTitle': 'Real Homes. Real Inspiration.',
    'home.socialAction': 'View on Instagram',
    'home.socialNoProfile':
      'No Instagram profile is configured for this store, so these images are not linked out.',
    'home.socialAria': 'Open {handle} on Instagram (opens in a new tab)',
    'home.socialAriaUnconfigured': 'Instagram link not configured',
    'home.instagramNotConfigured': 'Instagram link is not configured yet',

    /* ---------------- newsletter ---------------- */
    'newsletter.eyebrow': 'Newsletter',
    'newsletter.title': 'Join Our Community',
    'newsletter.text':
      'Get exclusive offers, new arrivals and inspiration straight to your inbox.',
    'newsletter.emailLabel': 'Email address',
    'newsletter.placeholder': 'your@email.com',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Subscribing…',
    'newsletter.subscribed': 'Subscribed',
    'newsletter.invalidEmail': 'Please enter a valid email address.',
    'newsletter.success':
      'Thank you. This form is not yet connected to a mailing list, so no address has been stored.',
    'newsletter.notice':
      'To go live, connect an email provider and store subscriptions server-side — this form currently runs in the browser only.',

    /* ---------------- product card / badges ---------------- */
    'product.imageUnavailable': 'Image unavailable',
    'product.addToCart': 'Add to Cart',
    'product.view': 'View {name}',
    'product.saveToWishlist': 'Save {name} to wishlist',
    'product.removeFromWishlist': 'Remove {name} from wishlist',
    'product.addToBag': 'Add {name} to bag',
    'badge.Bestseller': 'Bestseller',
    'badge.New': 'New',

    /* ---------------- filters ---------------- */
    'filters.search': 'Search',
    'filters.searchPlaceholder': 'Search products',
    'filters.category': 'Category',
    'filters.allProducts': 'All Products',
    'filters.price': 'Price',
    'filters.upTo': 'Up to {price}',
    'filters.clear': 'Clear filters',
    'common.productFilters': 'Product filters',

    /* ---------------- shop ---------------- */
    'shop.eyebrow': 'Shop',
    'shop.title': 'All Products',
    'shop.intro':
      'Every piece in the Nordic Living collection — solid timber, natural textiles and finishes chosen to age well.',
    'shop.productCount': '{count} product',
    'shop.productCountPlural': '{count} products',
    'shop.filters': 'Filters',
    'shop.sortProducts': 'Sort products',
    'shop.emptyTitle': 'No products match those filters',
    'shop.emptyText':
      'Try widening the price range, clearing the search field or choosing a different category.',

    /* ---------------- category ---------------- */
    'category.emptyTitle': 'Nothing in {category} matches those filters',
    'category.emptyText': 'Try widening the price range or clearing the search field.',
    'category.keepExploring': 'Keep exploring',
    'category.imageAlt': '{name} furniture from Nordic Living',
    'category.thumbAlt': '{name} furniture',
    'breadcrumb.home': 'Home',
    'breadcrumb.shop': 'Shop',

    /* ---------------- product detail ---------------- */
    'pdp.readReviews': 'Read reviews',
    'pdp.save': 'Save {amount}',
    'pdp.finish': 'Finish',
    'pdp.finishAria': 'Finish: {name}',
    'pdp.removeWishlist': 'Remove from wishlist',
    'pdp.saveWishlist': 'Save to wishlist',
    'pdp.freeDelivery': 'Free delivery on orders over {threshold}',
    'pdp.returns': '30-day returns, collected free for furniture',
    'pdp.secure': 'Secure checkout — no card details are stored',
    'pdp.showImage': 'Show image {n} of {name}',
    'pdp.detailsDescription': 'Description',
    'pdp.detailsMaterials': 'Materials & dimensions',
    'pdp.detailsCare': 'Care instructions',
    'pdp.detailsShipping': 'Shipping & returns',
    'pdp.shippingAnswer':
      'Standard delivery is {shipping} and free on orders over {threshold}. Oversized furniture is delivered free by a two-person team. You have 30 days to return this piece in its original condition.',
    'pdp.reviewsEyebrow': 'Reviews',
    'pdp.basedOn': 'Based on {count} customer ratings',
    'pdp.reviewsNote1':
      'Ratings and review counts shown here come from the catalogue record for this product. Individual review text is not stored in this environment, so no written reviews are displayed rather than inventing them.',
    'pdp.reviewsNote2':
      'Connecting a reviews service (or an orders table) would let verified, per-customer reviews appear here.',
    'pdp.alsoLike': 'You may also like',
    'pdp.viewAll': 'View all',
    'pdp.recentlyViewed': 'Recently viewed',

    /* ---------------- cart ---------------- */
    'cart.eyebrow': 'Shopping bag',
    'cart.title': 'Your Bag',
    'cart.titleWithCount': 'Your Bag ({count})',
    'cart.intro': 'Totals are calculated from the items in your bag, including tax and delivery.',
    'cart.emptyTitle': 'Your bag is empty',
    'cart.emptyText':
      'Browse the collection and add something you will still love in ten years.',
    'cart.continueShopping': 'Continue shopping',
    'cart.finish': 'Finish: {name}',
    'cart.remove': 'Remove {name} from bag',
    'cart.each': '{price} each',
    'cart.summary': 'Order Summary',
    'cart.subtotal': 'Subtotal',
    'cart.delivery': 'Delivery',
    'cart.tax': 'Estimated tax',
    'cart.total': 'Total',
    'cart.free': 'Free',
    'cart.addForFree': 'Add {price} for free delivery',
    'cart.freeUnlocked': 'Free delivery unlocked',
    'cart.progressAria': 'Progress towards free delivery',
    'cart.checkout': 'Checkout',
    'cart.disclaimer':
      'Taxes and delivery are estimated in this environment. No payment provider is connected yet, so checkout cannot take a real payment.',

    /* ---------------- wishlist ---------------- */
    'wishlist.eyebrow': 'Wishlist',
    'wishlist.title': 'Saved Pieces',
    'wishlist.titleWithCount': 'Saved Pieces ({count})',
    'wishlist.intro':
      'Everything you have saved, kept in this browser until you are ready to order.',
    'wishlist.emptyTitle': 'Your wishlist is empty',
    'wishlist.emptyText': 'Tap the heart on any product to save it here for later.',
    'wishlist.browse': 'Browse the collection',
    'wishlist.note':
      'Saved items are stored locally in this browser — no account required.',
    'wishlist.addAll': 'Add all to bag',
    'wishlist.addedAll': 'Wishlist items added to your bag',

    /* ---------------- search ---------------- */
    'search.eyebrow': 'Search',
    'search.title': 'Find Your Piece',
    'search.intro': 'Search by product name, category, material or the room you have in mind.',
    'search.placeholder': 'Try “oak”, “sofa” or “lighting”',
    'search.button': 'Search',
    'search.resultCount': '{count} result',
    'search.resultCountPlural': '{count} results',
    'search.for': 'for',
    'search.sortResults': 'Sort results',
    'search.clear': 'Clear',
    'search.emptyTitle': 'No products found',
    'search.emptyText':
      'Nothing matched “{query}”. Try a broader term such as “oak”, “sofa” or “storage”.',
    'search.browseAll': 'Browse all products',
    'search.startTitle': 'Start typing to search',
    'search.startText':
      'Our catalogue covers living room, bedroom, dining, office, storage, lighting, decor and outdoor furniture.',

    /* ---------------- journal ---------------- */
    'journal.eyebrow': 'Inspiration',
    'journal.title': 'The Journal',
    'journal.intro':
      'Styling ideas, care guides and honest notes on sustainable furniture — written by the people who make and use it.',
    'journal.all': 'All',
    'journal.filterAria': 'Filter articles by category',
    'journal.emptyTitle': 'No articles in this category yet',
    'journal.emptyText': 'Try another category to keep reading.',
    'journal.showAll': 'Show all articles',
    'journal.shopCollection': 'Shop the collection',
    'journal.inThisJournal': 'In this journal',
    'journal.sideText':
      'Practical notes on materials, styling and looking after furniture properly.',
    'journal.allArticles': 'All articles',
    'journal.keepReading': 'Keep reading',
    'journal.viewAll': 'View all',
    'breadcrumb.journal': 'Journal',

    /* ---------------- about ---------------- */
    'about.heroEyebrow': 'Our story',
    'about.heroTitle': 'Furniture made slowly, for lives lived well',
    'about.heroAlt': 'Hand tools laid out for furniture making',
    'about.philosophyEyebrow': 'Philosophy',
    'about.philosophyTitle': 'Design that gets out of the way',
    'about.p1':
      'Nordic Living began with a simple frustration: most furniture is designed to be photographed, not lived with. We wanted the opposite — pieces that are comfortable on the first evening and still right a decade later.',
    'about.p2':
      'Everything starts with the material. If a timber or textile cannot take daily use and improve with it, it does not make it into the collection. That constraint shapes the proportions, the finishes and, honestly, the price.',
    'about.p3':
      'We work with a small number of long-standing workshops in Denmark, Germany and Poland, all audited annually, all paid on standard terms. Small runs, made properly.',
    'about.materialsEyebrow': 'Our materials',
    'about.materialsTitle': 'What we build with',
    'about.materialsAlt': 'Woven textile detail in a warm neutral interior',
    'about.oakTitle': 'European oak & beech',
    'about.oakText':
      'FSC-certified, sourced from managed forests in Germany, Denmark and Poland. Finished with hard-wax oil or water-based lacquer.',
    'about.linenTitle': 'Linen & wool textiles',
    'about.linenText':
      'Heavyweight linen blends of at least 72% linen, and undyed wool where durability matters more than drape.',
    'about.stonewareTitle': 'Stoneware & ceramics',
    'about.stonewareText':
      'Hand-thrown in small batches with food-safe matte glazes. Every piece varies slightly, which is the point.',
    'about.sustainabilityEyebrow': 'Sustainability',
    'about.sustainabilityTitle': 'Better homes, a brighter planet',
    'about.sustainabilityText':
      'We are not claiming to be carbon neutral, because we are not. Here is what we actually do, and what is still missing.',
    'about.missingTitle': 'What is still missing',
    'about.missingText':
      'We do not yet publish a verified product-level carbon footprint, and our packaging is plastic-free for furniture but not for every small accessory. Both are on the roadmap — we would rather say so than round up.',
    'about.ctaTitle': 'Ready to see the collection?',
    'about.ctaText': 'Browse every piece, or read the journal for styling ideas.',
    'about.shopAll': 'Shop all products',
    'about.readJournal': 'Read the journal',

    /* ---------------- contact ---------------- */
    'contact.eyebrow': 'Contact',
    'contact.title': 'Talk to Us',
    'contact.intro':
      'Questions about a product, a delivery or a trade project — we answer every message within one working day.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.sending': 'Sending…',
    'contact.doneTitle': 'Message validated',
    'contact.doneText':
      'Thank you, {name}. Your message is complete and ready to send — but this environment has no contact backend connected, so nothing has been transmitted or stored yet.',
    'contact.doneText2':
      'Connect a form handler or email service to start receiving these submissions.',
    'contact.writeAnother': 'Write another message',
    'contact.customerCare': 'Customer care',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    'contact.hours': 'Opening hours',
    'contact.phoneMissing':
      'Not configured — add your business number in site settings.',
    'contact.addressMissing':
      'Not configured — add your studio address in site settings.',
    'contact.hoursValue': 'Monday – Friday, 09:00 – 17:00 CET',
    'contact.emailNotice':
      'The email above is a placeholder address. Replace it with your real support inbox before launch.',
    'contact.errName': 'Please enter your name.',
    'contact.errEmail': 'Please enter a valid email address.',
    'contact.errSubject': 'Please add a subject.',
    'contact.errMessage': 'Please write at least 10 characters.',

    /* ---------------- faq ---------------- */
    'faq.eyebrow': 'Help centre',
    'faq.title': 'Frequently Asked Questions',
    'faq.intro':
      'Shipping, returns, materials, product care and ordering — answered in plain language.',
    'faq.onThisPage': 'On this page',
    'faq.sectionsAria': 'FAQ sections',
    'faq.stillNeedHelp': 'Still need help?',
    'faq.helpText': 'Our customer care team answers every message within one working day.',
    'faq.contactUs': 'Contact us',

    /* ---------------- shipping & returns ---------------- */
    'shipping.eyebrow': 'Customer care',
    'shipping.title': 'Shipping & Returns',
    'shipping.intro':
      'How your order travels, what it costs, and how to send something back if it is not right.',
    'shipping.heading': 'Shipping',
    'shipping.returnsHeading': 'Returns & exchanges',
    'shipping.startTitle': 'Need to start a return?',
    'shipping.startText':
      'Order-based self-service returns require an orders backend, which is not connected yet. Until then, message our care team and we will arrange collection.',
    'shipping.contactCare': 'Contact customer care',

    /* ---------------- legal ---------------- */
    'privacy.eyebrow': 'Legal',
    'privacy.title': 'Privacy Policy',
    'privacy.intro': 'What we collect, why we collect it, and how you can ask us to remove it.',
    'terms.eyebrow': 'Legal',
    'terms.title': 'Terms of Service',
    'terms.intro': 'The terms that apply when you order from Nordic Living.',

    /* ---------------- account ---------------- */
    'account.eyebrow': 'Account',
    'account.title': 'Your Account',
    'account.intro':
      'Customer accounts are not connected in this environment yet — here is what is available right now instead.',
    'account.notice':
      'No authentication provider is connected, so this store does not simulate a secure account or show fake order history. Your bag and wishlist are stored locally in this browser only.',
    'account.yourBag': 'Your Bag',
    'account.itemsWaiting': '{count} item waiting',
    'account.itemsWaitingPlural': '{count} items waiting',
    'account.yourWishlist': 'Your Wishlist',
    'account.savedPieces': '{count} saved piece',
    'account.savedPiecesPlural': '{count} saved pieces',
    'account.recentlyViewed': 'Recently Viewed',
    'account.nothingViewed': 'Nothing viewed yet',
    'account.signIn': 'Sign in',
    'account.signInText':
      'Sign-in is intentionally disabled until an authentication provider is connected. Rather than collecting an email and password that go nowhere, this form is not shown.',
    'account.contactAboutOrder': 'Contact us about your order',
    'account.whatAccountsAdd': 'What connecting accounts would add',
    'account.featureSignIn': 'Sign in and create an account',
    'account.featureHistory': 'Stored order history with tracking',
    'account.featureWishlist': 'Server-side wishlist that follows you between devices',
    'account.featureAddresses': 'Saved addresses for faster checkout',

    /* ---------------- checkout ---------------- */
    'checkout.eyebrow': 'Checkout',
    'checkout.title': 'Checkout',
    'checkout.intro':
      'Complete your delivery details. Payment is handled by the connected provider — never by this application.',
    'checkout.notice':
      'This checkout validates and calculates correctly, but no payment provider or orders database is connected yet, so it cannot complete a real order.',
    'checkout.emptyTitle': 'There is nothing to check out',
    'checkout.emptyText':
      'Add a piece to your bag first, then return here to complete your order.',
    'checkout.browse': 'Browse the collection',
    'checkout.blockedTitle': 'Payment Not Connected',
    'checkout.blockedNotice':
      'Your details passed validation, but no payment provider is connected to this environment — so no order has been placed and no payment has been taken.',
    'checkout.blockedText':
      'To accept real payments you need to connect a payment provider and create an orders table so completed orders are stored server-side. Nothing about your card is ever handled by this application.',
    'checkout.backToBag': 'Back to bag',
    'checkout.emptyAndRestart': 'Empty bag and start again',
    'checkout.contactInfo': 'Contact information',
    'checkout.firstName': 'First name',
    'checkout.lastName': 'Last name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone (optional)',
    'checkout.deliveryAddress': 'Delivery address',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.postcode': 'Postcode',
    'checkout.country': 'Country',
    'checkout.notes': 'Delivery notes (optional)',
    'checkout.notesPlaceholder': 'Access details, preferred delivery window…',
    'checkout.correctFields': 'Please correct the highlighted fields.',
    'checkout.continueToPayment': 'Continue to payment',
    'checkout.checking': 'Checking…',
    'checkout.yourOrder': 'Your Order',
    'checkout.qty': 'Qty',
    'checkout.footnote':
      'Free delivery on orders over {threshold}. Card details are never stored by Nordic Living.',
    'checkout.errFirstName': 'Please enter your first name.',
    'checkout.errLastName': 'Please enter your last name.',
    'checkout.errEmail': 'Please enter a valid email address.',
    'checkout.errAddress': 'Please enter a delivery address.',
    'checkout.errCity': 'Please enter a city.',
    'checkout.errPostcode': 'Please enter a postcode.',
    'checkout.errCountry': 'Please enter a country.',

    /* ---------------- not found ---------------- */
    'notFound.eyebrow': 'Error 404',
    'notFound.title': 'This page has moved on',
    'notFound.text':
      'The page you were looking for does not exist, or the link is out of date. Try one of these instead.',
    'notFound.backHome': 'Back to home',
    'notFound.shopAll': 'Shop all products',

    /* ---------------- store notifications ---------------- */
    'store.addedToBag': '{name} added to your bag',
    'store.removedFromWishlist': '{name} removed from your wishlist',
    'store.savedToWishlist': '{name} saved to your wishlist',

    /* ---------------- accessibility ---------------- */
    'a11y.ratedOutOf5': 'Rated {value} out of 5 stars',
    'a11y.breadcrumb': 'Breadcrumb',
    'a11y.quantity': 'Quantity',
    'a11y.decrease': 'Decrease {label}',
    'a11y.increase': 'Increase {label}',
    'a11y.quantityValue': '{label}: {value}',
    'a11y.imageUnavailable': 'Image unavailable',

    /* ---------------- inline image alt text ---------------- */
    'alt.inspiration1': 'Woven textile detail in a warm neutral interior',
    'alt.inspiration2': 'Indoor plant styled beside a warm timber wall',
    'alt.inspiration3': 'Sideboard, round mirror and indoor trees',
    'alt.inspiration4': 'Hand tools laid out for furniture making',
    'alt.inspirationHero':
      'Living room with arched windows, a fireplace and soft armchairs',
    'alt.brandStory': 'Dining room with a long wooden table and soft daylight',
    'alt.newsletter': 'Console table styled with plants in soft daylight',
  },

  fa: {
    /* ---------------- layout ---------------- */
    'layout.skipToContent': 'پرش به محتوا',

    /* ---------------- announcement ---------------- */
    'announce.freeShipping': 'ارسال رایگان برای سفارش‌های بالای ۴۹۹ دلار',
    'announce.returns': '۳۰ روز بازگشت آسان',
    'announce.sustainable': 'مبلمان پایدار برای فردایی بهتر',

    /* ---------------- language switcher ---------------- */
    'lang.label': 'زبان',
    'lang.en': 'انگلیسی',
    'lang.fa': 'فارسی',
    'lang.enShort': 'EN',
    'lang.faShort': 'FA',

    /* ---------------- header ---------------- */
    'header.home': 'نوردیک لیوینگ — خانه',
    'header.tagline': 'مبلمان اسکاندیناوی',
    'header.mainNav': 'اصلی',
    'header.menu': 'منوی {label}',
    'header.submenu': 'زیرمنوی {label}',
    'header.searchProducts': 'جست‌وجوی محصولات',
    'header.account': 'حساب کاربری',
    'header.wishlist': 'علاقه‌مندی‌ها',
    'header.bag': 'سبد خرید',
    'header.openMenu': 'باز کردن منو',
    'header.closeMenu': 'بستن منو',
    'header.siteMenu': 'منوی سایت',
    'header.mobileNav': 'موبایل',
    'header.shopByCategory': 'خرید بر اساس دسته‌بندی',
    'header.wishlistCount': 'علاقه‌مندی‌ها ({count})',
    'header.bagCount': 'سبد ({count})',
    'header.itemsCount': '{label}، {count} مورد',
    'header.searchPlaceholder': 'جست‌وجوی مبل، میز، روشنایی…',
    'header.search': 'جست‌وجو',

    /* ---------------- navigation ---------------- */
    'nav.home': 'خانه',
    'nav.shop': 'فروشگاه',
    'nav.collections': 'مجموعه‌ها',
    'nav.about': 'درباره ما',
    'nav.inspiration': 'الهام',
    'nav.contact': 'تماس',
    'nav.allProducts': 'همه محصولات',
    'nav.modernLivingRoom': 'نشیمن مدرن',
    'nav.restfulBedroom': 'اتاق خواب آرام',
    'nav.gatherDine': 'دورهمی و پذیرایی',
    'nav.newArrivals': 'تازه‌ها',
    'nav.bestsellers': 'پرفروش‌ها',

    /* ---------------- footer ---------------- */
    'footer.shop': 'فروشگاه',
    'footer.about': 'درباره',
    'footer.customerCare': 'خدمات مشتریان',
    'footer.ourStory': 'داستان ما',
    'footer.sustainability': 'پایداری',
    'footer.materials': 'مواد ما',
    'footer.journal': 'مجله',
    'footer.contact': 'تماس',
    'footer.trackOrder': 'پیگیری سفارش',
    'footer.returnsExchanges': 'بازگشت و تعویض',
    'footer.shippingInfo': 'اطلاعات ارسال',
    'footer.faqs': 'پرسش‌های متداول',
    'footer.privacy': 'سیاست حفظ حریم خصوصی',
    'footer.terms': 'شرایط استفاده',
    'footer.rights': '© {year} نوردیک لیوینگ. همه حقوق محفوظ است.',
    'footer.pledge': 'چوب دارای گواهی FSC · ارسال با کربن کمتر · ساخته‌شده برای تعمیر',
    'footer.socialNote': 'پروفایل‌های شبکه‌های اجتماعی پس از تنظیم در تنظیمات سایت نمایش داده می‌شوند.',
    'footer.socialNewTab': '{label} (در زبانه جدید باز می‌شود)',
    'footer.socialUnconfigured': '{label} — پیوند تنظیم نشده است',
    'footer.linkNotConfigured': 'پیوند {label} هنوز تنظیم نشده است',
    'footer.tagline': 'مبلمانی اندیشیده برای زندگی زیباتر، راحت‌تر و پایدارتر.',

    /* ---------------- hero ---------------- */
    'hero.carousel': 'مجموعه‌های ویژه',
    'hero.slideOf': '{n} از {total}: {caption}',
    'hero.prev': 'اسلاید قبلی',
    'hero.next': 'اسلاید بعدی',
    'hero.live': 'اسلاید {n} از {total}: {caption}',

    /* ---------------- home sections ---------------- */
    'home.whyShop': 'چرا از نوردیک لیوینگ خرید کنیم',
    'home.brandValues': 'ارزش‌های برند ما',
    'home.shopByCategory': 'خرید بر اساس دسته‌بندی',
    'home.findFurniture': 'مبلمان مناسب هر فضا',
    'home.viewAll': 'مشاهده همه',
    'home.bestsellers': 'پرفروش‌ها',
    'home.mostLoved': 'محبوب‌ترین مبلمان ما',
    'home.brandEyebrow': 'راهی زیباتر برای زندگی',
    'home.brandTitle': 'طراحی ماندگار برای زندگی مدرن',
    'home.brandText':
      'ما مبلمانی کاربردی و زیبا با مواد پایدار و صنعت‌گری اندیشیده می‌سازیم. هر قطعه برای تعمیر، روغن‌کاری دوباره و ماندن در خانواده طراحی شده است — نه برای جایگزینی.',
    'home.ourStory': 'داستان ما',
    'home.betterHomes': 'خانه‌های بهتر. سیاره‌ای روشن‌تر.',
    'home.inspireEyebrow': 'به فضای خود الهام ببخشید',
    'home.inspireTitle': 'تغییرهای کوچک، تفاوت‌های بزرگ',
    'home.inspireText':
      'ایده‌های خلاقانه، نکته‌های چیدمان و خانه‌های واقعی با مبلمان نوردیک لیوینگ را کشف کنید — از چراغی که یک شب را دگرگون می‌کند تا مبلی که کاربرد یک اتاق را تغییر می‌دهد.',
    'home.getInspired': 'الهام بگیرید',
    'home.goodDesign': 'طراحی خوب. روزهای بهتر.',
    'home.testimonialsEyebrow': 'مشتریان ما چه می‌گویند',
    'home.testimonialsTitle': 'محبوب در خانه‌های واقعی',
    'home.testimonialsNotice':
      'نمونه‌ای از نظرات برای محیط توسعه. هیچ سابقه سفارشی پشت آن‌ها نیست، بنابراین هیچ‌کدام به‌عنوان خرید تأییدشده نمایش داده نمی‌شوند.',
    'home.prevTestimonials': 'نظرات قبلی',
    'home.nextTestimonials': 'نظرات بعدی',
    'home.socialEyebrow': 'ما را دنبال کنید @nordicliving',
    'home.socialTitle': 'خانه‌های واقعی. الهام واقعی.',
    'home.socialAction': 'مشاهده در اینستاگرام',
    'home.socialNoProfile':
      'هیچ پروفایل اینستاگرامی برای این فروشگاه تنظیم نشده، بنابراین این تصاویر پیوندی ندارند.',
    'home.socialAria': 'باز کردن {handle} در اینستاگرام (در زبانه جدید)',
    'home.socialAriaUnconfigured': 'پیوند اینستاگرام تنظیم نشده است',
    'home.instagramNotConfigured': 'پیوند اینستاگرام هنوز تنظیم نشده است',

    /* ---------------- newsletter ---------------- */
    'newsletter.eyebrow': 'خبرنامه',
    'newsletter.title': 'به جمع ما بپیوندید',
    'newsletter.text':
      'پیشنهادهای ویژه، محصولات تازه و الهام‌بخش را مستقیم در صندوق ایمیل خود دریافت کنید.',
    'newsletter.emailLabel': 'نشانی ایمیل',
    'newsletter.placeholder': 'your@email.com',
    'newsletter.subscribe': 'عضویت',
    'newsletter.subscribing': 'در حال ثبت…',
    'newsletter.subscribed': 'عضو شدید',
    'newsletter.invalidEmail': 'لطفاً یک نشانی ایمیل معتبر وارد کنید.',
    'newsletter.success':
      'سپاسگزاریم. این فرم هنوز به فهرست پستی متصل نیست، بنابراین هیچ نشانی ذخیره نشده است.',
    'newsletter.notice':
      'برای راه‌اندازی، یک سرویس ایمیل متصل کنید و عضویت‌ها را در سرور ذخیره کنید — این فرم فعلاً فقط در مرورگر اجرا می‌شود.',

    /* ---------------- product card / badges ---------------- */
    'product.imageUnavailable': 'تصویر در دسترس نیست',
    'product.addToCart': 'افزودن به سبد',
    'product.view': 'مشاهده {name}',
    'product.saveToWishlist': 'افزودن {name} به علاقه‌مندی‌ها',
    'product.removeFromWishlist': 'حذف {name} از علاقه‌مندی‌ها',
    'product.addToBag': 'افزودن {name} به سبد',
    'badge.Bestseller': 'پرفروش',
    'badge.New': 'جدید',

    /* ---------------- filters ---------------- */
    'filters.search': 'جست‌وجو',
    'filters.searchPlaceholder': 'جست‌وجوی محصولات',
    'filters.category': 'دسته‌بندی',
    'filters.allProducts': 'همه محصولات',
    'filters.price': 'قیمت',
    'filters.upTo': 'تا {price}',
    'filters.clear': 'حذف فیلترها',
    'common.productFilters': 'فیلترهای محصول',

    /* ---------------- shop ---------------- */
    'shop.eyebrow': 'فروشگاه',
    'shop.title': 'همه محصولات',
    'shop.intro':
      'هر قطعه در مجموعه نوردیک لیوینگ — چوب یکپارچه، پارچه‌های طبیعی و روکش‌هایی که برای زیباتر شدن با گذر زمان انتخاب شده‌اند.',
    'shop.productCount': '{count} محصول',
    'shop.productCountPlural': '{count} محصول',
    'shop.filters': 'فیلترها',
    'shop.sortProducts': 'مرتب‌سازی محصولات',
    'shop.emptyTitle': 'هیچ محصولی با این فیلترها مطابقت ندارد',
    'shop.emptyText':
      'محدوده قیمت را گسترده‌تر کنید، عبارت جست‌وجو را پاک کنید یا دسته‌بندی دیگری انتخاب کنید.',

    /* ---------------- category ---------------- */
    'category.emptyTitle': 'هیچ چیزی در {category} با این فیلترها مطابقت ندارد',
    'category.emptyText': 'محدوده قیمت را گسترده‌تر کنید یا عبارت جست‌وجو را پاک کنید.',
    'category.keepExploring': 'کاوش بیشتر',
    'category.imageAlt': 'مبلمان {name} از نوردیک لیوینگ',
    'category.thumbAlt': 'مبلمان {name}',
    'breadcrumb.home': 'خانه',
    'breadcrumb.shop': 'فروشگاه',

    /* ---------------- product detail ---------------- */
    'pdp.readReviews': 'خواندن نظرات',
    'pdp.save': 'صرفه‌جویی {amount}',
    'pdp.finish': 'رنگ',
    'pdp.finishAria': 'رنگ: {name}',
    'pdp.removeWishlist': 'حذف از علاقه‌مندی‌ها',
    'pdp.saveWishlist': 'افزودن به علاقه‌مندی‌ها',
    'pdp.freeDelivery': 'ارسال رایگان برای سفارش‌های بالای {threshold}',
    'pdp.returns': '۳۰ روز بازگشت، برای مبلمان با دریافت رایگان',
    'pdp.secure': 'پرداخت امن — اطلاعات کارت ذخیره نمی‌شود',
    'pdp.showImage': 'نمایش تصویر {n} از {name}',
    'pdp.detailsDescription': 'توضیحات',
    'pdp.detailsMaterials': 'مواد و ابعاد',
    'pdp.detailsCare': 'دستور نگهداری',
    'pdp.detailsShipping': 'ارسال و بازگشت',
    'pdp.shippingAnswer':
      'ارسال استاندارد {shipping} است و برای سفارش‌های بالای {threshold} رایگان می‌شود. مبلمان بزرگ رایگان و توسط تیمی دو نفره تحویل داده می‌شود. برای بازگرداندن این قطعه در وضعیت اصلی خود ۳۰ روز فرصت دارید.',
    'pdp.reviewsEyebrow': 'نظرات',
    'pdp.basedOn': 'بر اساس {count} امتیاز مشتریان',
    'pdp.reviewsNote1':
      'امتیازها و تعداد نظرات نمایش‌داده‌شده از رکورد کاتالوگ این محصول می‌آید. متن نظرات فردی در این محیط ذخیره نمی‌شود، بنابراین به‌جای ساختن نظرات ساختگی، هیچ نظر نوشته‌ای نمایش داده نمی‌شود.',
    'pdp.reviewsNote2':
      'اتصال یک سرویس نظرات (یا جدول سفارش‌ها) امکان نمایش نظرات تأییدشده هر مشتری را در اینجا فراهم می‌کند.',
    'pdp.alsoLike': 'شاید این‌ها را هم بپسندید',
    'pdp.viewAll': 'مشاهده همه',
    'pdp.recentlyViewed': 'اخیراً دیده‌شده',

    /* ---------------- cart ---------------- */
    'cart.eyebrow': 'سبد خرید',
    'cart.title': 'سبد شما',
    'cart.titleWithCount': 'سبد شما ({count})',
    'cart.intro': 'جمع کل از اقلام سبد شما با احتساب مالیات و ارسال محاسبه می‌شود.',
    'cart.emptyTitle': 'سبد شما خالی است',
    'cart.emptyText': 'مجموعه را مرور کنید و چیزی را بیفزایید که ده سال بعد هم دوستش داشته باشید.',
    'cart.continueShopping': 'ادامه خرید',
    'cart.finish': 'رنگ: {name}',
    'cart.remove': 'حذف {name} از سبد',
    'cart.each': 'هر کدام {price}',
    'cart.summary': 'خلاصه سفارش',
    'cart.subtotal': 'جمع جزء',
    'cart.delivery': 'ارسال',
    'cart.tax': 'مالیات برآوردی',
    'cart.total': 'مجموع',
    'cart.free': 'رایگان',
    'cart.addForFree': 'برای ارسال رایگان {price} دیگر اضافه کنید',
    'cart.freeUnlocked': 'ارسال رایگان فعال شد',
    'cart.progressAria': 'پیشرفت تا ارسال رایگان',
    'cart.checkout': 'تکمیل خرید',
    'cart.disclaimer':
      'مالیات و ارسال در این محیط برآوردی است. هنوز هیچ سرویس پرداختی متصل نیست، بنابراین تکمیل خرید امکان دریافت پرداخت واقعی ندارد.',

    /* ---------------- wishlist ---------------- */
    'wishlist.eyebrow': 'علاقه‌مندی‌ها',
    'wishlist.title': 'قطعه‌های ذخیره‌شده',
    'wishlist.titleWithCount': 'قطعه‌های ذخیره‌شده ({count})',
    'wishlist.intro': 'هر چیزی که ذخیره کرده‌اید، تا زمان سفارش در همین مرورگر نگه داشته می‌شود.',
    'wishlist.emptyTitle': 'فهرست علاقه‌مندی‌های شما خالی است',
    'wishlist.emptyText': 'روی قلب هر محصول بزنید تا برای بعد اینجا ذخیره شود.',
    'wishlist.browse': 'مرور مجموعه',
    'wishlist.note': 'اقلام ذخیره‌شده به‌صورت محلی در همین مرورگر نگهداری می‌شوند — نیازی به حساب کاربری نیست.',
    'wishlist.addAll': 'افزودن همه به سبد',
    'wishlist.addedAll': 'اقلام علاقه‌مندی به سبد شما افزوده شد',

    /* ---------------- search ---------------- */
    'search.eyebrow': 'جست‌وجو',
    'search.title': 'قطعه خود را پیدا کنید',
    'search.intro': 'بر اساس نام محصول، دسته‌بندی، مواد یا اتاقی که در ذهن دارید جست‌وجو کنید.',
    'search.placeholder': 'مثلاً «بلوط»، «مبل» یا «روشنایی»',
    'search.button': 'جست‌وجو',
    'search.resultCount': '{count} نتیجه',
    'search.resultCountPlural': '{count} نتیجه',
    'search.for': 'برای',
    'search.sortResults': 'مرتب‌سازی نتایج',
    'search.clear': 'پاک کردن',
    'search.emptyTitle': 'محصولی یافت نشد',
    'search.emptyText':
      'هیچ چیزی با «{query}» مطابقت نداشت. عبارت گسترده‌تری مانند «بلوط»، «مبل» یا «ذخیره‌سازی» را امتحان کنید.',
    'search.browseAll': 'مرور همه محصولات',
    'search.startTitle': 'برای جست‌وجو تایپ کنید',
    'search.startText':
      'کاتالوگ ما شامل مبلمان نشیمن، اتاق خواب، غذاخوری، دفتر کار، ذخیره‌سازی، روشنایی، دکور و فضای باز است.',

    /* ---------------- journal ---------------- */
    'journal.eyebrow': 'الهام',
    'journal.title': 'مجله',
    'journal.intro':
      'ایده‌های چیدمان، راهنمای نگهداری و یادداشت‌های صادقانه درباره مبلمان پایدار — نوشته کسانی که آن را می‌سازند و به کار می‌برند.',
    'journal.all': 'همه',
    'journal.filterAria': 'فیلتر مقاله‌ها بر اساس دسته‌بندی',
    'journal.emptyTitle': 'هنوز مقاله‌ای در این دسته نیست',
    'journal.emptyText': 'برای ادامه مطالعه دسته دیگری را امتحان کنید.',
    'journal.showAll': 'نمایش همه مقاله‌ها',
    'journal.shopCollection': 'خرید از مجموعه',
    'journal.inThisJournal': 'در این مجله',
    'journal.sideText': 'یادداشت‌های کاربردی درباره مواد، چیدمان و نگهداری درست مبلمان.',
    'journal.allArticles': 'همه مقاله‌ها',
    'journal.keepReading': 'ادامه مطالعه',
    'journal.viewAll': 'مشاهده همه',
    'breadcrumb.journal': 'مجله',

    /* ---------------- about ---------------- */
    'about.heroEyebrow': 'داستان ما',
    'about.heroTitle': 'مبلمانی که آهسته ساخته می‌شود، برای زندگی‌هایی که خوب گذرانده می‌شوند',
    'about.heroAlt': 'ابزارهای دستی چیده‌شده برای ساخت مبلمان',
    'about.philosophyEyebrow': 'فلسفه',
    'about.philosophyTitle': 'طراحی‌ای که کنار می‌رود',
    'about.p1':
      'نوردیک لیوینگ با یک دلخوری ساده آغاز شد: بیشتر مبلمان برای عکاسی طراحی می‌شود، نه برای زندگی. ما خلاف این را می‌خواستیم — قطعه‌هایی که همان شب نخست راحت‌اند و یک دهه بعد هم درست‌اند.',
    'about.p2':
      'همه‌چیز با مواد شروع می‌شود. اگر چوب یا پارچه‌ای نتواند استفاده روزمره را بپذیرد و با آن بهتر شود، وارد مجموعه نمی‌شود. همین محدودیت شکل نسبت‌های ابعادی، روکش‌ها و صادقانه بگویم، قیمت را تعیین می‌کند.',
    'about.p3':
      'ما با شمار اندکی کارگاه دیرپا در دانمارک، آلمان و لهستان کار می‌کنیم؛ همه سالانه بازرسی می‌شوند و همه با شرایط استاندارد پرداخت می‌گیرند. تیراژهای کوچک، درست ساخته‌شده.',
    'about.materialsEyebrow': 'مواد ما',
    'about.materialsTitle': 'با چه می‌سازیم',
    'about.materialsAlt': 'جزئیات پارچه بافته‌شده در فضایی گرم و خنثی',
    'about.oakTitle': 'بلوط و راش اروپایی',
    'about.oakText':
      'دارای گواهی FSC، تأمین‌شده از جنگل‌های مدیریت‌شده در آلمان، دانمارک و لهستان. با روغن موم سخت یا لاک پایه‌آب پرداخت می‌شود.',
    'about.linenTitle': 'پارچه‌های کتان و پشم',
    'about.linenText':
      'ترکیب‌های کتان سنگین با دست‌کم ۷۲٪ کتان، و پشم رنگ‌نشده در جاهایی که دوام مهم‌تر از لطافت است.',
    'about.stonewareTitle': 'سفال سنگین و سرامیک',
    'about.stonewareText':
      'دست‌ساز در تیراژهای کوچک با لعاب مات و ایمن برای مواد غذایی. هر قطعه کمی متفاوت است و همین نکته اصلی است.',
    'about.sustainabilityEyebrow': 'پایداری',
    'about.sustainabilityTitle': 'خانه‌های بهتر، سیاره‌ای روشن‌تر',
    'about.sustainabilityText':
      'ما ادعا نمی‌کنیم کربن‌خنثی هستیم، چون نیستیم. این چیزی است که واقعاً انجام می‌دهیم و آنچه هنوز کم داریم.',
    'about.missingTitle': 'چه چیزی هنوز کم است',
    'about.missingText':
      'ما هنوز ردپای کربن تأییدشده در سطح محصول را منتشر نمی‌کنیم و بسته‌بندی ما برای مبلمان بدون پلاستیک است، اما نه برای همه لوازم کوچک. هر دو در برنامه راه‌اندازی هستند — ترجیح می‌دهیم این را بگوییم تا آنکه آن را گِرد کنیم.',
    'about.ctaTitle': 'آماده دیدن مجموعه هستید؟',
    'about.ctaText': 'همه قطعه‌ها را مرور کنید یا برای ایده‌های چیدمان مجله را بخوانید.',
    'about.shopAll': 'خرید همه محصولات',
    'about.readJournal': 'خواندن مجله',

    /* ---------------- contact ---------------- */
    'contact.eyebrow': 'تماس',
    'contact.title': 'با ما گفت‌وگو کنید',
    'contact.intro':
      'پرسشی درباره یک محصول، ارسال یا پروژه تجاری دارید؟ به هر پیام در یک روز کاری پاسخ می‌دهیم.',
    'contact.name': 'نام',
    'contact.email': 'ایمیل',
    'contact.subject': 'موضوع',
    'contact.message': 'پیام',
    'contact.send': 'ارسال پیام',
    'contact.sending': 'در حال ارسال…',
    'contact.doneTitle': 'پیام اعتبارسنجی شد',
    'contact.doneText':
      'سپاسگزاریم، {name}. پیام شما کامل و آماده ارسال است — اما این محیط هیچ سرویس پشتیبان تماسی ندارد، بنابراین چیزی ارسال یا ذخیره نشده است.',
    'contact.doneText2': 'برای دریافت این پیام‌ها یک سرویس فرم یا ایمیل متصل کنید.',
    'contact.writeAnother': 'نوشتن پیام دیگر',
    'contact.customerCare': 'خدمات مشتریان',
    'contact.phone': 'تلفن',
    'contact.address': 'نشانی',
    'contact.hours': 'ساعات کاری',
    'contact.phoneMissing': 'تنظیم نشده — شماره کسب‌وکار خود را در تنظیمات سایت اضافه کنید.',
    'contact.addressMissing': 'تنظیم نشده — نشانی استودیوی خود را در تنظیمات سایت اضافه کنید.',
    'contact.hoursValue': 'دوشنبه تا جمعه، ۹:۰۰ تا ۱۷:۰۰ به وقت اروپای مرکزی',
    'contact.emailNotice':
      'نشانی ایمیل بالا یک نشانی نمونه است. پیش از راه‌اندازی آن را با صندوق پشتیبانی واقعی خود جایگزین کنید.',
    'contact.errName': 'لطفاً نام خود را وارد کنید.',
    'contact.errEmail': 'لطفاً یک نشانی ایمیل معتبر وارد کنید.',
    'contact.errSubject': 'لطفاً یک موضوع بنویسید.',
    'contact.errMessage': 'لطفاً دست‌کم ۱۰ نویسه بنویسید.',

    /* ---------------- faq ---------------- */
    'faq.eyebrow': 'مرکز راهنمایی',
    'faq.title': 'پرسش‌های متداول',
    'faq.intro':
      'ارسال، بازگشت، مواد، نگهداری محصول و سفارش — با زبانی ساده پاسخ داده شده است.',
    'faq.onThisPage': 'در این صفحه',
    'faq.sectionsAria': 'بخش‌های پرسش‌های متداول',
    'faq.stillNeedHelp': 'هنوز کمک لازم دارید؟',
    'faq.helpText': 'تیم خدمات مشتریان ما به هر پیام در یک روز کاری پاسخ می‌دهد.',
    'faq.contactUs': 'تماس با ما',

    /* ---------------- shipping & returns ---------------- */
    'shipping.eyebrow': 'خدمات مشتریان',
    'shipping.title': 'ارسال و بازگشت',
    'shipping.intro':
      'سفارش شما چگونه سفر می‌کند، چه هزینه‌ای دارد و اگر مناسب نبود چگونه آن را بازگردانید.',
    'shipping.heading': 'ارسال',
    'shipping.returnsHeading': 'بازگشت و تعویض',
    'shipping.startTitle': 'نیاز به شروع بازگشت دارید؟',
    'shipping.startText':
      'بازگشت‌های خودکار بر پایه سفارش به یک سرویس سفارش‌ها نیاز دارد که هنوز متصل نیست. تا آن زمان به تیم خدمات ما پیام دهید تا دریافت را ترتیب دهیم.',
    'shipping.contactCare': 'تماس با خدمات مشتریان',

    /* ---------------- legal ---------------- */
    'privacy.eyebrow': 'حقوقی',
    'privacy.title': 'سیاست حفظ حریم خصوصی',
    'privacy.intro': 'چه اطلاعاتی جمع می‌کنیم، چرا و چگونه می‌توانید درخواست حذف آن را بدهید.',
    'terms.eyebrow': 'حقوقی',
    'terms.title': 'شرایط استفاده',
    'terms.intro': 'شرایطی که هنگام سفارش از نوردیک لیوینگ اعمال می‌شود.',

    /* ---------------- account ---------------- */
    'account.eyebrow': 'حساب کاربری',
    'account.title': 'حساب شما',
    'account.intro':
      'حساب‌های مشتریان در این محیط هنوز متصل نیستند — در عوض، آنچه اکنون در دسترس است را ببینید.',
    'account.notice':
      'هیچ سرویس احراز هویتی متصل نیست، بنابراین این فروشگاه حساب امنی را شبیه‌سازی نمی‌کند و تاریخچه سفارش ساختگی نشان نمی‌دهد. سبد و علاقه‌مندی‌های شما فقط به‌صورت محلی در همین مرورگر ذخیره می‌شوند.',
    'account.yourBag': 'سبد شما',
    'account.itemsWaiting': '{count} مورد در انتظار',
    'account.itemsWaitingPlural': '{count} مورد در انتظار',
    'account.yourWishlist': 'علاقه‌مندی‌های شما',
    'account.savedPieces': '{count} قطعه ذخیره‌شده',
    'account.savedPiecesPlural': '{count} قطعه ذخیره‌شده',
    'account.recentlyViewed': 'اخیراً دیده‌شده',
    'account.nothingViewed': 'هنوز چیزی دیده نشده',
    'account.signIn': 'ورود',
    'account.signInText':
      'ورود عمداً غیرفعال است تا زمانی که سرویس احراز هویت متصل شود. به‌جای جمع‌آوری ایمیلی که به جایی نمی‌رسد، این فرم نمایش داده نمی‌شود.',
    'account.contactAboutOrder': 'درباره سفارش خود با ما تماس بگیرید',
    'account.whatAccountsAdd': 'اتصال حساب‌ها چه چیزی اضافه می‌کند',
    'account.featureSignIn': 'ورود و ساخت حساب کاربری',
    'account.featureHistory': 'تاریخچه سفارش ذخیره‌شده همراه با پیگیری',
    'account.featureWishlist': 'علاقه‌مندی‌های سمت سرور که بین دستگاه‌ها همراه شماست',
    'account.featureAddresses': 'نشانی‌های ذخیره‌شده برای تکمیل سریع‌تر خرید',

    /* ---------------- checkout ---------------- */
    'checkout.eyebrow': 'تکمیل خرید',
    'checkout.title': 'تکمیل خرید',
    'checkout.intro':
      'اطلاعات ارسال خود را کامل کنید. پرداخت توسط سرویس متصل انجام می‌شود — نه توسط این برنامه.',
    'checkout.notice':
      'این مرحله درست اعتبارسنجی و محاسبه می‌کند، اما هنوز هیچ سرویس پرداخت یا پایگاه سفارش‌ها متصل نیست، بنابراین نمی‌تواند سفارش واقعی را کامل کند.',
    'checkout.emptyTitle': 'چیزی برای تکمیل خرید نیست',
    'checkout.emptyText': 'ابتدا قطعه‌ای به سبد بیفزایید، سپس برای تکمیل سفارش به اینجا بازگردید.',
    'checkout.browse': 'مرور مجموعه',
    'checkout.blockedTitle': 'پرداخت متصل نیست',
    'checkout.blockedNotice':
      'اطلاعات شما اعتبارسنجی را گذراند، اما هیچ سرویس پرداختی به این محیط متصل نیست — بنابراین سفارشی ثبت نشده و پرداختی انجام نشده است.',
    'checkout.blockedText':
      'برای دریافت پرداخت واقعی باید یک سرویس پرداخت متصل کنید و جدول سفارش‌ها بسازید تا سفارش‌های کامل‌شده در سرور ذخیره شوند. این برنامه هرگز اطلاعات کارت شما را پردازش نمی‌کند.',
    'checkout.backToBag': 'بازگشت به سبد',
    'checkout.emptyAndRestart': 'خالی کردن سبد و شروع دوباره',
    'checkout.contactInfo': 'اطلاعات تماس',
    'checkout.firstName': 'نام',
    'checkout.lastName': 'نام خانوادگی',
    'checkout.email': 'ایمیل',
    'checkout.phone': 'تلفن (اختیاری)',
    'checkout.deliveryAddress': 'نشانی تحویل',
    'checkout.address': 'نشانی',
    'checkout.city': 'شهر',
    'checkout.postcode': 'کد پستی',
    'checkout.country': 'کشور',
    'checkout.notes': 'توضیحات تحویل (اختیاری)',
    'checkout.notesPlaceholder': 'جزئیات دسترسی، بازه زمانی دلخواه تحویل…',
    'checkout.correctFields': 'لطفاً فیلدهای مشخص‌شده را اصلاح کنید.',
    'checkout.continueToPayment': 'ادامه به پرداخت',
    'checkout.checking': 'در حال بررسی…',
    'checkout.yourOrder': 'سفارش شما',
    'checkout.qty': 'تعداد',
    'checkout.footnote':
      'ارسال رایگان برای سفارش‌های بالای {threshold}. اطلاعات کارت هرگز توسط نوردیک لیوینگ ذخیره نمی‌شود.',
    'checkout.errFirstName': 'لطفاً نام خود را وارد کنید.',
    'checkout.errLastName': 'لطفاً نام خانوادگی خود را وارد کنید.',
    'checkout.errEmail': 'لطفاً یک نشانی ایمیل معتبر وارد کنید.',
    'checkout.errAddress': 'لطفاً نشانی تحویل را وارد کنید.',
    'checkout.errCity': 'لطفاً شهر را وارد کنید.',
    'checkout.errPostcode': 'لطفاً کد پستی را وارد کنید.',
    'checkout.errCountry': 'لطفاً کشور را وارد کنید.',

    /* ---------------- not found ---------------- */
    'notFound.eyebrow': 'خطای ۴۰۴',
    'notFound.title': 'این صفحه دیگر اینجا نیست',
    'notFound.text':
      'صفحه‌ای که به دنبال آن بودید وجود ندارد یا پیوند قدیمی است. یکی از این‌ها را امتحان کنید.',
    'notFound.backHome': 'بازگشت به خانه',
    'notFound.shopAll': 'خرید همه محصولات',

    /* ---------------- store notifications ---------------- */
    'store.addedToBag': '{name} به سبد شما افزوده شد',
    'store.removedFromWishlist': '{name} از علاقه‌مندی‌های شما حذف شد',
    'store.savedToWishlist': '{name} به علاقه‌مندی‌های شما ذخیره شد',

    /* ---------------- accessibility ---------------- */
    'a11y.ratedOutOf5': 'امتیاز {value} از ۵ ستاره',
    'a11y.breadcrumb': 'مسیر راهنما',
    'a11y.quantity': 'تعداد',
    'a11y.decrease': 'کاهش {label}',
    'a11y.increase': 'افزایش {label}',
    'a11y.quantityValue': '{label}: {value}',
    'a11y.imageUnavailable': 'تصویر در دسترس نیست',

    /* ---------------- inline image alt text ---------------- */
    'alt.inspiration1': 'جزئیات پارچه بافته‌شده در فضایی گرم و خنثی',
    'alt.inspiration2': 'گیاه آپارتمانی در کنار دیواری چوبی و گرم',
    'alt.inspiration3': 'میز کنسول، آینه گرد و درختان آپارتمانی',
    'alt.inspiration4': 'ابزارهای دستی چیده‌شده برای ساخت مبلمان',
    'alt.inspirationHero': 'اتاق نشیمن با پنجره‌های قوسی، شومینه و صندلی‌های نرم',
    'alt.brandStory': 'اتاق غذاخوری با میز چوبی بلند و نور نرم روز',
    'alt.newsletter': 'میز کنسول آراسته با گیاهان در نور نرم روز',
  },
}

export function translate(lang, key, vars) {
  const dict = ui[lang] || ui.en
  const value = Object.prototype.hasOwnProperty.call(dict, key)
    ? dict[key]
    : Object.prototype.hasOwnProperty.call(ui.en, key)
      ? ui.en[key]
      : key
  return interpolate(value, vars)
}
