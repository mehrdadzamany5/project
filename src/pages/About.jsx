import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Img from '../components/ui/Img.jsx'
import { ButtonLink } from '../components/ui/Button.jsx'

const PILLARS = [
  {
    title: 'Architecture',
    body: 'Every house is drawn around the trees that were already standing. Blackened timber cladding, full-height glazing and a concrete floor that holds warmth from the fire long after it has burned down.',
  },
  {
    title: 'Philosophy',
    body: 'We believe a stay should ask very little of you. No schedule, no lobby, no queue. A well-made bed, a lit fire and a landscape that does the entertaining.',
  },
  {
    title: 'Sustainability',
    body: 'Timber comes from the working forest around us and is milled a few kilometres away. Houses are super-insulated, heated with a single wood stove and a ground-source loop, and lit with low-temperature fixtures.',
  },
  {
    title: 'The surroundings',
    body: 'The retreat sits on the eastern shoulder of a glacial ridge, with the lake on one side and old pine on the other. The landscape shaped the site plan long before we drew anything.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About Kegali"
        title="Houses built quietly, in working forest"
        intro="KEGALI began as a single cabin on a ridge above a lake — somewhere to work, to be outside, and to stop moving for a while. The rest grew from there, one building at a time."
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Img
                src="/images/about-house.jpg"
                alt="Timber house standing among green trees"
                className="aspect-[16/11] w-full"
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
            <div className="flex items-center lg:col-span-5">
              <div>
                <h2 className="text-[24px] font-medium uppercase leading-[1.3] tracking-wide2 text-black sm:text-[28px]">
                  The brand story
                </h2>
                <div className="mt-6 space-y-5 text-[15px] leading-[1.9] text-muted">
                  <p>
                    The first cabin was built for two people and a dog. It had one room, one fire and a
                    window that faced the wrong way for the first winter — which is how we learned to read
                    the light before drawing a wall.
                  </p>
                  <p>
                    Fifteen years later the retreat is five houses and a workshop, all built by the same
                    small team, all still heated with wood. Nothing about it is grand. Everything about it
                    is deliberate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-t border-line pt-8">
                <h2 className="text-[16px] font-medium uppercase tracking-wide2 text-black">
                  {pillar.title}
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-[1.9] text-muted">{pillar.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest py-16 text-white sm:py-20 lg:py-24">
        <Container wide>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="label mb-6 flex items-center gap-3 text-white/60">
                <span className="h-px w-8 bg-bronze" aria-hidden="true" />
                The site
              </span>
              <h2 className="text-[24px] font-medium uppercase leading-[1.3] tracking-wide2 sm:text-[30px]">
                Between the ridge and the water
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-white/75">
                The site plan follows the land rather than the other way around: houses on the shoulder,
                the workshop below the treeline, the lake cabin reached by a boardwalk through the reeds.
                Nothing is more than four minutes’ walk from anything else.
              </p>
              <ButtonLink to="/rooms" variant="outlineLight" className="mt-9">
                See the rooms
              </ButtonLink>
            </div>

            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              <Img
                src="/images/about-fog.jpg"
                alt="House in woodland on a foggy morning"
                className="aspect-[3/4] w-full"
                sizes="(max-width: 1024px) 45vw, 28vw"
              />
              <Img
                src="/images/about-paddle.jpg"
                alt="Person paddling a canoe on a still forest lake"
                className="mt-8 aspect-[3/4] w-full"
                sizes="(max-width: 1024px) 45vw, 28vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[24px] font-medium uppercase leading-[1.3] tracking-wide2 text-black sm:text-[28px]">
              Come and stay
            </h2>
            <p className="mt-6 text-[15px] leading-[1.9] text-muted">
              Five houses, one lake and a great deal of quiet. Choose a room, or send a question first.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/rooms">Explore our rooms</ButtonLink>
              <ButtonLink to="/contact" variant="outline">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
