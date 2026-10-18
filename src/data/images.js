// Central image strategy.
// Every photograph in the app resolves through `photo()` so sizing, quality and
// sourcing stay consistent. Each Unsplash asset id below was verified twice:
// once for availability (HTTP 200) and once visually, so the subject actually
// matches the product, category or editorial slot it is used in.

const BASE = 'https://images.unsplash.com'

/**
 * Build a sized, cropped Unsplash URL.
 * @param {string} id  asset id, e.g. P.lunaSofa
 * @param {{w?: number, h?: number, q?: number}} [opts]
 */
export function photo(id, opts = {}) {
  const { w = 1200, h, q = 70 } = opts
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    w: String(w),
    q: String(q),
  })
  if (h) params.set('h', String(h))
  return `${BASE}/${id}?${params.toString()}`
}

/** Curated, subject-matched photography pool. */
export const P = {
  // Hero — bright neutral rooms with natural wood
  heroLiving: 'photo-1600607687939-ce8a6c25118c', // white sectional, wood panelling, full-height windows
  heroBedroom: 'photo-1631049307264-da0ec9d70304', // calm bedroom, tufted headboard, white bedding
  heroDining: 'photo-1560448204-61dc36dc98c8', // dining area, oval wooden table, upholstered chairs

  // Categories — one distinct interior per room
  catLiving: 'photo-1583847268964-b28dc8f51f92', // sofa with round wooden coffee table
  catBedroom: 'photo-1595526114035-0d45ed16cfbf', // bedroom, upholstered headboard, black accent chair
  catDining: 'photo-1615529182904-14819c35db37', // dining scene under pendant lights
  catOffice: 'photo-1519974719765-e6559eac2575', // bright room, wooden desk, plant
  catStorage: 'photo-1594026112284-02bb6f3352fe', // wall-mounted shelving with objects
  catLighting: 'photo-1513506003901-1e6a229e2d15', // white pendant lamp
  catDecor: 'photo-1517705008128-361805f42e86', // side table styled with a succulent
  catOutdoor: 'photo-1600607688960-e095ff83135c', // modern house exterior, timber cladding, lawn

  // Products — primary / secondary hover shot, no image reused across products
  lunaSofa: 'photo-1560185127-6ed189bf02f4', // tan three-seater with wooden coffee table
  lunaSofaAlt: 'photo-1600121848594-d8644e57abab', // grey sofa with glass coffee table
  oakChair: 'photo-1598300042247-d088f8ab3a91', // upholstered chair on wooden legs
  oakChairAlt: 'photo-1506439773649-6e0eb8cfb237', // wooden chair on grass
  renoTable: 'photo-1618221195710-dd6b41faaea6', // wooden coffee table in a cosy living room
  renoTableAlt: 'photo-1567767292278-a4f21aa2d36e', // glass-topped coffee table, abstract art
  nordicBed: 'photo-1617325247661-675ab4b64ae2', // made bed, white duvet, neutral pillows
  nordicBedAlt: 'photo-1616627561950-9f746e330187', // headboard close-up with layered pillows
  armchair: 'photo-1567538096630-e0c55bd6374c', // tufted armchair
  armchairAlt: 'photo-1567538096621-38d2284b23ff', // armchair on a clean white backdrop
  diningTable: 'photo-1560185007-cde436f6a4d0', // wooden dining table under pendants
  diningTableAlt: 'photo-1519710164239-da123dc03ef4', // simple wooden dining set
  floorLamp: 'photo-1513694203232-719a280e022f', // floor lamp beside a sofa
  floorLampAlt: 'photo-1507473885765-e6ed057f782c', // table lamp, close-up
  bedside: 'photo-1521783988139-89397d761dce', // bedroom with bedside table and lamp
  bedsideAlt: 'photo-1595515106969-1ce29566ff1c', // floating timber storage unit
  cabinet: 'photo-1595428774223-ef52624120d2', // tall narrow timber storage cabinet
  cabinetAlt: 'photo-1585128792020-803d29415281', // sideboard with armchair and plant
  desk: 'photo-1524758631624-e2822e304c36', // work space with desk and chairs
  deskAlt: 'photo-1449247709967-d4461a6a6103', // minimalist home office, white desk
  vase: 'photo-1610701596007-11502861dcfa', // hand-thrown ceramics on a white surface
  vaseAlt: 'photo-1578500494198-246f612d3b3d', // vase of dried stems on a wooden surface
  outdoorBench: 'photo-1519961655809-34fa156820ff', // white outdoor seating with cushions
  outdoorBenchAlt: 'photo-1600566753151-384129cf4e3e', // terrace opening onto a garden

  // Editorial
  editorialDining: 'photo-1600607687920-4e2a09cf159d', // dining room with a long table
  editorialArmchair: 'photo-1600210491892-03d54c0aaf87', // arched windows, fireplace, armchairs
  editorialDetail: 'photo-1594040226829-7f251ab46d80', // woven textile detail
  editorialPlant: 'photo-1567225557594-88d73e55f2cb', // potted plant against a timber wall
  editorialVase: 'photo-1616046229478-9901c5536a45', // sideboard, round mirror and indoor trees
  newsletterPlant: 'photo-1618220179428-22790b461013', // console table styled with plants
  storyCraft: 'photo-1581783898377-1c85bf937427', // hand tools laid out for furniture making

  // Inspiration gallery
  gallery1: 'photo-1600210492493-0946911123ea', // living room with timber ceiling beams
  gallery2: 'photo-1600566753190-17f0baa2a6c3', // house exterior in timber cladding
  gallery3: 'photo-1600607688969-a5bfcd646154', // garden view of a modern home
  gallery4: 'photo-1560448204-e02f11c3d0e2', // pale sofas in a bright room
  gallery5: 'photo-1615874959474-d609969a20ed', // bedroom styled with plants
  gallery6: 'photo-1550581190-9c1c48d21d6c', // sectional sofa on a patterned rug

  // Journal
  journal1: 'photo-1554995207-c18c203602cb', // living room opening onto a kitchen
  journal2: 'photo-1567016376408-0226e4d0c1ea', // compact minimalist interior
  journal3: 'photo-1598928506311-c55ded91a20c', // built-in shelving, high ceilings
  journal4: 'photo-1502005229762-cf1b2da7c5d6', // timber staircase detail
  journal5: 'photo-1560185893-a55cbc8c57e8', // quiet bedroom with white linens
  journal6: 'photo-1600585152220-90363fe7e115', // kitchen island with wooden stools
}
