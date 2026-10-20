import Container from '../components/ui/Container.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Img from '../components/ui/Img.jsx'
import Notice from '../components/ui/Notice.jsx'
import { ButtonLink } from '../components/ui/Button.jsx'
import { EXPERIENCES } from '../data/experiences.js'

function StatusBadge({ status }) {
  return (
    <span
      className={`label inline-block border px-2.5 py-1 ${
        status === 'confirmed'
          ? 'border-forest/30 text-forest'
          : 'border-bronze/50 text-bronze'
      }`}
    >
      {status === 'confirmed' ? 'Confirmed service' : 'Sample experience'}
    </span>
  )
}

export default function Experiences() {
  return (
    <>
      <PageHeader
        eyebrow="Experiences"
        title="Things to do, slowly"
        intro="Walks, water and fire. Everything here happens within a few minutes of the houses, and none of it is compulsory."
      />

      <section className="bg-paper py-16 sm:py-20 lg:py-24">
        <Container wide>
          <Notice tone="draft" className="mb-16">
            These experiences are sample content. A service is only bookable once the retreat marks it as
            confirmed and publishes its terms.
          </Notice>

          <div className="space-y-20 lg:space-y-24">
            {EXPERIENCES.map((experience, index) => (
              <article
                key={experience.slug}
                className={`grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10 ${
                  index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                }`}
              >
                <div className="lg:col-span-7">
                  <Img
                    src={experience.image.src}
                    alt={experience.image.alt}
                    className="aspect-[16/10] w-full"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </div>
                <div className="lg:col-span-5">
                  <StatusBadge status={experience.status} />
                  <h2 className="mt-5 text-[22px] font-medium uppercase leading-[1.3] tracking-wide2 text-black sm:text-[26px]">
                    {experience.title}
                  </h2>
                  <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-[13px]">
                    <div className="flex gap-2">
                      <dt className="text-muted">Season</dt>
                      <dd className="text-black">{experience.season}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-muted">Duration</dt>
                      <dd className="text-black">{experience.duration}</dd>
                    </div>
                  </dl>
                  <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-muted">{experience.summary}</p>
                  <p className="mt-4 max-w-md text-[13px] leading-[1.85] text-muted/90">{experience.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-24 flex flex-col items-center gap-5 border-t border-line pt-14 text-center">
            <h2 className="text-[22px] font-medium uppercase tracking-wide2 text-black">
              Plan your stay around it
            </h2>
            <p className="max-w-lg text-[14px] leading-[1.85] text-muted">
              Choose a room and mention the experiences you would like in the booking notes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink to="/rooms">Explore our rooms</ButtonLink>
              <ButtonLink to="/contact" variant="outline">
                Ask a question
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
