import { SITE } from '../../data/content.js'
import { useContent } from '../../i18n/content.js'
import { useLang } from '../../i18n/LanguageContext.jsx'
import { useStore } from '../../context/StoreContext.jsx'
import { Icon } from '../ui/Icons.jsx'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import { Photo } from '../ui/SmartImage.jsx'

export default function SocialGallery() {
  const { SOCIAL_GALLERY } = useContent()
  const { notify } = useStore()
  const { t } = useLang()
  const instagram = SITE.social.instagram

  const openInstagram = () => {
    if (instagram) {
      window.open(instagram, '_blank', 'noopener,noreferrer')
      return
    }
    notify(t('home.instagramNotConfigured'))
  }

  return (
    <section className="section pt-0">
      <div className="shell">
        <SectionHeading
          eyebrow={t('home.socialEyebrow')}
          title={t('home.socialTitle')}
          actionLabel={t('home.socialAction')}
          actionTo={instagram || undefined}
          align="center"
          className="mx-auto max-w-2xl"
        />

        {!instagram ? (
          <p className="mx-auto mt-4 max-w-md text-center text-[12px] text-ink-3">
            {t('home.socialNoProfile')}
          </p>
        ) : null}

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-4">
          {SOCIAL_GALLERY.map((item, index) => (
            <Reveal as="li" key={item.image} delay={index * 45}>
              <button
                type="button"
                onClick={openInstagram}
                aria-label={
                  instagram
                    ? t('home.socialAria', { handle: item.handle })
                    : t('home.socialAriaUnconfigured')
                }
                className="img-box group relative block w-full overflow-hidden"
              >
                <span className="block aspect-square w-full overflow-hidden">
                  <Photo
                    id={item.image}
                    alt={item.alt}
                    sizes="(min-width: 1024px) 16vw, 45vw"
                    widths={[320, 480, 640]}
                    className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-ink/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Icon name="instagram" size={20} className="text-white" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
