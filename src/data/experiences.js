/**
 * Experiences.
 *
 * `status: 'confirmed'` means the experience is a service the retreat actually
 * operates; `status: 'sample'` means it is illustrative content awaiting
 * confirmation from the operator.
 */

export const EXPERIENCES = [
  {
    slug: 'guided-forest-walks',
    title: 'Guided Forest Walks',
    season: 'Year round',
    duration: '2 hours',
    status: 'sample',
    image: { src: '/images/exp-forest-walk.jpg', alt: 'Narrow walkway leading through dense woodland' },
    summary:
      'A slow walk along the ridge with a local guide, following the glacial line above the lake.',
    detail:
      'Routes are chosen on the day depending on ground conditions. Expect two hours at an easy pace with several stops.',
  },
  {
    slug: 'fireside-evenings',
    title: 'Fireside Evenings',
    season: 'Late spring to first frost',
    duration: 'Evening',
    status: 'sample',
    image: { src: '/images/exp-fireside.jpg', alt: 'Fire burning low in a woodland clearing at night' },
    summary:
      'The clearing fire is lit most evenings. Blankets, wood and something warm to drink are provided.',
    detail:
      'No booking required for guests staying on site. Private fires for groups can be arranged.',
  },
  {
    slug: 'lakeside-mornings',
    title: 'Lakeside Mornings',
    season: 'May to October',
    duration: '2–3 hours',
    status: 'sample',
    image: { src: '/images/exp-lakeside.jpg', alt: 'A person sitting in a boat looking out over a forest lake' },
    summary:
      'Boats, boards and a flat lake before the wind picks up. Life jackets and a route map included.',
    detail:
      'Boats are shared between guests. Weather-dependent and cancelled in high wind.',
  },
  {
    slug: 'architectural-tours',
    title: 'Architectural Tours',
    season: 'Year round',
    duration: '90 minutes',
    status: 'sample',
    image: { src: '/images/exp-architecture.jpg', alt: 'Contemporary dark timber house standing in woodland' },
    summary:
      'A walk through the retreat with the people who built it: cladding, glazing, heating and how the houses sit on the ground.',
    detail:
      'Held on Tuesday and Saturday afternoons. Limited to eight people.',
  },
  {
    slug: 'seasonal-activities',
    title: 'Seasonal Activities',
    season: 'Varies by season',
    duration: 'Varies',
    status: 'sample',
    image: { src: '/images/exp-seasonal.jpg', alt: 'House standing in an open green field at the edge of the forest' },
    summary:
      'Foraging in early autumn, snowshoe routes in winter, and the mill visit when the saw is running.',
    detail:
      'Availability changes through the year and is confirmed on arrival.',
  },
]
