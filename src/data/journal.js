/** Editorial journal entries. */

export const ARTICLES = [
  {
    slug: 'fireside-evenings-in-the-forest',
    title: 'Fireside Evenings in the Forest',
    excerpt:
      'Why the last hour of daylight is the one worth planning your day around, and how we build a fire that lasts.',
    date: '2026-09-12',
    readingTime: '4 min',
    image: { src: '/images/journal-fireside.jpg', alt: 'Small campfire burning in a woodland clearing at dusk' },
    body: [
      {
        type: 'p',
        text: 'The fire pit sits in a shallow clearing about four minutes from the main house, far enough that the trees close behind you and the building disappears completely. We light it most evenings from late spring until the first hard frost.',
      },
      {
        type: 'p',
        text: 'There is a practical reason the clearing was chosen where it is: the ground falls away slightly to the north, which pulls cold air downhill and leaves the circle warm even when the temperature drops quickly after sunset.',
      },
      { type: 'h', text: 'Building a fire that lasts' },
      {
        type: 'p',
        text: 'We start with birch bark, then a lattice of small dry spruce, then two split logs laid parallel with a gap between them. The gap matters more than the flame: it is the air moving through the wood that keeps the fire alive long after the kindling has gone.',
      },
      {
        type: 'p',
        text: 'Blankets are kept in the bench box beside the wood store. Take one before you sit down — by the time you notice the cold, the best part of the evening has usually passed.',
      },
    ],
  },
  {
    slug: 'slow-mornings-beside-the-lake',
    title: 'Slow Mornings Beside the Lake',
    excerpt:
      'The boardwalk, the mist, and a short walk that rewards anyone willing to leave the cabin before eight.',
    date: '2026-08-02',
    readingTime: '3 min',
    image: { src: '/images/gallery-boat.jpg', alt: 'Wooden boat resting on a still forest lake in the morning' },
    body: [
      {
        type: 'p',
        text: 'Between roughly six and eight in the morning the lake is usually flat. Mist sits in a band about a metre above the water and the far treeline doubles itself in the reflection.',
      },
      { type: 'h', text: 'The boardwalk' },
      {
        type: 'p',
        text: 'The boardwalk leaves the retreat at the north corner of the site and crosses the reeds on a low timber deck. It is wide enough for two people, and there is a bench halfway along where the reeds open out.',
      },
      {
        type: 'p',
        text: 'Boats are moored at the jetty below the Lake Cabin. They are ours, not rented, and guests are welcome to take one out. Life jackets are in the locker at the head of the jetty.',
      },
      {
        type: 'p',
        text: 'Coffee is left outside your door at seven if you ask for it the evening before. It is a small thing, and it is the one guests mention most often.',
      },
    ],
  },
  {
    slug: 'discovering-the-landscape-around-kegali',
    title: 'Discovering the Landscape Around Kegali',
    excerpt:
      'Glacial ridges, a working sawmill and a ridge walk that shows you exactly why the retreat was built here.',
    date: '2026-06-21',
    readingTime: '5 min',
    image: { src: '/images/exp-forest-walk.jpg', alt: 'Narrow walkway leading through dense woodland' },
    body: [
      {
        type: 'p',
        text: 'The retreat sits on the eastern shoulder of a glacial ridge, which is the reason the site has water on one side and old pine on the other. The whole landscape was shaped by ice moving south-east and then retreating.',
      },
      { type: 'h', text: 'The ridge walk' },
      {
        type: 'p',
        text: 'A marked path climbs from behind the workshop to the top of the ridge in about forty minutes. It is steep in two places and muddy after rain. From the top you can see the lake, the retreat roofs below the treeline, and the sawmill chimney to the west.',
      },
      {
        type: 'p',
        text: 'The mill still cuts the timber used on site. If you want to see how the cladding on your cabin was produced, ask at reception and we will arrange a short visit.',
      },
      {
        type: 'p',
        text: 'Maps are available in every room. Please stay on the marked paths between April and July, when the ground nesting season is underway.',
      },
    ],
  },
]

export const getArticle = (slug) => ARTICLES.find((article) => article.slug === slug) || null
